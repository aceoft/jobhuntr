# JobHuntr

## Tech stack

- MERN (Mongo, Express, React, Node)

## Dashboard Features

- Active application count with company count
- Average age of active applications
- Current rejection rate
- Current response rate
- How many apps this week vs goal (8/10)
- Average age of posting on active applications
- Average time to first response (rejection or otherwise)

## Potential Application shape

```typescript
{
  _id: string;
  companyId: string;
  companyNameSnapshot: string;
  roleTitle: string;
  status: "saved" | "applied" | "responded" | "interview" | "offer" | "rejected" | "withdrawn";

  appliedAt?: Date;
  postedAt?: Date;
  postingAgeDaysAtApply?: number;

  firstResponseAt?: Date;
  firstResponseType?: "rejection" | "positive" | "other";

  rejectedAt?: Date;
  closedAt?: Date;

  statusHistory: [
    {
      status: string;
      at: Date;
      note?: string;
    }
  ],

  notes: [
    {
      at: Date;
      text: string;
    }
  ],

  createdAt: Date;
  updatedAt: Date;
}
```
