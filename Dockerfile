# Multi-stage Dockerfile for TruckFlow (frontend + backend)

# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy frontend package files
COPY frontend/package.json ./frontend/

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy frontend source files
COPY frontend/ ./

# Build frontend
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend-builder

WORKDIR /app

# Copy backend package files
COPY backend/package.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Copy backend source files
COPY backend/ ./

# Build backend
RUN npm run build

# Stage 3: Final image with both frontend and backend
FROM node:20-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy built frontend from frontend-builder
COPY --from=frontend-builder /app/frontend/dist ./frontend-dist
COPY --from=frontend-builder /app/frontend/node_modules ./frontend-node_modules
COPY --from=frontend-builder /app/frontend/package.json ./frontend-package.json

# Copy built backend from backend-builder
COPY --from=backend-builder /app/backend/dist ./backend-dist
COPY --from=backend-builder /app/backend/node_modules ./backend-node_modules
COPY --from=backend-builder /app/backend/package.json ./backend-package.json

# Install production dependencies for backend
WORKDIR /app/backend
COPY --from=backend-builder /app/backend/package.json ./
RUN npm install --production

# Create uploads directory for backend
RUN mkdir -p /app/backend/uploads

# Expose ports
EXPOSE 3000
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Command to run both services
CMD ["sh", "-c", "cd /app/backend && npm start & cd /app/frontend && npm run preview"]