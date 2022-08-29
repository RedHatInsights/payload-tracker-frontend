import {
    Button
} from '@patternfly/react-core';
import React from 'react';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';

import * as ConstantTypes from '../../AppConstants';
import API from '../../utilities/Api';

const KibanaLink = ({ requestId, serviceName, children }) => {
    const [kibanaUrl, setKibanaUrl] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    // Send a request to the backend to get the kibana url
    const getKibanaUrl = async () => {
        let requestUrl = `${ConstantTypes.API_URL}/api/v1/payloads/${requestId}/kibanaLink`;
        if (serviceName) {
            requestUrl += `?service=${serviceName}`;
        }

        const resp = await API.get(requestUrl);
        if (resp.status === 200 && resp.data.url !== undefined) {
            setKibanaUrl(resp.data.url);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getKibanaUrl();
    }, []);

    return (
        loading ||
        <Button
            variant='link'
            isInline
            icon={<ExternalLinkAltIcon />}
            onClick={() => window.open(kibanaUrl, '_blank')}
        >
            {children || 'View in Kibana'}
        </Button>
    );
};

KibanaLink.propTypes = {
    requestId: PropTypes.string.isRequired,
    serviceName: PropTypes.string,
    children: PropTypes.node
};

export default KibanaLink;
