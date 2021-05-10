FROM mcr.microsoft.com/playwright:latest
#FROM alpine:latest
WORKDIR /usr/src/app
COPY package.json package*.json ./
#ENV PLAYWRIGHT_BROWSERS_PATH=0
RUN npm ci
COPY . .
RUN ./node_modules/.bin/tsc test-a11y.ts
CMD ["node", "test-a11y.js"]
