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
import { useTheme } from './hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

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
  const { isDark, setIsDark } = useTheme();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/snippets')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    })
    .then((data) => {
      setSnippets(data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error('Error loading', err);
      setError('Cant download snippet. Try later.')
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
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-xl text-gray-600'>{error}</div>
      </div>
    );
  }

   return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
          DevSnippet Vault
        </h1>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={<Button>Add New Snippet</Button>} />
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Snippet</DialogTitle>
              </DialogHeader>
              <SnippetForm onAdd={handleAdd} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {snippets.length === 0 ? (
        <div className='text-center py-20 text-gray-500 dark:text-gray-400'>
          <p className='text-xl mb-4'>No snippets found</p>
          <p>Click "Add New Snippet" to create your first one!</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;