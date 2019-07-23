import React from 'react';
import { 
    Progress, ProgressMeasureLocation, ProgressVariant 
} from '@patternfly/react-core';

export default props => {
    return (
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
    )
};