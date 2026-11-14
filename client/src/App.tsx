import { useState } from 'react';
import { SnippetCard } from './components/SnippetCard';
import { SnippetForm, type NewSnippetData } from './components/SnippetForm';

const initialSnippets = [
  {
    id: '1',
    title: 'Fetch data in React',
    language: 'TypeScript',
    code: 'useEffect(() => {fetch("/api").then(...)}, []);',
  },
  {
    id: '2',
    title: 'SQL: Select all',
    language: 'SQL',
    code: 'SELECT * FROM users',
  },
  {
    id: '3',
    title: 'Docker build',
    language: 'Bash',
    code: 'docker build -t my-app.',
  },
  
];

function App() {
  const [snippets, setSnippets] = useState(initialSnippets);

  const handleDelete = (id: string) => {
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  const handleAdd = (newData: NewSnippetData) => {
    const newSnippet = {
      id: Date.now().toString(),
      ...newData,
    };
    setSnippets([newSnippet, ...snippets]);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>
        DevSnippet Vault
      </h1>

      <SnippetForm onAdd={handleAdd} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {snippets.map((snippet) => (
          <SnippetCard
          key={snippet.id}
          title={snippet.title}
          language={snippet.language}
          code={snippet.code}
          onDelete={() => handleDelete(snippet.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;