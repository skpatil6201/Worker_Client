# Interview Backend

Small Node backend for interview scheduling.

## Run

```bash
npm run backend:dev
```

Default URL:

```text
http://localhost:8081
```

## Endpoints

- `POST /api/interviews` schedule an interview
- `GET /api/interviews/candidate/current?candidateId=...&candidateEmail=...`
- `GET /api/interviews/firm/current?firmId=...&company=...`
- `PUT /api/interviews/:id/status`
- `GET /api/health`

Data is stored in `backend/data/interviews.json`.
