import React from 'react'
import {ExpenseSummary} from '../../components/ExpenseSummary'
import {shallow} from 'enzyme'

test('Should render with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={235} />)

  expect(wrapper).toMatchSnapshot()
})

test('Should render with 2 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={20} expensesTotal={23487200} />)

  expect(wrapper).toMatchSnapshot()
})