// helpers/validation.ts
/**
 * Валидация email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валидация пароля (минимум 6 символов)
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Проверка совпадения паролей
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Валидация поискового запроса
 */
export const validateSearchQuery = (query: string): boolean => {
  return query.trim().length >= 2;
};