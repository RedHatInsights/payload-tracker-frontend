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
    Text,
    CalendarMonth
} from '@patternfly/react-core';
import { CaretLeftIcon, CaretRightIcon, ClockIcon } from '@patternfly/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { quickFilters, useQuickFilters, useStacks } from './utils';

import DateTextInput from './DateTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalDate } from '../../utilities/Common';
import { useLocation } from 'react-router-dom';

const DateRangeFilter = () => {
    const { pathname } = useLocation();
    const startDate = useSelector(state => state.payloads.startDate);
    const endDate = useSelector(state => state.payloads.endDate);
    const recentTimeType = useSelector(state => state.payloads.recentTimeType);
    const dispatch = useDispatch();

    const defaultFilters = quickFilters();
    const defaultRange = defaultFilters.filter(({ start, end, title }) => title === '15 minutes' && ({ start, end }))?.[0];
    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [type, setType] = useState(recentTimeType);
    const [isValidated, setValidation] = useState(true);
    const { active, leftStack, toggleLeft, rightStack, toggleRight, updateData } = useStacks(defaultRange);
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
            dispatch(AppActions.addMessage('danger', 'Date range error', `${getLocalDate(start)} is not before ${getLocalDate(end)}`));
        }
    };

    useEffect(() => {
        type !== recentTimeType &&  dispatch(AppActions.setRecentTimeType((type)));
        type && dispatch(AppActions.updateDateRange(active?.start, active?.end));
    //eslint-disable-next-line
    }, [active, type]);

    useEffect(() => {
        if (startDate && endDate && JSON.stringify(active) !== JSON.stringify({ start: new Date(startDate), end: new Date(endDate) })) {
            dispatch(AppActions.updateDateRange(new Date(startDate), new Date(endDate)));
            updateData(new Date(startDate), new Date(endDate));
        }
    //eslint-disable-next-line
    }, [startDate, endDate]);

    return <React.Fragment>
        {isOpen && <Modal
            className='pt-c-filters__date--modal'
            isOpen={isOpen}
            onClose={() => setOpen(!isOpen)}
            title='Set time range'
            variant='large'
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
                                                <CalendarMonth
                                                    onChange={(day) => fromRef.current.setValue(day)}
                                                />                                            </FlexItem>
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
                                                <CalendarMonth
                                                    onChange={(day) => toRef.current.setValue(day)}
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

export default DateRangeFilter;
