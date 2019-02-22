import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpense, removeExpense, history, wrapper

beforeEach(() => {
  editExpense = jest.fn()
  removeExpense = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(
    <EditExpensePage 
      editExpense={editExpense} 
      removeExpense={removeExpense}
      history={history}
      expense={expenses[0]}
    />)
})

test('Should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should handle editExpense', () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0])
  expect(editExpense).toHaveBeenLastCalledWith("1", expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
})

test('Should handle removeExpense', () => {
  wrapper.find("button").at(0).simulate('click')
  expect(removeExpense).toHaveBeenLastCalledWith({id: "1"})
  expect(history.push).toHaveBeenLastCalledWith('/')
})