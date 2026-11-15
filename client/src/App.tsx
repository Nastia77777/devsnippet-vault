import { useEffect, useState } from 'react';
import { SnippetCard } from './components/SnippetCard';
import { SnippetForm, type NewSnippetData } from './components/SnippetForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string | null;
  tags: string[];
  createAt: string;
}

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetch('/api/snippets')
    .then((res) => res.json())
    .then((data) => {
      setSnippets(data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error('Error loading', err);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/snippets/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setSnippets(snippets.filter((s) => s.id !== id));
    } else {
      alert ('Deleting error');
    }
  };

  const handleAdd = async (newData: NewSnippetData) => {
    const res = await fetch ('/api/snippets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newData),
    });

    if (res.ok) {
      const createdSnipped = await res.json();
      setSnippets([createdSnipped, ...snippets]);
      setIsDialogOpen(false);
    } else {
      alert ('Error creating snippet');
    }
  };

  if (isLoading) {
    return <div className='p-8 text-center'>Loading...</div>
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>
        DevSnippet Vault
      </h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger render={<Button>Add New Snippet</Button>} />
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Snippet</DialogTitle>
          </DialogHeader>
          <SnippetForm onAdd={handleAdd} />
        </DialogContent>
      </Dialog>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {snippets.map((snippet) => (
          <SnippetCard
          key={snippet.id}
          title={snippet.title}
          language={snippet.language}
          code={snippet.code}
          tags={snippet.tags}
          onDelete={() => handleDelete(snippet.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;