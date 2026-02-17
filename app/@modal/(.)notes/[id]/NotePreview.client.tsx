"use client";

import { fetchNoteById } from "@/lib/api";
import css from "../../../notes/[id]/page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();
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

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div>Loading, please wait...</div>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  const createdIso = note.createdAt;
  const updatedIso = note.updatedAt;
  const created = new Date(createdIso);
  const updated = new Date(updatedIso);

  return (
    <Modal onClose={handleClose}>
      <div className={css.noteContainer}>
        <h1>{note.title}</h1>
        <span className={css.tag}>{note.tag}</span>
        <p>{note.content}</p>
        <div className={css.date}>
          <p>
            Created at: {created.getFullYear()}/
            {String(created.getMonth() + 1).padStart(2, "0")}/
            {String(created.getDate()).padStart(2, "0")}{" "}
            {String(created.getHours()).padStart(2, "0")}:
            {String(created.getMinutes()).padStart(2, "0")}
          </p>
          <p>
            Last updated at: {updated.getFullYear()}/
            {String(updated.getMonth() + 1).padStart(2, "0")}/
            {String(updated.getDate()).padStart(2, "0")}{" "}
            {String(updated.getHours()).padStart(2, "0")}:
            {String(updated.getMinutes()).padStart(2, "0")}
          </p>
        </div>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
