import 'react-day-picker/lib/style.css';

import * as AppActions from '../actions';

import {
    Bullseye,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexItem,
    FlexModifiers,
    Form,
    FormGroup,
    Modal,
    Split,
    SplitItem,
    Tab,
    Tabs,
    Text,
    TextInput
} from '@patternfly/react-core';
import { CaretLeftIcon, CaretRightIcon, ClockIcon } from '@patternfly/react-icons';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';

import DateTime from 'luxon/src/datetime';
import DayPicker from 'react-day-picker';
import Dropdown from './DropdownContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const DateTextInput = forwardRef(({ setValidation, val }, ref) => {

    const [isDate, setIsDate] = useState(true);
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        setCurrentValue(val);
    }, [val, setCurrentValue]);

    useImperativeHandle(ref, () => ({
        setValue: (value) => {
            setCurrentValue(value)
        },
        getValue: () => {
            return new Date(currentValue)
        }
    }));

    const checkVal = (newVal) => {
        const res = DateTime.fromISO(newVal);
        if (res.invalid) {
            setIsDate(false);
            setValidation(false);
        } else {
            setIsDate(true);
            setValidation(true);
        };
        setCurrentValue(newVal);
    };

    return <TextInput
        value={currentValue}
        onChange={(val) => checkVal(val)}
        validated={isDate ? 'success' : 'error'}
    />
});

DateTextInput.propTypes = {
    setVal: PropTypes.func,
    setValidation: PropTypes.func,
    val: PropTypes.any
};

