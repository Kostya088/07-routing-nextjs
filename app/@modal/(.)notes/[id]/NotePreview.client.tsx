"use client";

import { fetchNoteById } from "@/lib/api";
import css from "./page.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div>Loading, please wait...</div>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const createdIso = note.createdAt;
  const updatedIso = note.updatedAt;
  const creaeted = new Date(createdIso);
  const updated = new Date(updatedIso);

  return (
    <div className={css.noteContainer}>
      <h1>{note.title}</h1>
      <span className={css.tag}>{note.tag}</span>
      <p>{note.content}</p>
      <div className={css.date}>
        <p>
          Created at: {creaeted.getFullYear()}/
          {String(creaeted.getMonth() + 1).padStart(2, "0")}/
          {String(creaeted.getDate()).padStart(2, "0")}{" "}
          {String(creaeted.getHours()).padStart(2, "0")}:
          {String(creaeted.getMinutes()).padStart(2, "0")}
        </p>
        <p>
          Last updated at: {updated.getFullYear()}/
          {String(updated.getMonth() + 1).padStart(2, "0")}/
          {String(updated.getDate()).padStart(2, "0")}{" "}
          {String(updated.getHours()).padStart(2, "0")}:
          {String(updated.getMinutes()).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
