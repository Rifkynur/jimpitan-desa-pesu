# ======================
# 1. Dependencies
# ======================
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat # Diperlukan untuk beberapa dependensi native node
WORKDIR /app

COPY package*.json ./
RUN npm ci

# ======================
# 2. Builder
# ======================
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variable saat build jika dibutuhkan (misal URL API backend)
# ENV NEXT_PUBLIC_API_URL=http://vps-ip-mu:5000

RUN npm run build

# ======================
# 3. Runner (Production)
# ======================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Menonaktifkan telemetri Next.js demi privasi dan performa di VPS
ENV NEXT_TELEMETRY_DISABLED=1 

# Membuat user sistem khusus demi keamanan (agar tidak berjalan sebagai root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Menyalin folder public dan static ke tempat yang tepat
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]