import { Shape } from './Shape';

describe('Shape test set', () => {
  test('Shape renders properly', () => {
    let shape = new Shape(20, 20, 20, 20, '#fff');
    let containsPoint = shape.contains(21, 21);
    expect(containsPoint).toBeTruthy();
  })
});
