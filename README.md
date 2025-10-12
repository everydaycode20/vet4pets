# Vet4Pets-Veterinary Management Dashboard

This project is a revamp of a veterinary management system I had built before. I decided to rebuild it from scratch this time with better architecture, maintainability, and modern tooling.

https://github.com/user-attachments/assets/73cbcd73-ff04-4ed6-936b-6b8e25069624

## Features

* Appointments Management: Schedule, update, and track appointments.
* Authentication and Authorization: implemented ASP.NET Identity for access.
* Owners and Pet records: manage clients and their pets with their medical and personal data.
* Real-time notifications: using SignalR for instant updates (appointments reminders).
* Task scheduling: automated reminders with Quarttz.NET.
* Analytics and reporting: basic stats such as appointments per week, day, or type.
* Responsive frontend: built with React, Tailwind, Sass, React Query and Typescript.
* Accessibility: accessible headless components.

## Tech Stack
### Backend
* C#, ASP.NET Core (.NET 8)
* SQL Server (Entity Framework)
* ASP.NET Identity
* SignaR
* Quartz.NET

### Frontend
* React + Vite
* React Query
* Typescript
* Tailwind CSS

## Why a revamp?
* I could write cleaner and more maintainable code.
* I had learned modern frontend practices.
* I have improved my backend knowledge and wanted to make a better API.

### Future improvements
* Role-based access (Admin, Vet, Receptionist).
* More detailed reporting and charts.
