import index from '../index';
import expect from 'expect';
import {resolve, resolveData, promisify} from 'common/dataManager';

describe('isomorphic data resolver', () => {
  // it('should provide a transitionHook', () => {
  //   let called = false;
  //   transitionHook((location) => {
  //     expect(location).toEqual('123');
  //   })({location: '123'}, null, () => {
  //     called = true;
  //   });
  //
  //   setTimeout(() => {
  //     expect(called).toEqual(true);
  //   }, 0);
  // });

  it('should provide a resolve decorator', () => {
    let component = {};

    resolve(() => {
      xyz: 123
    })(component);

    expect(typeof component.query).toEqual('function');
  });

  it('should promisify a query', () => {
    let called = false, resolved = false;

    promisify((cb) => {
      called = true;
      cb();
    }).then(() => {
      resolved = true;
    });

    setTimeout(() => expect(called).toEqual(true), 0);
    setTimeout(() => expect(resolved).toEqual(true), 0);
  });

  it('should provide a resolveData function', () => {

  });
});
