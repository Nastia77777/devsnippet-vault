import {z} from "zod";

export const createSnippetSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    language: z.string().min(1, "Language is required").max(50, "Language is too long"),
    code: z.string().min(1, "Code is required"),
    description: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
});