import { Metadata } from 'next';
import { Providers } from '@/lib/providers';

import '@/app/styles/globals.css';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Doujinshi Showcase',
};

export default function RootLayout({ children }: Props) {
  return (
    <Providers>
      <html lang="en">
        <body className="bg-white dark:bg-black">
          <main className="bg-white dark:bg-black">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
