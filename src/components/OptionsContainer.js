import React, { useState, updateState } from 'react';
import {
    OptionsMenu,
    OptionsMenuItem,
    OptionsMenuPosition,
    OptionsMenuToggle
} from '@patternfly/react-core';
import { setCellActivity } from '../actions'

const Option = (props) => {
    return (
        <OptionsMenuItem 
            onSelect={ 
                () => {
                    props.dispatch(setCellActivity(props.cell.title, !props.cell.isActive))
                }
            }
            isSelected={
                props.cell.isActive
            }
            id={props.cell.title}
            key={props.key}
        >
            {props.cell.title}
        </OptionsMenuItem>
    )
}

const generateOptions = props => {
    var options = [];
    Object.entries(props.cells).forEach(([key, cell]) => {
        // id is required to maintain distinct rows in patternfly react-table
        if (cell.title !== 'id') {
            options.push(<Option key={key} cell={cell} dispatch={props.dispatch}/>)
        }
    })
    return (options);
}

const toggleTemplateProps = {
    text: 'Show Columns'
}

const toggleTemplate = (toggleTemplateProps) => {
    const { text } = toggleTemplateProps;
    return <React.Fragment> {text} </React.Fragment>
}

const OptionsContainer = props => {

    const [isOpen, setOpen] = useState(false);
    const toggle = <OptionsMenuToggle 
                        onToggle={ () => {setOpen(!isOpen)} } 
                        toggleTemplate={toggleTemplate(toggleTemplateProps)} 
                        toggleTemplateProps={toggleTemplateProps}
                    /> 

    return (
        <OptionsMenu
            id="options-menu-align-right-example" 
            position={OptionsMenuPosition.right} 
            menuItems={generateOptions(props)} 
            toggle={toggle} 
            isOpen={isOpen}
       />
    )
}

export default OptionsContainer;