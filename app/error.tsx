'use client';

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);
  return <main className="container py-16"><h1 className="text-3xl font-bold">服务暂时不可用</h1><p className="mt-2 text-slate-600">请稍后再试，错误已记录。</p></main>;
}
