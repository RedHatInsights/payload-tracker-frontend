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

const OptionsContainer = ({ cells, setCellActivity, isDisabled }) => {

    const [isOpen, setOpen] = useState(false);

    const clickHandler = cell => {
        cell.isActive ? setCellActivity(cell.title, false) : setCellActivity(cell.title, true);
    };

    const generateOptions = () => {
        let options = [];
        Object.entries(cells).forEach(([key, cell]) => {
            if (cell.title !== 'id') {
                options.push(
                    <OptionsMenuItem
                        onSelect={() => clickHandler(cell)}
                        isSelected={cell.isActive}
                        id={cell.title}
                        key={key}
                    >
                        {cell.title}
                    </OptionsMenuItem>
                );
            }
        });
        return (options);
    };

    return <OptionsMenu
        id="options-menu-align-right-example"
        position={OptionsMenuPosition.right}
        menuItems={generateOptions()}
        toggle={<OptionsMenuToggle
            onToggle={() => setOpen(!isOpen)}
            toggleTemplate={<React.Fragment>Show Columns</React.Fragment>}
        />}
        isOpen={isOpen}
        isDisabled={isDisabled}
    />;
};

OptionsContainer.propTypes = {
    cells: PropTypes.array,
    setCellActivity: PropTypes.func,
    isDisabled: PropTypes.bool
};

const mapStateToProps = state => ({
    cells: state.cell.cells
});

const mapDispatchToProps = dispatch => ({
    setCellActivity: (title, bool) => dispatch(AppActions.setCellActivity(title, bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsContainer);
