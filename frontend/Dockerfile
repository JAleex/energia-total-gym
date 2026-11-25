FROM node:22-alpine

WORKDIR /app

# Se instalan las librerías de React
COPY package*.json ./
RUN npm install

# Se copia el código del proyecto
COPY . .

EXPOSE 5173

# Se inicia Vite para que se pueda abrir desde el navegador
CMD ["npm", "run", "dev", "--", "--host"]
