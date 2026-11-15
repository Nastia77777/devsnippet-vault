# Skill: Add API Endpoint

## Description
This skill helps add a new API endpoint to the Express server.

## When to use
Use this skill when you need to add a new route (GET, POST, DELETE, etc.) to the server.

## Steps
1. Open `server/src/index.ts`.
2. Add the new route using `app.get`, `app.post`, `app.delete`, etc.
3. If the route requires validation, add a schema in `server/src/schemas.ts` using Zod.
4. Ensure the route returns the correct HTTP status code:
   - 200 for successful GET
   - 201 for successful POST
   - 204 for successful DELETE
   - 400 for validation errors
   - 500 for server errors
5. Use `db.orm.public.Snippet` for database operations (Prisma 8 syntax).
6. Test the endpoint using `curl` or Postman.

## Example
```typescript
app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await db.orm.public.Snippet.all();
    res.json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch snippets' });
  }
});

```

## Notes
- Always use try/catch for error handling.
- Always validate input data with Zod before saving to the database.
- Use `db.orm.public.Snippet` for all snippet operations.