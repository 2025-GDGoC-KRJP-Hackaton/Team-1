# UnbAIsly

## Introduction

A service that recommends articles to help users access diverse political perspectives and analyzes information from articles with differing viewpoints.

## Tech Stacks

- Next.js 15 App Router
- Drizzle ORM
- PostgreSQL
- Jotai
- Heroicons
- Tailwind CSS
- Google Gemini API

## How to Start

1. Install Packages

```bash
pnpm i
```

2. Copy .env file

```bash
cp .env.example .env
```

3. Add Env Info
   DATABASE_URL: PostgreSQL Databse Access URL
   GEMINI_KEY: Token to Access Gemini API (from Google Cloud)

4. Run Next.js

```bash
pnpm dev
```
