##### DEPENDENCIES

FROM node:16-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json package-lock.json* ./

RUN npm install

##### BUILDER

FROM node:16-alpine3.17 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgresql://postgres:surgeapp1234!@db.zjbjwmzfbmoykisvhhie.supabase.co:5432/postgres
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=VxXp3pH3pCgKfBerXEGAQbplmdSo1LuxCbb40gyXM0w
ENV GITHUB_CLIENT_ID=12f25048adbe72b6e419
ENV GITHUB_CLIENT_SECRET=6463d8cf05328f08bed16737336f84c06ac40745
ENV NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_SUPABASE_URL=zjbjwmzfbmoykisvhhie.supabase.co
ENV NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqYmp3bXpmYm1veWtpc3ZoaGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ0NjQ5OTQsImV4cCI6MTk5MDA0MDk5NH0.LSlghtXGM1Q5e9vEfw2KhyQB9bneFzMMWbVQvkIn6FU
ENV NEXT_PUBLIC_SUPABASE_IMAGE_URL=https://zjbjwmzfbmoykisvhhie.supabase.co/storage/v1/object/public/surgeapp/
ENV NEXT_PUBLIC_HCAPTCHA_SITE_KEY=09b0a265-7e77-438c-91a9-3ae7123a7b8b

RUN SKIP_ENV_VALIDATION=1 npm run build

##### RUNNER

FROM node:16-alpine3.17 AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]