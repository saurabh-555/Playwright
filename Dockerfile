FROM mcr.microsoft.com/playwright:v1.58.0-jammy

WORKDIR /app

COPY package.json ./
RUN npm install --force

COPY . .

RUN npx playwright install --with-deps chromium