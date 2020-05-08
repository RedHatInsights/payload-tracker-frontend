import 'react-daterange-picker/dist/css/react-calendar.css'

import * as AppActions from '../actions';

import { Dropdown, DropdownToggle } from '@patternfly/react-core';
import React, { useState } from 'react';

import { ArrowRightIcon } from '@patternfly/react-icons'
import DateRangePicker from 'react-daterange-picker'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { extendMoment } from "moment-range";
import originalMoment from "moment";

const moment = extendMoment(originalMoment);

const DateRangeFilter = ({ updateDateRange, filters, startDate, endDate }) => {

    const [isOpen, setOpen] = useState(null)

    function _getId(array, type) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].type === type){
                return array[i].id
            }
        }
    }

    const setDates = (value, states) => {
        updateDateRange(value, _getId(filters, 'date_gte'), _getId(filters, 'date_lte'));
        setOpen(false);
    }

    return (
        <Dropdown
            toggle={
                <DropdownToggle
                    onToggle={() => setOpen(!isOpen)}
                >
                    {startDate ? startDate: "Start Date"} <ArrowRightIcon/> {endDate ? endDate: "End Date"}
                </DropdownToggle>
            }
            isOpen={isOpen}
        >
            <DateRangePicker
                value={
                    (startDate && endDate) ? 
                    moment.range(
                    moment(startDate, 'YYYY-MM-DD'), 
                    moment(endDate, 'YYYY-MM-DD')) :
                    null
                }
                onSelect={setDates}
                singleDateRange={true}
            />
        </Dropdown>
    )
}

DateRangeFilter.propTypes = {
    updateDateRange: PropTypes.func,
    filters: PropTypes.any,
    startDate: PropTypes.any,
    endDate: PropTypes.any
};

const mapStateToProps = state => ({
    filters: state.payloads.filters,
    start: state.payloads.startDate,
    end: state.payloads.endDate
});

const mapDispatchToProps = dispatch => ({
    updateDateRange: (value, start, end) => dispatch(AppActions.updateDateRange(value, start, end))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeFilter);