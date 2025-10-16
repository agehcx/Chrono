import type {Config} from 'tailwindcss';
import sharedPreset from '@code-arena/config/tailwind-preset';

const config: Config = {
  presets: [sharedPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/config/**/*.ts'
  ]
};

export default config;
