// __tests__/helpers/validation.test.ts
import { validateEmail, validatePassword } from '../../helpers';


describe('validation helpers', () => {
  
  describe('validateEmail', () => {
    //  Валидные email адреса
    it('should return true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    //  Невалидные email адреса
    it('should return false for invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    //  Пароль достаточной длины
    it('should return true for passwords with at least 6 characters', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('password')).toBe(true);
      expect(validatePassword('secure123')).toBe(true);
    });

    //  Слишком короткий пароль
    it('should return false for passwords shorter than 6 characters', () => {
      expect(validatePassword('123')).toBe(false);
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('short')).toBe(false);
    });
  });
});