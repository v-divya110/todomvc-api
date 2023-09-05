# Base image
FROM node:16

# Set working directory in Docker container
WORKDIR /tmp

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local content into container
COPY . .

# Build the TypeScript
RUN npm run build

# Start the server
CMD ["node", "./dist/src/index.js"]
