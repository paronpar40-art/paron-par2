#!/usr/bin/env bash
set -e

echo "Running PostgreSQL Database Setup and Initial Seed..."
DB_CONTAINER="armored_postgres"

docker exec -i $DB_CONTAINER psql -U postgres -d armored_unit_db < ./Database/PostgreSQL/schema.sql
docker exec -i $DB_CONTAINER psql -U postgres -d armored_unit_db < ./Database/PostgreSQL/seed.sql

echo "PostgreSQL Schema and Seed Applied Successfully!"
