import type {Metadata} from 'next';
import './globals.css';
import {ReactQueryClientProvider} from '../providers/react-query-client-provider';
import {ThemeProvider} from '../providers/theme-provider';

export const metadata: Metadata = {
  title: 'Chrono',
  description: 'Chrono is Thailand’s momentum hub for verified developer talent.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className="min-h-screen bg-neutral-950 text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
