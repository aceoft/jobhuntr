# JobHuntr - System Design Document

## 1. Overview

**JobHuntr** is a full-stack web application designed to help users track and manage job applications, outreach efforts, and related analytics.

It enables:

- Tracking companies and applications
- Managing outreach contacts and communication history
- Monitoring application progress over time
- Generating insights (response rates, timelines, etc.)

## 2. Goals & Non-Goals

### Goals

- Provide a simple, fast UI for tracking job applications
- Maintain clean, evolvable domain models
- Support analytics and dashboard insights
- Ensure safe and predictable data updates
- Share types between frontend and backend

### Non-Goals (for now)

- Multi-user collaboration
- Authentication/authorization (initially optional)
- Real-time updates (WebSockets, etc.)
- Complex reporting engine

## 3. High-Level Architecture

**Stack:**

- Frontend: React + TypeScript (Vite)
- Backend: Node.js + Express + TypeScript
- Database: MongoDB (Mongoose)
- Shared: TypeScript package for models/types

### Architecture Diagram (Conceptual)

```
[ React Client ]
       |
       | REST API (JSON)
       v
[ Node/Express API ]
       |
       v
[ MongoDB ]
```

### Key Design Choice

A **shared TypeScript package** ensures:

- Consistent DTOs
- Shared enums
- Reduced duplication
- Strong typing across boundaries

## 4. Domain Model

### Core Entities

#### Company

```ts
{
  _id: string;
  name: string;
  careersUrl?: string;
  active: boolean;
  outreach: OutreachPerson[];
}
```

#### Application

```ts
{
  _id: string;
  companyId: string;
  position: string;
  level: ApplicationLevel;
  status: ApplicationStatus;
  appliedOn?: Date;
  respondedOn?: Date;
  interviewOn?: Date;
  notes?: string;
}
```

#### OutreachPerson

```ts
{
  id: string;
  name: string;
  email?: string;
  role?: string;
  url?: string;
  events: OutreachEvent[];
}
```

#### OutreachEvent

```ts
{
  id: string;
  at: Date;
  isResponse: boolean;
  text?: string;
}
```

### Enums

```ts
type ApplicationStatus = 'saved' | 'applied' | 'responded' | 'interview' | 'offer' | 'rejected' | 'withdrawn';

type ApplicationLevel = 'mid' | 'senior' | 'staff' | 'management';
```

## 5. API Design

### Principles

- RESTful endpoints
- DTO-based responses (never raw Mongo docs)
- Explicit mapping layer
- Partial updates preferred over full replacements

### Example Endpoints

#### Companies

```
GET    /companies
GET    /companies/:id
POST   /companies
PUT    /companies/:id
```

#### Applications

```
GET    /applications
POST   /applications
PUT    /applications/:id
```

## 6. Frontend Architecture

### Core Stack

- React
- TypeScript
- Vite
- React Router

### Component Patterns

#### Controlled Inputs

```tsx
<Input label="Name" value={newPerson.name} onChange={(v) => updateNewPerson('name', v)} />
```

## 7. Data Handling & Validation

### Key Decisions

- Use DTOs between client/server
- Avoid passing raw Mongo documents
- Normalize null vs undefined explicitly

## 8. ID Strategy

### Client-generated IDs for subdocuments

- OutreachPerson.id
- OutreachEvent.id

## 9. Update Strategy

### Partial Updates Preferred

- Safer
- Prevents accidental overwrites
- Easier to reason about

## 10. Future Enhancements

### Short-Term

- Dashboard metrics
- Filtering/sorting UI
- Better form UX

### Mid-Term

- Authentication
- Multi-user support
- Tags or categories

### Long-Term

- AI-assisted insights
- Job board integrations
- Email parsing

## 11. Key Design Philosophy

- Clarity over magic
- Explicit mappings over implicit coupling
- Type safety over convenience
- Incremental evolution over premature abstraction

## 12. Dashboard Feature Ideas

- Active application count with company count
- Average age of active applications
- Current rejection rate
- Current response rate
- How many apps this week vs goal (8/10)
- Average age of posting on active applications
- Average time to first response (rejection or otherwise)
