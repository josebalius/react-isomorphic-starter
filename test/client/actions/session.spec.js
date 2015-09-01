require('../../index');

import expect from 'expect';
import {logout, login} from 'client/actions/session';
import {LOGOUT, LOGIN} from 'client/constants/session';
import {ERROR} from 'client/constants/error';

describe('session actions', () => {
  it('should LOGOUT', () => {
    expect(logout()).toEqual({type: LOGOUT});
  });

  it('should LOGIN', () => {
    login('admin', 'test')((response) => {
      expect(response.type).toEqual(LOGIN);
      expect(response.token).not.toEqual(null);
    });
  });

  it('should dispatch ERROR on failed login', () => {
    login('admin', '')((response) => {
      expect(response.type).toEqual(ERROR);
      expect(response.error).toContain('Invalid');
    });
  });
});
