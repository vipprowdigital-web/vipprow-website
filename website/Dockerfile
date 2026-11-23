# website\Dockerfile
#
# Uses Next.js "standalone" output (already enabled in next.config.js): the
# final image holds only the server and the files it actually needs, instead
# of the whole project plus every node_module. Smaller image = faster push,
# pull and restart. Cache mounts keep npm downloads and the Next.js build
# cache between deploys, so rebuilds after small changes are much quicker.
# (Requires BuildKit, the default in Docker 23+.)

# ---------- deps: only re-runs when package.json / package-lock.json change
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---------- build
FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* values are baked into the site at build time. They can come
# from the hosting panel as build arguments, or from a .env file in the
# project. Empty arguments are unset so they don't override the .env file.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CROISSIX_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,target=/app/.next/cache \
    [ -n "$NEXT_PUBLIC_API_URL" ] || unset NEXT_PUBLIC_API_URL; \
    [ -n "$NEXT_PUBLIC_CROISSIX_API_URL" ] || unset NEXT_PUBLIC_CROISSIX_API_URL; \
    npm run build

# ---------- runtime: standalone server only
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
