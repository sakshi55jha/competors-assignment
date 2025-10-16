# ---- Base Node image ----
FROM node:20-alpine AS base

# ---- Set working directory ----
WORKDIR /usr/src/app

# ---- Install dependencies ----
COPY package*.json ./
RUN npm install

# ---- Copy source code ----
COPY . .

# ---- Build NestJS app ----
RUN npm run build

# ---- Expose port ----
EXPOSE 3001

# ---- Run the app ----
CMD ["npm", "run", "start:prod"]
