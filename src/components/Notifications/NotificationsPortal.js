import Notification from './Notification';
import PropTypes from 'prop-types';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

const NotificationsPortal = () => {
    const error = useSelector(state => state.data.error, shallowEqual);
    const messages = useSelector(state => state.data.messages, shallowEqual);

    return createPortal((
        <div aria-label='notifications-portal' style={{
            position: 'fixed',
            top: 15,
            right: 15,
            zIndex: 2000
        }}>
            { error && <Notification error={error}/>}
            { messages && messages.map((message, index) => <Notification key={index} message={message}/>)}
        </div>
    ), document.body);
};

NotificationsPortal.propTypes = {
    error: PropTypes.object,
    message: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string
    }))
};

export default NotificationsPortal;
