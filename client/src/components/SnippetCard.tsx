import { useState } from "react";
import {Button} from '@/components/ui/button';

interface SnippetCardProps {
    title: string;
    language: string;
    code: string;
    onDelete: () => void;
}

export function SnippetCard({title, language, code, onDelete}: SnippetCardProps) {

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
        <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{language}</span>
            </div>

            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{code}</code>
            </pre>

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