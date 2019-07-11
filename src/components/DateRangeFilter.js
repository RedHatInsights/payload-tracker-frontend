import React, { useState } from 'react';
import { Dropdown, DropdownToggle } from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons'
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

const DateRangeFilter = props => {

    const [isOpen, setOpen] = useState(null)

    const setDates = (value, states) => {
        props.updateParameters({name: 'date_gte', value: value.start.format("YYYY-MM-DD")});
        props.updateParameters({name: 'date_lte', value: value.end.format("YYYY-MM-DD")});
        props.runRedirect();
        setOpen(false)
    }

    console.log(moment.range(moment(props.start, 'YYYY-MM-DD'), moment(props.end, 'YYYY-MM-DD')))
    return (
        <Dropdown
            toggle={
                <DropdownToggle
                    onToggle={() => setOpen(!isOpen)}
                >
                    {props.start !== null ? props.start: "Start Date"} <ArrowRightIcon/> {props.end !== null ? props.end: "End Date"}
                </DropdownToggle>
            }
            isOpen={isOpen}
        >
            <DateRangePicker
                value={
                    (props.start && props.end) ? 
                    moment.range(
                    moment(props.start, 'YYYY-MM-DD'), 
                    moment(props.end, 'YYYY-MM-DD')) :
                    null
                }
                onSelect={setDates}
                singleDateRange={true}
            />
        </Dropdown>
    )
}

export default DateRangeFilter;