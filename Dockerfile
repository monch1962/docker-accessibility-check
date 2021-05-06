#FROM node:alpine
#COPY package.json .
#COPY package-lock.json .
#COPY test/ test/
#RUN npm install
#ENTRYPOINT ["npm test"]
FROM mcr.microsoft.com/playwright:bionic
WORKDIR /usr/src/app
COPY package.json package*.json ./
ENV PLAYWRIGHT_BROWSERS_PATH=0
RUN npm ci
COPY . .
#CMD ["node", "app.js"]
#CMD ["./node_modules/.bin/tsc", "test/a11y.spec.ts"]
#CMD ["npm", "run", "test-mocha"]
CMD ["npm", "run", "cmd-line"]