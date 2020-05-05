import * as AppActions from '../actions';

import {
    OptionsMenu,
    OptionsMenuItem,
    OptionsMenuPosition,
    OptionsMenuToggle
} from '@patternfly/react-core';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OptionsContainer = ({ cells, setCellActive, setCellInactive, isDisabled }) => {

    const [isOpen, setOpen] = useState(false);
    const toggle = <OptionsMenuToggle 
                        onToggle={ () => {setOpen(!isOpen)} } 
                        toggleTemplate={<React.Fragment>Show Columns</React.Fragment>}
                    /> 

    const clickHandler = cell => {
        cell.isActive ? setCellInactive(cell.title) : setCellActive(cell.title);
    }

    const generateOptions = () => {
        var options = [];
        Object.entries(cells).forEach(([key, cell]) => {
            if (cell.title !== 'id') {
                options.push(
                    <OptionsMenuItem 
                        onSelect={ 
                            () => { clickHandler(cell) }
                        }
                        isSelected={
                            cell.isActive
                        }
                        id={cell.title}
                        key={key}
                    >
                        {cell.title}
                    </OptionsMenuItem>
                )
            }
        })
        return (options);
    }

    return (
        <OptionsMenu
            id="options-menu-align-right-example" 
            position={OptionsMenuPosition.right} 
            menuItems={generateOptions()} 
            toggle={toggle} 
            isOpen={isOpen}
            isDisabled={isDisabled}
       />
    )
}

OptionsContainer.propTypes = {
    cells: PropTypes.object,
    setCellInactive: PropTypes.func,
    setCellActive: PropTypes.func,
    isDisabled: PropTypes.bool
};

const mapStateToProps = state => ({
    cells: state.cell.cells
});

const mapDispatchToProps = dispatch => ({
    setCellInactive: (title) => dispatch(AppActions.setCellInactive(title)),
    setCellActive: (title) => dispatch(AppActions.setCellActive(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsContainer);