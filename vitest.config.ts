import { defineConfig } from 'vitest/config';

const base = '/dubravka-vukovic/';

export default defineConfig({
  base,
  test: {
    env: {
      BASE_URL: base,
    },
    include: ['src/**/*.test.ts'],
  },
});
