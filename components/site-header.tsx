import Link from 'next/link';
export function SiteHeader() {
  return <header className="border-b bg-white"><div className="container flex h-16 items-center gap-6"><Link href="/" className="font-bold">OR Blog</Link><nav className="flex gap-4 text-sm"><Link href="/search">搜索</Link><Link href="/admin/posts">后台</Link></nav></div></header>;
}
