# B1: build môi trường nodejs trong docker
FROM --platform=linux/arm64 node:lts-alpine as build-stage

# B2: tạo folder BE
WORKDIR /app

# B3: copy file package.json và package-lock.json vào image
COPY package*.json ./

# B3.1: copy folder prisma vào folder prisma trong image
COPY prisma ./prisma/

# B3.2: copy source code vào trong image
COPY . .

# B4: run npm install
RUN npm install

# B5: expose port cho bên ngoài connect tới
EXPOSE 3001

# B6: start server trong image
CMD ["npm", "run", "start:dev"]