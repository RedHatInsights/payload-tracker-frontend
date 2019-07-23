import React from 'react';
import { 
    Progress, ProgressMeasureLocation, ProgressVariant, Tooltip 
} from '@patternfly/react-core';
import {CHECK_OBJECT_EQUIVALENCE} from '../AppConstants'

export default props => {

    var errorMessage = props.messages.filter(message => (
        message.status === 'error' ||
        message.status === 'failure'
    ))

    if (!CHECK_OBJECT_EQUIVALENCE(errorMessage, [])) {
        errorMessage = errorMessage[0].message
    } else {
        errorMessage = false
    }

    return (
        <Tooltip
            position='bottom'
            content={ errorMessage ? errorMessage: '' }
            style={ errorMessage ? {} : {display: 'none'} }
            entryDelay={0}
        >
            <Progress
                value={
                    (props.statuses.includes('success') ||
                    props.statuses.includes('202') || 
                    props.statuses.includes('error') ||
                    props.statuses.includes('failure')) ?
                    100 : (
                        props.statuses.includes('processing') ?
                        50:
                        25
                    )
                }
                title={props.service}
                measureLocation={ProgressMeasureLocation.none}
                variant={
                    (props.statuses.includes('success') || 
                    props.statuses.includes('202')) ?
                    ProgressVariant.success : (
                        (props.statuses.includes('error') ||
                        props.statuses.includes('failure')) ?
                        ProgressVariant.danger :
                        ProgressVariant.info
                    )
                }
            />
        </Tooltip>
    )
};