
# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the entire project to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Default command to start the app
CMD ["npm", "start"]
