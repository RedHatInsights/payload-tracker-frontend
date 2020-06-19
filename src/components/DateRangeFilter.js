import 'react-day-picker/lib/style.css';

import * as AppActions from '../actions';

import {
    Bullseye,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    DropdownPosition,
    Flex,
    FlexItem,
    FlexModifiers,
    Form,
    FormGroup,
    Modal,
    Tab,
    Tabs,
    Text,
    TextInput,
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
import { getLocalDate } from '../AppConstants';
import { useHistory } from 'react-router';

const DateTextInput = forwardRef(({ setValidation, val }, ref) => {

    const [isDate, setIsDate] = useState(true);
    const [currentValue, setCurrentValue] = useState();

    const checkVal = (newVal) => {
        if (newVal) {
            newVal = newVal instanceof Object ? newVal.toLocaleString('en-US') : newVal
            const res = DateTime.fromFormat(newVal, 'm/d/y, h:mm:ss a');
            if (res.invalid) {
                setIsDate(false);
                setValidation(false);
            } else {
                setIsDate(true);
                setValidation(true);
            };
            setCurrentValue(newVal);
        };
    };

    useEffect(() => {
        checkVal(val);
        setCurrentValue(val);
    //eslint-disable-next-line
    }, [val, setCurrentValue]);

    useImperativeHandle(ref, () => ({
        setValue: (value) => {
            checkVal(value);
            setCurrentValue(value);
        },
        getValue: () => {
            return new Date(currentValue);
        }
    }));

    return <TextInput
        value={currentValue && currentValue.toLocaleString('en-US')}
        onChange={(val) => checkVal(val)}
        validated={isDate ? 'success' : 'error'}
    />
});

DateTextInput.propTypes = {
    setVal: PropTypes.func,
    setValidation: PropTypes.func,
    val: PropTypes.any
};

const DateRangeFilter = ({
    updateDateRange, addNewTimeFilter, setStartDate, setEndDate,
    startDate, endDate, recentTimeFilters, recentTimeType
}) => {

    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [start, setStart] = useState(startDate && new Date(startDate));
    const [end, setEnd] = useState(endDate && new Date(endDate));
    const [type, setType] = useState(recentTimeType);
    const [isValidated, setValidation] = useState(true);
    const [leftRecentsStack, setLeftRecentsStack] = useState();
    const [rightRecentsStack, setRightRecentsStack] = useState();
    const fromRef = useRef();
    const toRef = useRef();
    const history = useHistory();

    const resetStacks = (start, end) => {
        for(var i = 0; i < recentTimeFilters.length; i++) {
            if (getLocalDate(recentTimeFilters[i].start) === getLocalDate(start) &&
                getLocalDate(recentTimeFilters[i].end) === getLocalDate(end)) {
                setLeftRecentsStack(recentTimeFilters.slice(0, i).reverse());
                setRightRecentsStack(recentTimeFilters.slice(i+1, recentTimeFilters.length));
                setStart(start);
                setEnd(end);
                break;
            };
        };
    };

    const addRecent = useCallback((t, s, e) => {
        addNewTimeFilter(t, s, e);
    }, [addNewTimeFilter]);

    const updateState = useCallback((s, e, type) => {
        updateDateRange(s, e);
    }, [updateDateRange]);

    useEffect(() => {
        resetStacks(start, end)
    //eslint-disable-next-line
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
            if (type) {
                setStartDate(start);
                setEndDate(end);
            }
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

    const recentClickHandler = (start, end) => {
        resetStacks(start, end)
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
            <Form style={{paddingBottom: '30px'}}>
                <FormGroup
                    label='Specify column to filter:'
                    isRequired={!type}
                >
                    <Flex breakpointMods={[{modifier: FlexModifiers.column}]}>
                        <FlexItem>
                            <Dropdown
                                position={DropdownPosition.left}
                                type={type ? type : 'Column'}
                                items={history.location.pathname === '/payloads' ? [
                                    'created_at'
                                ]: ['created_at', 'date']}
                                setSelected={(e, type) => setType(type)}
                            />
                        </FlexItem>
                    </Flex>
                </FormGroup>
            </Form>
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
                                                val={start}
                                                setValidation={setValidation}
                                            />
                                        </FlexItem>
                                        <FlexItem>
                                            <DayPicker onDayClick={(day) => fromRef.current.setValue(day)}/>
                                        </FlexItem>
                                    </Flex>
                                </FormGroup>
                                <FormGroup label='To'>
                                    <Flex breakpointMods={[{modifier: FlexModifiers.column}]}>
                                        <FlexItem>
                                            <DateTextInput
                                                ref={toRef}
                                                val={end}
                                                setValidation={setValidation}
                                            />
                                        </FlexItem>
                                        <FlexItem>
                                            <DayPicker
                                                onDayClick={(day) => toRef.current.setValue(day)}
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
                                            <Divider/>
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
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    recentTimeFilters: PropTypes.array,
    recentTimeType: PropTypes.string,
};

const mapStateToProps = state => ({
    startDate: state.payloads.startDate,
    endDate: state.payloads.endDate,
    recentTimeFilters: state.payloads.recentTimeFilters,
    recentTimeType: state.payloads.recentTimeType
});

const mapDispatchToProps = dispatch => ({
    updateDateRange: (start, end) => dispatch(AppActions.updateDateRange(start, end)),
    addNewTimeFilter: (type, start, end) => dispatch(AppActions.addNewTimeFilter(type, start, end)),
    setStartDate: (start) => dispatch(AppActions.setStartDate(start)),
    setEndDate: (end) => dispatch(AppActions.setEndDate(end))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeFilter);