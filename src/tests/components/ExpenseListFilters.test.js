import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseListFilters} from '../../components/ExpenseListFilters'
import {filters, altFilters} from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
  <ExpenseListFilters 
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />)
})

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('Should handle text change', () => {
  const value = 'New Value'
  wrapper.find('input').at(0).simulate('change', {
    target: {value: value}
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should handle sortByDate', () => {
  const value = 'date'
  wrapper.find('select').at(0).simulate('change', {
    target: {
      value: value
    }
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('Should handle sortByAmount', () => {
  const value = 'amount'
  wrapper.find('select').at(0).simulate('change', {
    target: {
      value: value
    }
  })
  expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle date changes', () => {
  const startDate = 1000
  const endDate = 2000
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('Should handle date focus changes', () => {
  const focusedInput = "startDate"
  wrapper.find('DateRangePicker').prop('onFocusChange')(focusedInput)
  expect(wrapper.state('calendarFocused')).toBe(focusedInput)
})