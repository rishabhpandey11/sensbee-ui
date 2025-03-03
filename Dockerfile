# Use an official Node.js runtime as a base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock if you're using Yarn)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project files into the container
COPY . .

# Expose the port the app will run on (Vite's default port is 5173)
EXPOSE 5173

# Run the development server (in this case, using Vite)
CMD ["npm", "run", "dev"]
