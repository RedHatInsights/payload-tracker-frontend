import 'react-day-picker/lib/style.css';
import './DateRangeFilter.scss';

import * as AppActions from '../../actions';

import {
    Bullseye,
    Button,
    Divider,
    Flex,
    FlexItem,
    Form,
    FormGroup,
    Modal,
    Radio,
    Tab,
    Tabs,
    Text
} from '@patternfly/react-core';
import { CaretLeftIcon, CaretRightIcon, ClockIcon } from '@patternfly/react-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import DateTextInput from './DateTextInput';
import DayPicker from 'react-day-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocalDate } from '../../AppConstants';
import { useQuickFilters } from './utils';

const DateRangeFilter = ({
    updateDateRange, addNewTimeFilter, pathname,
    addMessage, startDate, endDate, recentTimeFilters, recentTimeType
}) => {
    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [type, setType] = useState(recentTimeType);
    const [isValidated, setValidation] = useState(true);
    const [leftRecentsStack, setLeftRecentsStack] = useState([]);
    const [rightRecentsStack, setRightRecentsStack] = useState([]);
    const { filters, getFilterTitle, getFilterFromTitle, updateFilters } = useQuickFilters((filter) => {
        const res = filters.filter(({ title }) => title === filter)?.[0];
        if (res) {
            const { start, end } = res;
            setStart(start);
            setEnd(end);
            type && addNewTimeFilter(type, start, end);
            setOpen(!isOpen);
            setActiveTab(0);
        }
    });
    const fromRef = useRef();
    const toRef = useRef();

    const updateState = useCallback((s, e) => {
        updateDateRange(s, e);
    }, [updateDateRange]);

    const setDates = () => {
        setOpen(!isOpen);
        const start = fromRef.current.getValue();
        const end = toRef.current.getValue();
        if (end >= start) {
            setStart(start);
            setEnd(end);
            type && addNewTimeFilter(type, start, end);
        } else {
            addMessage('danger', 'Date range error', `${getLocalDate(start)} is not before ${getLocalDate(end)}`);
        }
    };

    const rightRecentHandler = () => {
        const [rightRecent, ...moreRecents] = rightRecentsStack;
        setLeftRecentsStack([{ start, end }, ...leftRecentsStack]);
        setStart(rightRecent.start);
        setEnd(rightRecent.end);
        setRightRecentsStack(moreRecents);
    };

    const leftRecentHandler = () => {
        const [leftRecent, ...moreRecents] = leftRecentsStack;
        setRightRecentsStack([{ start, end }, ...rightRecentsStack]);
        setStart(leftRecent.start);
        setEnd(leftRecent.end);
        setLeftRecentsStack(moreRecents);
    };

    useEffect(() => {
        const [mostRecent, ...more] = recentTimeFilters;
        setRightRecentsStack(more);
        setLeftRecentsStack([]);
        setStart(mostRecent.start);
        setEnd(mostRecent.end);
    //eslint-disable-next-line
    }, [recentTimeFilters]);

    useEffect(() => {
        type && updateState(start, end);
    //eslint-disable-next-line
    }, [start, end, type]);

    useEffect(() => {
        if (startDate && endDate) {
            updateState(new Date(startDate), new Date(endDate));
            setStart(new Date(startDate));
            setEnd(new Date(endDate));
        } else {
            const { start, end } = getFilterFromTitle('24 hours');
            updateState(start, end);
            setStart(start);
            setEnd(end);
        }
    }, [startDate, endDate]);

    return <React.Fragment>
        {isOpen && <Modal
            isOpen={isOpen}
            onClose={() => setOpen(!isOpen)}
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
            <Form>
                <FormGroup
                    label='Specify column to filter:'
                    isRequired={ !type }
                >
                    <div className='pt-c-filters__date--radio'>
                        {['created_at', 'date'].map(col => <span key={col}>
                            <Radio
                                label={col}
                                onChange={() => setType(col)}
                                isChecked={type === col}
                                isDisabled={pathname === '/payloads' && col === 'date'}
                            />
                        </span>)}
                    </div>
                </FormGroup>
            </Form>
            <Tabs activeKey={activeTab} onSelect={(e, index) => setActiveTab(index)}>
                <Tab eventKey={0} title='Quick'>
                    <Flex className='pf-c-filters__date--tab' direction={{ default: 'column' }}>
                        {filters.map(({ title }, index) =>
                            <FlexItem className='pt-c-filters__date--quick' key={ index }>
                                <Button
                                    variant='link'
                                    isDisabled={!type}
                                    onClick={() => updateFilters(title)}
                                >
                                    <Text>{title}</Text>
                                </Button>
                                <Divider/>
                            </FlexItem>)}
                    </Flex>
                </Tab>
                <Tab eventKey={1} title='Absolute'>
                    <div className='pf-c-filters__date--tab'>
                        <Bullseye>
                            <Form>
                                <Flex direction={{ default: 'row' }}>
                                    <FormGroup label='From'>
                                        <Flex direction={{ default: 'column' }}>
                                            <FlexItem>
                                                <DateTextInput
                                                    ref={ fromRef }
                                                    val={ start }
                                                    setValidation={ setValidation }
                                                />
                                            </FlexItem>
                                            <FlexItem>
                                                <DayPicker onDayClick={(day) => fromRef.current.setValue(day)}/>
                                            </FlexItem>
                                        </Flex>
                                    </FormGroup>
                                    <FormGroup label='To'>
                                        <Flex direction={{ default: 'column' }}>
                                            <FlexItem>
                                                <DateTextInput
                                                    ref={ toRef }
                                                    val={ end }
                                                    setValidation={ setValidation }
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
                    </div>
                </Tab>
            </Tabs>
        </Modal>}
        {leftRecentsStack && leftRecentsStack.length !== 0 && <Button
            variant='inline'
            onClick={ leftRecentHandler }
        > <CaretLeftIcon/> </Button>}
        <Button variant='inline' onClick={() => setOpen(!isOpen)}>
            <Flex direction={{ default: 'row' }} >
                <FlexItem>
                    <ClockIcon/>
                </FlexItem>
                <FlexItem>
                    {start && end ? <span>
                        { getFilterTitle(start, end) || `${getLocalDate(start)} to ${getLocalDate(end)}`}
                    </span> : <Text component='p'> All time </Text>}
                </FlexItem>
            </Flex>
        </Button>
        {rightRecentsStack && rightRecentsStack.length !== 0 && <Button
            variant='inline'
            onClick={ rightRecentHandler }
        > <CaretRightIcon/> </Button>}
    </React.Fragment>;
};

DateRangeFilter.propTypes = {
    updateDateRange: PropTypes.func,
    addNewTimeFilter: PropTypes.func,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    addMessage: PropTypes.func,
    pathname: PropTypes.string,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    recentTimeFilters: PropTypes.array,
    recentTimeType: PropTypes.string
};

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    startDate: state.payloads.startDate,
    endDate: state.payloads.endDate,
    recentTimeFilters: state.payloads.recentTimeFilters,
    recentTimeType: state.payloads.recentTimeType
});

const mapDispatchToProps = dispatch => ({
    updateDateRange: (start, end) => dispatch(AppActions.updateDateRange(start, end)),
    addNewTimeFilter: (type, start, end) => dispatch(AppActions.addNewTimeFilter(type, start, end)),
    setStartDate: (start) => dispatch(AppActions.setStartDate(start)),
    setEndDate: (end) => dispatch(AppActions.setEndDate(end)),
    addMessage: (type, title, content) => dispatch(AppActions.addMessage(type, title, content))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeFilter);
