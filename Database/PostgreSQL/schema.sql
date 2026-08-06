-- ========================================================
-- Armored and Logistics Unit Management System
-- PostgreSQL Enterprise Database Schema
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Soldiers & Officers
CREATE TABLE IF NOT EXISTS soldiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    military_number VARCHAR(50) UNIQUE NOT NULL,
    rank VARCHAR(50) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    unit_company VARCHAR(100) NOT NULL,
    platoon VARCHAR(100),
    status VARCHAR(50) DEFAULT 'PRESENT',
    role VARCHAR(50) DEFAULT 'SOLDIER',
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Daily Services
CREATE TABLE IF NOT EXISTS daily_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_date DATE NOT NULL,
    duty_officer_id UUID REFERENCES soldiers(id),
    assistant_duty_officer_id UUID REFERENCES soldiers(id),
    gate_guard_commander_id UUID REFERENCES soldiers(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Duty Shifts (Tawkat)
CREATE TABLE IF NOT EXISTS duty_shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    daily_service_id UUID REFERENCES daily_services(id) ON DELETE CASCADE,
    soldier_id UUID REFERENCES soldiers(id),
    post_location VARCHAR(100) NOT NULL,
    shift_start_time TIME NOT NULL,
    shift_end_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Armored Vehicles & Fleet
CREATE TABLE IF NOT EXISTS armored_vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_code VARCHAR(50) UNIQUE NOT NULL,
    vehicle_type VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    readiness_status VARCHAR(50) DEFAULT 'OPERATIONAL',
    fuel_level INT DEFAULT 100,
    ammo_status VARCHAR(50) DEFAULT 'FULL',
    last_maintenance_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_soldiers_mil_num ON soldiers(military_number);
CREATE INDEX IF NOT EXISTS idx_soldiers_status ON soldiers(status);
CREATE INDEX IF NOT EXISTS idx_services_date ON daily_services(service_date);
CREATE INDEX IF NOT EXISTS idx_vehicles_readiness ON armored_vehicles(readiness_status);
