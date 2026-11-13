interface SnippetCardProps {
    title: string;
    language: string;
    code: string;
}

export function SnippetCard({title, language, code}: SnippetCardProps) {
    return(
        <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{language}</span>
            </div>

            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
}