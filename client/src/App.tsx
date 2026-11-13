import { SnippetCard } from './components/SnippetCard';

function App() {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>
        DevSnippet Vault
      </h1>

      <SnippetCard
      title='My first snippet'
      language='TypeScript'
      code='console.log("Hello!!!");'
      />
    </div>
  );
}

export default App;