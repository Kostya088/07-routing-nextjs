"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../components/NoteList/NoteList";
import css from "./page.module.css";
import { fetchNotes } from "../../lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes({ page: currentPage, query: searchQuery }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    300,
  );

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      {totalPages > 0 && (
        <div className={css.toolbar}>
          <SearchBox defaultValue={searchQuery} onChange={updateSearchQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setPage={setCurrentPage}
            />
          )}
          <button type="button" className={css.button} onClick={openModal}>
            Create note +
          </button>
        </div>
      )}
      <NoteList notes={notes} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
