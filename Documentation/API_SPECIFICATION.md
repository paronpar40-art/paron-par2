# API Specification - Armored and Logistics Unit Management System

## Base URL
`http://localhost:5000/api/v1`

## Endpoints Summary

### Authentication
- `POST /auth/login` - Authenticate officer/soldier with military credentials.
- `POST /auth/refresh` - Refresh access token.

### Soldiers & Attendance
- `GET /soldiers` - Get list of unit personnel with optional filters (`status`, `company`).
- `GET /soldiers/{id}` - Get soldier details.
- `POST /attendance/checkin` - Submit daily attendance from soldier mobile app.

### Daily Service & Duty Officers
- `GET /daily-service/current` - Retrieve today's duty officers and shift assignments.
- `POST /daily-service/assign` - Create or update duty assignments for a date.

### Armored Fleet & Maintenance
- `GET /vehicles` - Retrieve status of tanks, APCs, and logistics trucks.
- `PUT /vehicles/{code}/readiness` - Update vehicle operational readiness.
