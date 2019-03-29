import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('Should set default state', () => {
    const state = expensesReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual([])
})

test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('Should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: 4,
            description: 'Antidepressants',
            note: 'Life is good',
            amount: 1000,
            createdAt: 10
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([
        ...expenses,
        {
            id: 4,
            description: 'Antidepressants',
            note: 'Life is good',
            amount: 1000,
            createdAt: 10
        }
    ])
})

test('Should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: "1",
        updates: {
            amount: 400
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([{
        id: "1",
        description: 'Gum',
        note: '',
        amount: 400,
        createdAt: 0
    }, expenses[1], expenses[2]])
})

test('Should not edit expenses if no id matches', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: "5",
        updates: {
            amount: 400
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('Should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[1]])
})