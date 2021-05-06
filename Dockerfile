FROM mcr.microsoft.com/playwright:latest
WORKDIR /usr/src/app
COPY package.json package*.json ./
ENV PLAYWRIGHT_BROWSERS_PATH=0
RUN npm ci
COPY . .
RUN ./node_modules/.bin/tsc test-a11y.ts
#CMD ["node", "app.js"]
#CMD ["./node_modules/.bin/tsc", "test/a11y.spec.ts"]
#CMD ["npm", "run", "test-mocha"]
#CMD ["npm", "run", "cmd-line"]
CMD ["node", "test-a11y.js"]