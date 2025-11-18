// src/__tests__/setupTests.ts
import '@testing-library/jest-dom';

// ✅ ДОБАВЬТЕ ПОЛИФИЛЛЫ ДЛЯ TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});