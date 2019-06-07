import authReducer from '../../reducers/auth'

test('Should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc'
  }
  const state = authReducer({}, action)
  expect(state).toEqual({uid:'abc'})
})

test('Should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({uid: 'anything'}, action)
  expect(state).toEqual({})
})