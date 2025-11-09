// helpers/formatters.ts
/**
 * Форматирует цену книги
 */
export const formatPrice = (price: string | undefined): string => {
  if (!price) return '$0.00';
  return price.startsWith('$') ? price : `$${price}`;
};

/**
 * Форматирует рейтинг книги (округление до целого числа)
 */
export const formatRating = (rating: string | undefined): number => {
  const numericRating = parseFloat(rating ?? '0');
  return Math.floor(numericRating);
};

/**
 * Обрезает длинный текст и добавляет многоточие
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Форматирует количество элементов (1 item, 2 items)
 */
export const formatItemsCount = (count: number, singular: string, plural?: string): string => {
  const pluralForm = plural || singular + 's';
  return count === 1 ? `${count} ${singular}` : `${count} ${pluralForm}`;
};

/**
 * Декодирует HTML-entities в нормальный текст
 */
export const decodeHtmlEntities = (text: string): string => {
  if (!text) return '';
  
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};