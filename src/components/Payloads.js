import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import PayloadsTable from './PayloadsTable'
import {
    Pagination
} from '@patternfly/react-core';
  

const Payloads = props => {
    return (
        <div> 
            <Pagination 
                    itemCount={props.count}
                    perPage={props.page_size}
                    page={props.page}
                    onSetPage={
                        (_event, pageNumber) => {
                            props.updateParameters({name: 'page', value: pageNumber});
                            props.runRedirect();
                        }
                    }
                    widgetId="pagination-options-menu-top"
                    onPerPageSelect={
                        (_event, perPage) => {
                            props.updateParameters({name: 'page_size', value: perPage});
                            props.runRedirect();
                        }
                    }
            />
            <PayloadsTable 
                payloads={props.payloads}
            />
        </div>
    )
}

export default Payloads;