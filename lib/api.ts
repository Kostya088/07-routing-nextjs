import axios from "axios";
import type { Note } from "@/types/note";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const notesApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
});

interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

type FetchNotesParams = {
  page: number;
  query?: string;
};

export async function fetchNotes({
  page,
  query,
}: FetchNotesParams): Promise<NotesApiResponse> {
  try {
    const { data } = await notesApi.get<NotesApiResponse>("", {
      params: { page, perPage: 12, search: query },
    });
    return data;
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    throw err;
  }
}

export async function fetchNoteById(id: Note["id"]) {
  const { data } = await notesApi.get<Note>(`/${id}`);
  return data;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(body: CreateNoteProps): Promise<Note> {
  try {
    const { data } = await notesApi.post<Note>("", body);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await notesApi.delete<Note>(`/${id}`);
  return data;
}
