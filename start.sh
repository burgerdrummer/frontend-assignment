#!/bin/bash

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install Node.js and npm."
    exit 1
fi


# Install dependencies (optional, can be commented out if not needed)
echo "Installing dependencies..."
npm install

# Start the React server
echo "Starting the React server..."
npm start
