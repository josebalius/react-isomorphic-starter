import path from '../../index';
import expect from 'expect';
import home from 'client/reducers/home';
import {GET_HOME} from 'client/constants/home';

describe('home reducer', () => {
  it('should GET_HOME', () => {
    expect(
      home({data: {} }, {
        type: GET_HOME,
        data: {xyz: 123}
      })
    ).toEqual({
      data: {xyz: 123}
    })
  })
});
