#!/usr/bin/env bash
set -e

echo "========================================================="
echo " Armored & Logistics Unit Management System Deployment "
echo "========================================================="

echo "[1/4] Checking Docker and Environment..."
docker --version
docker compose version

echo "[2/4] Building Docker Containers..."
docker compose build

echo "[3/4] Starting Services (PostgreSQL, Backend API, Web Dashboard)..."
docker compose up -d

echo "[4/4] Deployment Completed Successfully!"
echo "Web Dashboard: http://localhost:3000"
echo "API Swagger: http://localhost:5000/swagger"