const DateRangeFilter = ({ updateDateRange, addNewTimeFilter, removeFilter, filters, startDate, endDate, recentTimeFilters, recentTimeType }) => {

    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    const [type, setType] = useState(recentTimeType);
    const [isValidated, setValidation] = useState(true);
    const [leftRecentsStack, setLeftRecentsStack] = useState();
    const [rightRecentsStack, setRightRecentsStack] = useState();
    const fromRef = useRef();
    const toRef = useRef();
    const history = useHistory();

    function _getId(array, type) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].type === type){
                return array[i].id
            };
        };
    };

    const addRecent = useCallback((t, s, e) => {
        addNewTimeFilter(t, s, e);
    }, [addNewTimeFilter]);

    const updateState = useCallback((s, e, type) => {
        updateDateRange(s, e, type, _getId(filters, `${type}_gte`), _getId(filters, `${type}_lte`));
    }, [filters, updateDateRange]);

    useEffect(() => {
        //eslint-disable-next-line
        const [mostRecent, ...moreRecents] = recentTimeFilters;
        setLeftRecentsStack([]);
        setRightRecentsStack(moreRecents);
    }, [recentTimeFilters, setLeftRecentsStack, setRightRecentsStack]);

    useEffect(() => {
        let areValuesInArray = recentTimeFilters.filter(filter => {
            if (getLocalDate(filter.start) === getLocalDate(start) && getLocalDate(filter.end) === getLocalDate(end)) {
                return filter;
            };
        });
        if (start && end && type) {
            updateState(start, end, type);
            if (areValuesInArray.length === 0) {
                addRecent(type, start, end);
            };
        } else if (!(start && end)) {
            filters.map(filter => {
                if  (filter.type.includes('gte') || filter.type.includes('lte')) {
                    removeFilter(filter.id);
                };
            });
        };
    //eslint-disable-next-line
    }, [start, end, type]);

    const setDates = () => {
        const getValuesFromModal = () => {
            const from = fromRef.current.getValue();
            const to = toRef.current.getValue();
            if (to >= from) {
                setStart(from);
                setEnd(to);
            };
        };
        getValuesFromModal();
        setOpen(!isOpen);
    };

    const recentClickHandler = (filterStart, filterEnd) => {
        setStart(filterStart);
        setEnd(filterEnd);
        setOpen(!isOpen);
        setActiveTab(0);
    };

    const rightRecentHandler = () => {
        const [rightRecent, ...moreRecents] = rightRecentsStack;
        setLeftRecentsStack([{start, end}, ...leftRecentsStack]);
        setStart(rightRecent.start);
        setEnd(rightRecent.end);
        setRightRecentsStack(moreRecents);
    };

    const leftRecentHandler = () => {
        const [leftRecent, ...moreRecents] = leftRecentsStack;
        setRightRecentsStack([{start, end}, ...rightRecentsStack]);
        setStart(leftRecent.start);
        setEnd(leftRecent.end);
        setLeftRecentsStack(moreRecents);
    };

    const getLocalDate = (date) => {
        return date ? `${date.toLocaleString()} UTC-${date.getTimezoneOffset()/60}00` : null;
    };

    return <React.Fragment>
        {isOpen && <Modal
            isOpen={isOpen}
            onClose={() => setOpen(!isOpen)}
            width={'50%'}
            title='Set time range'
            isFooterLeftAligned
            actions={[
                <Button
                    key="confirm"
                    variant="primary"
                    onClick={() => setDates()}
                    isDisabled={!(isValidated && type)}
                >
                  Confirm
                </Button>,
                <Button key="cancel" variant="link" onClick={() => setOpen(!isOpen)}>
                  Cancel
                </Button>
            ]}
        >
            <Split>
                <SplitItem isFilled/>
                <SplitItem>
                    <Dropdown
                        type={type ? type : 'Choose column'}
                        items={history.location.pathname === '/payloads' ? [
                            'created_at'
                        ]: ['created_at', 'date']}
                        setSelected={(e, type) => setType(type)}
                    />
                </SplitItem>
            </Split>
            <Tabs activeKey={activeTab} onSelect={(e, index) => setActiveTab(index)} isBox>
                <Tab eventKey={0} title='Absolute'>
                    <Bullseye style={{paddingTop: '30px'}}>
                        <Form>
                            <Flex breakpointMods={[{modifier: FlexModifiers.row}]}>
                                <FormGroup label='From'>
                                    <Flex breakpointMods={[{modifier: FlexModifiers.column}]}>
                                        <FlexItem>
                                            <DateTextInput
                                                ref={fromRef}
                                                val={start ? start.toISOString() : start}
                                                setValidation={setValidation}
                                            />
                                        </FlexItem>
                                        <FlexItem>
                                            <DayPicker onDayClick={(day) => fromRef.current.setValue(day.toISOString())}/>
                                        </FlexItem>
                                    </Flex>
                                </FormGroup>
                                <FormGroup label='To'>
                                    <Flex breakpointMods={[{modifier: FlexModifiers.column}]}>
                                        <FlexItem>
                                            <DateTextInput
                                                ref={toRef}
                                                val={end ? end.toISOString() : end}
                                                setValidation={setValidation}
                                            />
                                        </FlexItem>
                                        <FlexItem>
                                            <DayPicker
                                                onDayClick={(day) => toRef.current.setValue(day.toISOString())}
                                            />
                                        </FlexItem>
                                    </Flex>
                                </FormGroup>
                            </Flex>
                        </Form>
                    </Bullseye>
                </Tab>
                <Tab eventKey={1} title='Recent'>
                    <Card>
                        <CardHeader/>
                        <CardBody>
                            <Flex breakpointMods={[{modifier: FlexModifiers.column}]}>
                                {recentTimeFilters.map(filter =>
                                    <React.Fragment>
                                        <FlexItem>
                                            <Button
                                                variant='link'
                                                onClick={() => recentClickHandler(filter.start, filter.end)}
                                            >
                                                {filter.start && filter.end ? <span>
                                                    {getLocalDate(filter.start)} to {getLocalDate(filter.end)}
                                                </span> : <Text> All time </Text>}
                                            </Button>
                                        </FlexItem>
                                    </React.Fragment>)}
                            </Flex>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </Modal>}
        {!(leftRecentsStack && leftRecentsStack.length === 0) && <Button
            variant='inline'
            onClick={leftRecentHandler}
        > <CaretLeftIcon/> </Button>}
        <Button variant='inline' onClick={() => setOpen(!isOpen)}>
            <Flex variant={[{modifier: FlexModifiers.row}]}>
                <FlexItem spacer={{default: 'spacerNone'}}>
                    <ClockIcon/>
                </FlexItem>
                <FlexItem>
                    {start && end ? <span>
                        {getLocalDate(start)} to {getLocalDate(end)}
                    </span> : <Text component='p'> All time </Text>}
                </FlexItem>
            </Flex>
        </Button>
        {!(rightRecentsStack && rightRecentsStack.length === 0) && <Button
            variant='inline'
            onClick={rightRecentHandler}
        > <CaretRightIcon/> </Button>}
    </React.Fragment>;
};

DateRangeFilter.propTypes = {
    updateDateRange: PropTypes.func,
    addNewTimeFilter: PropTypes.func,
    removeFilter: PropTypes.func,
    filters: PropTypes.any,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    recentTimeFilters: PropTypes.array,
    recentTimeType: PropTypes.string,
};

const mapStateToProps = state => ({
    filters: state.payloads.filters,
    startDate: state.payloads.startDate,
    endDate: state.payloads.endDate,
    recentTimeFilters: state.payloads.recentTimeFilters,
    recentTimeType: state.payloads.recentTimeType
});

const mapDispatchToProps = dispatch => ({
    updateDateRange: (start, end, type, startId, endId) => dispatch(AppActions.updateDateRange(start, end, type, startId, endId)),
    addNewTimeFilter: (type, start, end) => dispatch(AppActions.addNewTimeFilter(type, start, end)),
    removeFilter: (id) => dispatch(AppActions.removeFilter(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeFilter);