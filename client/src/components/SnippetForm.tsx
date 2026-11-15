import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface NewSnippetData{
    title: string;
    language: string;
    code: string;
    description: string;
    tags: string[];
}

interface SnippetFormProps {
    onAdd: (data: NewSnippetData) => void;
}

export function SnippetForm({onAdd}: SnippetFormProps) {
    const[title, setTitle] = useState("");
    const[language, setLanguage] = useState("");
    const[code, setCode] = useState("");
    const[description, setDescription] = useState("");
    const[tagsInput, setTagsInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !language.trim() || !code.trim()) {
            alert("Please. select Title Language Code");
            return;
        }

        const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

        onAdd({title, language, code, description, tags});

        setTitle("");
        setLanguage("");
        setCode("");
        setDescription("");
        setTagsInput("");
    };

    return(
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Add New Snippet</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                type="text"
                placeholder="Title (required)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full" 
                />

                <input 
                type="text"
                placeholder="Language (required)"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border p-2 rounded w-full" 
                />
            </div>

            <textarea 
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            />

            <textarea 
            placeholder="Code (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-2 rounded w-full"
            />

            <input 
            type="text"
            placeholder="Tags (comma separated, e.g. react, api, ui)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="border p-2 rounded w-full"
            />

            <Button type="submit" className="w-full md:w-auto self-star">
                Save Snippet
            </Button>
        </form>
    )
}