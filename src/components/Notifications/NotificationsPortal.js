import Notification from './Notification';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';

const NotificationsPortal = ({ error, messages }) => {
    return createPortal((
        <div aria-label='notifications-portal' style={{
            position: 'fixed',
            top: 15,
            right: 15,
            zIndex: 2000
        }}>
            { error && <Notification error={error}/>}
            { messages && messages.map(message => <Notification message={message}/>)}
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

const mapStateToProps = state => ({
    error: state.data.error,
    messages: state.data.messages
});

export default connect(mapStateToProps, null)(NotificationsPortal);
