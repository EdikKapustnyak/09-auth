"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./NoteDetails.module.css";

import { useRouter } from "next/navigation";

import { Note } from "@/types/note";
import { fetchNoteById } from "@/lib/api/clientApi";


interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId.toString()),
    refetchOnMount: false,
  });

  const router = useRouter();

  const handleGoBack = () => {
    const issue = confirm("Are you sure?");
    if (issue) { router.back() };
   };
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button className={css.button} onClick={ handleGoBack} >Go Back</button>
    </div>
  );
}