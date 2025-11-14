#!/bin/bash

echo "Starting Movie Review Application..."

# Start backend
echo "Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend development server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "Backend running on http://localhost:3000"
echo "Frontend running on http://localhost:5173"
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID
