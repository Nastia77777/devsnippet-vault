import { useState } from "react";
import {Button} from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const getLanguageColor = (language: string) => {
    const lang = language.toLowerCase();
    if (lang.includes('typescript') || lang.includes('ts')) 
        return 'bg-blue-100 text-blue-700 border-blue-200';
    if (lang.includes('javascript') || lang.includes('js')) 
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (lang.includes('sql')) 
        return 'bg-orange-100 text-orange-700 border-orange-200';
    if (lang.includes('bash') || lang.includes('shell')) 
        return 'bg-green-100 text-green-700 border-green-200';
    if (lang.includes('css')) 
        return 'bg-pink-100 text-pink-700 border-pink-200';
    if (lang.includes('html')) 
        return 'bg-gray-100 text-gray-700 border-gray-200';
    
};

interface SnippetCardProps {
    title: string;
    language: string;
    code: string;
    tags: string[];
    onDelete: () => void;
}

export function SnippetCard({title, language, code, tags, onDelete}: SnippetCardProps) {

    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);

            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Something went wrong', err);
        }
    };
    
    
    return(
        <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <span className={`text-xs px-2 py-1 rounded border font-medium ${getLanguageColor(language)}`}>{language}</span>
            </div>

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="rounded overflow-hidden">
                <SyntaxHighlighter 
                language={language.toLowerCase()}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.5rem',
                }}
                >
                    {code}
                </SyntaxHighlighter>

            </div>

            <div className="flex gap-2 mt-2">
                <Button
            onClick={handleCopy}
            variant='outline'
            className='flex-1'
            >
                {isCopied ? 'Copied' : 'Copy code'}
            </Button>

            <Button
            onClick={onDelete}
            variant='destructive'
            className='flex-1'
            >
                Delete
            </Button>
            </div>
        </div>
    );
}