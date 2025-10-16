"use client";

import {ThemeProvider as NextThemeProvider, ThemeProviderProps} from 'next-themes';

export const ThemeProvider = ({children, ...props}: ThemeProviderProps) => (
  <NextThemeProvider {...props}>{children}</NextThemeProvider>
);
