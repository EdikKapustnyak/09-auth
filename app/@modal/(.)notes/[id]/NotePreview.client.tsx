'use client';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from './NotePreview.client.module.css'
import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note";
import { fetchNoteById } from "@/lib/api/clientApi";


interface NotePreviewProps {
  noteId: string;
}


export default function NotePreviewClient({noteId}: NotePreviewProps) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
   };
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

    return (
       <Modal onClose={handleGoBack}>
      <div className={css.container}>
         
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
            </div>
            {note.tag && <p className={css.tag}>Tag: { note.tag}</p>}
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
          </div>
      <button className={css.button} onClick={ handleGoBack} >Go Back</button>
      </div>
      </Modal>
  );
}