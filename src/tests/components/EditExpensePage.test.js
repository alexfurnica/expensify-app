import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let startEditExpense, startRemoveExpense, history, wrapper

beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(
    <EditExpensePage 
      startEditExpense={startEditExpense} 
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />)
})

test('Should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should handle editExpense', () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0])
  expect(startEditExpense).toHaveBeenLastCalledWith("1", expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
})

test('Should handle startRemoveExpense', () => {
  wrapper.find("button").at(0).simulate('click')
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: "1"})
  expect(history.push).toHaveBeenLastCalledWith('/')
})