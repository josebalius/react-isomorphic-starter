import path from '../../index';
import expect from 'expect';
import error from 'client/reducers/error';
import {ERROR} from 'client/constants/error';

describe('error reducer', () => {
  it('should set ERROR message', () => {
    expect(
      error({message: null}, {type: ERROR, error: 'Test123'})
    ).toEqual({
      message: 'Test123'
    });
  });
})
