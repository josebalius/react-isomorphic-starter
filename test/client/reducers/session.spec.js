import path from '../../index';
import expect from 'expect';
import session from 'client/reducers/session';
import {LOGOUT, LOGIN} from 'client/constants/session';

describe('session reducer', () => {
  it('should LOGOUT', () => {
    expect(
      session({token: '1234', }, {
        type: LOGOUT
      })
    ).toEqual({
      token: null
    })
  })

  it('should LOGIN', () => {
    expect(
      session({token: null, }, {
        type: LOGIN,
        token: '123'
      })
    ).toEqual({
      token: '123'
    })
  })
})
