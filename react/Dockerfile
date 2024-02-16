# Frontend Dockerfile
FROM node:18.12.0

WORKDIR /app
#WORKDIR var/www/html

COPY package*.json ./

RUN npm install

#NEW
# Make vite script executable
# RUN chmod +x node_modules/.bin/vite

# Set memory limit for Node.js
#NEW
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Copy node_modules (including installed dependencies) to the container
COPY node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["bash", "-c", "node_modules/.bin/vite --port=3000"]

