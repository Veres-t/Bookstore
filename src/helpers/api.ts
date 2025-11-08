// helpers/api.ts
/**
 * Обработчик ошибок API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Универсальная функция для обработки HTTP запросов
 */
export const fetchWithErrorHandling = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }
    
    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Сетевые ошибки или ошибки парсинга JSON
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
};

/**
 * Задержка для имитации загрузки (для демо)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};