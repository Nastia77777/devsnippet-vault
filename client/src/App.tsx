import { SnippetCard } from './components/SnippetCard';

const mockSnippets = [
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
  const handleDelete = (id: string) => {
    console.log(`Delete snippet from ID: ${id}`);
    alert(`Snippet ${id} be deleted`);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>
        DevSnippet Vault
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {mockSnippets.map((snippet) => (
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