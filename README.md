# OR Blog CMS

可上线的博客系统（Next.js + Prisma + PostgreSQL + NextAuth）。

## 功能
- 公网：首页分页、文章详情、标签聚合、搜索、SEO（sitemap/robots）、RSS、404/错误页。
- 后台：Admin 登录、文章 CRUD（草稿/发布）、Markdown 编辑、标签管理。
- 工程化：Prisma migration/seed、TypeScript、ESLint、Vitest、Docker Compose。

## 一键启动（本地开发）
1. 复制环境变量
   ```bash
   cp .env.example .env
   ```
2. 安装依赖
   ```bash
   npm install
   ```
3. 启动数据库（或用本地 Postgres）
   ```bash
   docker compose up -d db
   ```
4. 迁移 + Seed
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```
5. 启动应用
   ```bash
   npm run dev
   ```

## Docker 一条命令
```bash
docker compose up --build
```
> `web` 服务会执行迁移与 seed，然后启动开发服务器。

## 测试与检查
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## 默认管理员
- Email: `ADMIN_EMAIL`（默认 `admin@example.com`）
- Password: `ADMIN_PASSWORD`（默认 `ChangeMe123!`）

## 部署
### 方案 A：Vercel
1. 创建 Postgres（Neon/Supabase/RDS）并设置 `DATABASE_URL`
2. Vercel 配置环境变量（参见 `.env.example`）
3. Build Command：`npm run build`
4. 首次部署后执行 `npm run prisma:migrate && npm run prisma:seed`

### 方案 B：Docker 主机
1. 配置 `.env`
2. `docker compose up --build -d`
3. 反向代理到 `3000`

## FAQ
- **无法发送魔法链接？** 检查 `EMAIL_SERVER` 与 `EMAIL_FROM`。
- **后台无法登录？** 使用 Seed 管理员走 credentials 登录，或配置 SMTP 后使用 email provider。
- **静态资源上传**：默认目录 `public/uploads`。

## 后续增强路线图
- 评论系统（审核 + 垃圾过滤）
- PostgreSQL 全文检索（tsvector）
- 对象存储（S3）和 CDN
- 审计日志与操作回滚
