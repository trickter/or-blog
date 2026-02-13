import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: { default: 'OR Blog', template: '%s | OR Blog' },
  description: 'Production-ready Blog CMS and public site.',
  openGraph: { title: 'OR Blog', description: 'Production-ready Blog CMS and public site.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body><SiteHeader />{children}</body></html>;
}
