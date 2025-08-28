"use client";

import { useEffect, useState } from "react";
import css from "./Notes.client.module.css";

import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/clientApi";


interface NotesClientProps {
  tagId?: string;
}

export default function NotesClient({ tagId }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const perPage = 12;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, tagId]);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearchTerm, tagId],
    queryFn: () => fetchNotes(page, perPage, debouncedSearchTerm, tagId),
    placeholderData: keepPreviousData,
  });


  return (
    <div className={css.app}>
      <header className={css.toolbar}>
         <Link href={"/notes/action/create"} className={css.submitButton}>Create Note + </Link>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
      </header>

      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {error && <p className={css.error}>Error loading notes: {error.message}</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}