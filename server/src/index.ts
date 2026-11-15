import express from 'express';
import { db } from './prisma/db';

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
    const { title, language, code, description, tags } = req.body;
    
    if (!title || !language || !code) {
      return res.status(400).json({ error: 'Title, language and code are required' });
    }

    const processedTags = tags 
    ? [...new Set(tags.map((t: string) => t.trim().toLowerCase()).filter(Boolean))]
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
    const {id} = req.params;

    await db.orm.public.Snippet.where({ id }).delete();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to delete snippet'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});