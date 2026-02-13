'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [error, setError] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: true, callbackUrl: '/admin/posts' });
    if (res?.error) setError(res.error);
  }
  return <main className="container py-12"><h1 className="mb-4 text-2xl font-bold">后台登录</h1><form className="max-w-sm space-y-3" onSubmit={onSubmit}><input name="email" type="email" className="w-full rounded border p-2" placeholder="Email" /><input name="password" type="password" className="w-full rounded border p-2" placeholder="Password" /><button className="rounded bg-slate-900 px-4 py-2 text-white">登录</button>{error && <p className="text-sm text-red-600">{error}</p>}</form></main>;
}
