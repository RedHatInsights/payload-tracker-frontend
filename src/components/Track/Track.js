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

import API from '../../utilities/Api';
import Durations from './Durations';
import ExportsDropdown from '../ExportsDropdown';
import OptionsContainer from '../OptionsContainer';
import TrackGraphic from './TrackGraphicView';
import TrackSearchBar from './TrackSearchBar';
import TrackTable from './TrackTable';
import { useDispatch, useSelector } from 'react-redux';
import { usePolling } from '../../utilities/Common';

const Track = () => {
    const request_id = useSelector(state => state.track.request_id);
    const sort_by = useSelector(state => state.track.sort_by);
    const sort_dir = useSelector(state => state.track.sort_dir);
    const dispatch = useDispatch();

    const [activeTabKey, setActiveTabKey] = useState(0);
    const [payloads, setPayloads] = useState();
    const [durations, setDurations] = useState();
    const [loading, setLoading] = useState();
    const currPayloads = useRef();
    const retryCounter = useRef();

    const getData = async (restartCounter = false) => {
        try {
            const resp = await API.get(
                `${ConstantTypes.API_URL}/api/v1/payloads/${request_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`);
            if (resp.status === 200) {
                const { data, duration } = resp.data;
                if (!currPayloads?.current || JSON.stringify(data) !== JSON.stringify(currPayloads.current)) {
                    setPayloads(data);
                    setDurations(duration);
                    setLoading(data?.length > 0 ? 'fulfilled' : 'rejected');
                    currPayloads.current = data;
                    retryCounter.current = restartCounter ? 0 : retryCounter.current;
                } else {
                    retryCounter.current += 1;
                }
            }
        }
        catch (error) {
            if (error.response.data.status !== 404) {
                dispatch(AppActions.addMessage(('danger', 'Error fetching data', `Request failed with status code ${error.response.data.status}`)));
            }

            setLoading('rejected');
        }
    };

    useEffect(() => {
        setLoading(request_id && 'pending');
        currPayloads.current = undefined;
        request_id && (async () => await getData(true))();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currPayloads, request_id]);

    useEffect(() => {
        request_id && (async () => await getData())();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort_by, sort_dir]);

    usePolling(() => {
        if ((!retryCounter.current || retryCounter.current < 10) && payloads && request_id) {
            retryCounter.current = retryCounter.current || 0;
            (async () => await getData(true))();
        }
    }, 2000);

    return <PageSection>
        <TrackSearchBar loading={loading} payloads={payloads}/>
        {loading === 'fulfilled' && <React.Fragment>
            {durations && <Durations durations={durations} payloads={payloads}/>}
            <Tabs activeKey={activeTabKey} onSelect={ (e, index) => setActiveTabKey(index) }>
                <Tab eventKey={0} title='Status'>
                    <Card>
                        <CardHeader>
                        </CardHeader>
                        <CardBody>
                            <TrackGraphic payloads={payloads}/>
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
                            <TrackTable payloads={payloads}/>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </React.Fragment>}
    </PageSection>;
};

export default Track;
