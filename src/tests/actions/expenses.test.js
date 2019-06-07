import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {startEditExpense, startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'
import moment from 'moment'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] = {description, note, amount, createdAt}
  })
  database.ref('expenses').set(expensesData).then(() => done())
})

test('Should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'})
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('Should setup edit expense action object', () => {
  const action = editExpense('123abc', {note: '10plm'})
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: '10plm'
    }
  })
})

test('Should edit expense in database and store', (done) => {
  const store = createMockStore({})
  const id = expenses[2].id
  const updates = {description: "Credit", amount: 450}
  const updated_expense = {
    id: '3',
    description: 'Credit',
    note: '',
    amount: 450,
    createdAt: moment(0).add(4, 'days').valueOf()
  }

  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    })
    database.ref(`expenses/${actions[0].id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toEqual(updated_expense)
    })
  })
})

test('Should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('Should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })
    database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
    })
  })
})

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })
    database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })
  })
})

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})

test('Should remove expenses from firebase', (done) => {
  const store = createMockStore({})
  const id = expenses[2].id
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    return database.ref(`expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
    done()
  })
})

// test('Should remove expenses from firebase', (done) => {
//   const ids = []
//   const store = createMockStore({})
//   database.ref('expenses').once('value').then((snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       ids.push(childSnapshot.key)
//     })
//   }).then(() => {
//     store.dispatch(startRemoveExpense({id: ids[0]})).then(() => {
//       database.ref(`expenses/${ids[0]}`).once('value').then((snapshot) => {
//         expect(snapshot.val()).toBeNull()
//         done()
//       })
//     })
//   })
// })

// test('Should setup add expense action object with default values', () => {
//   const action = addExpense()
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   })
// })