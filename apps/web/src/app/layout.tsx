import type {Metadata} from 'next';
import './globals.css';
import {ReactQueryClientProvider} from '../providers/react-query-client-provider';
import {ThemeProvider} from '../providers/theme-provider';

export const metadata: Metadata = {
  title: 'Code Arena',
  description: 'Thailand’s proving grounds for emerging developers.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
