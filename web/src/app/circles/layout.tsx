import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Circles | Doujinshi Showcase',
};

export default function RootLayout({ children }: Props) {
  return <>{children}</>;
}
