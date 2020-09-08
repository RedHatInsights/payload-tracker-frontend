import { Alert, AlertActionCloseButton } from '@patternfly/react-core';
import React, { useState } from 'react';

import PropTypes from 'prop-types';

const Notification = ({ error, message }) => {

    const [isClosed, setClosed] = useState(false);

    return <React.Fragment>
        {error && !isClosed && <Alert
            aria-label='notification'
            variant='danger'
            title='Error fetching data'
            timeout={3000}
            actionClose={<AlertActionCloseButton onClose={() => setClosed(true)}/>}
        >
            {error.message}
        </Alert>}
        {message && !isClosed && <Alert
            aria-label='notification'
            variant={message.type}
            title={message.title}
            isInline
            timeout={3000}
            actionClose={<AlertActionCloseButton onClose={() => setClosed(true)}/>}
        >
            {message.content}
        </Alert>}
    </React.Fragment>;
};

Notification.propTypes = {
    error: PropTypes.object,
    message: PropTypes.object
};

export default Notification;
