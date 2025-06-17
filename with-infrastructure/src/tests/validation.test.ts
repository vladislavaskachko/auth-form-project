import { validateEmail } from '../validation';

test('valid email', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});