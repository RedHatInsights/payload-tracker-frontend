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
import React, { useEffect, useRef, useState } from 'react';
import { quickFilters, useQuickFilters, useStacks } from './utils';

import DateTextInput from './DateTextInput';
import DayPicker from 'react-day-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocalDate } from '../../utilities/Common';

const DateRangeFilter = ({ updateDateRange, setRecentTimeType, pathname, addMessage, startDate, endDate, recentTimeType }) => {
    const defaultFilters = quickFilters();
    const oneDayRange = defaultFilters.filter(({ start, end, title }) => title === '24 hours' && ({ start, end }))?.[0];
    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [type, setType] = useState(recentTimeType);
    const [isValidated, setValidation] = useState(true);
    const { active, leftStack, toggleLeft, rightStack, toggleRight, updateData } = useStacks(oneDayRange);
    const { filters, getFilterTitle, updateFilters } = useQuickFilters(defaultFilters, (filter) => {
        const res = filters.filter(({ title }) => title === filter)?.[0];
        if (res) {
            updateData(res?.start, res?.end);
            setOpen(!isOpen);
            setActiveTab(0);
        }
    });
    const fromRef = useRef();
    const toRef = useRef();

    const setDates = () => {
        setOpen(!isOpen);
        const start = fromRef.current.getValue();
        const end = toRef.current.getValue();
        if (end >= start) {
            updateData(start, end);
        } else {
            addMessage('danger', 'Date range error', `${getLocalDate(start)} is not before ${getLocalDate(end)}`);
        }
    };

    useEffect(() => {
        type !== recentTimeType && setRecentTimeType(type);
        type && updateDateRange(active?.start, active?.end);
    //eslint-disable-next-line
    }, [active, type]);

    useEffect(() => {
        if (startDate && endDate && JSON.stringify(active) !== JSON.stringify({ start: new Date(startDate), end: new Date(endDate) })) {
            updateDateRange(new Date(startDate), new Date(endDate));
            updateData(new Date(startDate), new Date(endDate));
        }
    //eslint-disable-next-line
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
                                                    val={ active?.start }
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
                                                    val={ active?.end }
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
        {leftStack && leftStack.length !== 0 && <Button
            variant='inline'
            onClick={ toggleLeft }
        > <CaretLeftIcon/> </Button>}
        <Button variant='inline' onClick={() => setOpen(!isOpen)}>
            <Flex direction={{ default: 'row' }} >
                <FlexItem>
                    <ClockIcon/>
                </FlexItem>
                <FlexItem>
                    {getFilterTitle(active?.start, active?.end) || `${getLocalDate(active?.start)} to ${getLocalDate(active?.end)}`}
                </FlexItem>
            </Flex>
        </Button>
        {rightStack && rightStack.length !== 0 && <Button
            variant='inline'
            onClick={ toggleRight }
        > <CaretRightIcon/> </Button>}
    </React.Fragment>;
};

DateRangeFilter.propTypes = {
    updateDateRange: PropTypes.func,
    setRecentTimeType: PropTypes.func,
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
    setRecentTimeType: (type) => dispatch(AppActions.setRecentTimeType(type)),
    setStartDate: (start) => dispatch(AppActions.setStartDate(start)),
    setEndDate: (end) => dispatch(AppActions.setEndDate(end)),
    addMessage: (type, title, content) => dispatch(AppActions.addMessage(type, title, content))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeFilter);
