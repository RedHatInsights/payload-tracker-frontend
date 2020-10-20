import * as AppActions from '../../actions';
import * as ConstantTypes from '../../AppConstants';

import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexItem,
    PageSection,
    Tab,
    Tabs
} from '@patternfly/react-core';
import React, { useEffect, useRef, useState } from 'react';

import Durations from './Durations';
import ExportsDropdown from '../ExportsDropdown';
import OptionsContainer from '../OptionsContainer';
import PropTypes from 'prop-types';
import TrackGraphic from './TrackGraphicView';
import TrackSearchBar from './TrackSearchBar';
import TrackTable from './TrackTable';
import { connect } from 'react-redux';
import { usePolling } from '../../utilities/Common';

const Track = ({ payloads, request_id, sort_by, sort_dir, getPayloads }) => {
    const [activeTabKey, setActiveTabKey] = useState(0);
    const currPayloads = useRef();
    const retryCounter = useRef();

    useEffect(() => {
        request_id && getPayloads(`${ConstantTypes.API_URL}/v1/payloads/${request_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`);
        retryCounter.current = 0;
    }, [request_id, sort_dir, sort_by, getPayloads]);

    usePolling(() => {
        if ((!retryCounter.current || retryCounter.current < 10) && payloads && request_id) {
            retryCounter.current = retryCounter.current || 0;
            retryCounter.current = JSON.stringify(currPayloads.current) !== JSON.stringify(payloads) ? 0 : retryCounter.current + 1;
            currPayloads.current = payloads;
            getPayloads(`${ConstantTypes.API_URL}/v1/payloads/${request_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`);
        }
    }, 2000);

    return <PageSection>
        <TrackSearchBar/>
        {request_id && payloads?.length > 0 && <React.Fragment>
            <Durations/>
            <Tabs activeKey={activeTabKey} onSelect={ (e, index) => setActiveTabKey(index) }>
                <Tab eventKey={0} title='Status'>
                    <Card>
                        <CardHeader>
                        </CardHeader>
                        <CardBody>
                            <TrackGraphic/>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab eventKey={1} title='Table'>
                    <Card>
                        <CardHeader>
                            <Flex direction={{ default: 'row' }}>
                                <FlexItem>
                                    <OptionsContainer isDisabled={request_id ? false : true}/>
                                </FlexItem>
                                <FlexItem>
                                    <ExportsDropdown/>
                                </FlexItem>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <TrackTable/>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </React.Fragment>}
    </PageSection>;
};

Track.propTypes = {
    payloads: PropTypes.array,
    request_id: PropTypes.any,
    sort_by: PropTypes.string,
    sort_dir: PropTypes.string,
    getPayloads: PropTypes.func
};

export default connect((state) => ({
    request_id: state.track.request_id,
    sort_by: state.track.sort_by,
    sort_dir: state.track.sort_dir,
    payloads: state.data.payloads
}), (dispatch) => ({
    getPayloads: (url) => dispatch(AppActions.getPayloadTrack(url))
}))(Track);
