# System Architecture - Armored and Logistics Unit Management System

## Overview
This document outlines the high-level architecture for the Armored and Logistics Unit Management System.

```
Dashboard (React + TS)     Mobile App (Flutter)
            │                         │
            └───────────┬─────────────┘
                        │ REST APIs / SignalR
                        ▼
         ASP.NET Core 9 Clean Architecture API
   (Application, Domain, Infrastructure, Persistence)
                        │
                        ▼
           PostgreSQL Relational DB
```

## Clean Architecture Layers
1. **Domain**: Contains core Entities, Enums, and Value Objects. No external dependencies.
2. **Application**: Contains CQRS Commands/Queries, MediatR Handlers, DTOs, and Validators.
3. **Infrastructure**: Implementations of EF Core DbContext, Repositories, Serilog Logging, and Firebase Push Notification Service.
4. **API**: ASP.NET Core Web API Controllers, OpenAPI Swagger Docs, Middleware, and JWT Authentication.
