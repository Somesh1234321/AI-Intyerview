# Fix "DATABASE_URL is required" Error

## Steps

- [x] 0. Analyze the task and explore relevant files
- [x] 1. Understand root cause (db/index.ts module-level throw)
- [x] 2. Present plan and get approval
- [x] 3. Rewrite `src/db/index.ts` to lazily initialize DB (no module-level throw)
- [x] 4. Update `src/app/api/health/route.ts` to handle missing DB gracefully
- [x] 5. Add `.env.example` documenting optional `DATABASE_URL`
- [x] 6. Verify with `npm run build` (and `npm run dev`) in AI-Intyerview
