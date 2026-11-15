import express from 'express';
import { db } from './prisma/db';
import { createSnippetSchema } from './schemas';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await db.orm.public.Snippet
      .orderBy((s) => s.createdAt.desc())
      .all();
    res.json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch snippets' });
  }
});

app.post('/api/snippets', async (req, res) => {
  try {
    const parsed = createSnippetSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }

    const { title, language, code, description, tags } = parsed.data;

    const processedTags = tags
      ? ([...new Set(tags.map((t: string) => t.trim().toLowerCase()).filter(Boolean))] as string[]) // <-- Додано as string[]
      : [];

    const snippet = await db.orm.public.Snippet.create({
      title,
      language,
      code,
      description: description || null,
      tags: processedTags
    });
    
    res.status(201).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create snippet' });
  }
});

app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.orm.public.Snippet.where({ id }).delete();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete snippet' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});