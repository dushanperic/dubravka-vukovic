import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/dubravka-vukovic/',
  test: {
    include: ['src/**/*.test.ts'],
  },
});
