import { Metadata } from 'next';
import css from './Create.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';


export const metadata: Metadata = {
    title: `CreateNote`,
    description: 'The page where you can create your new Note',
    openGraph: {
      title: `CreateNote`,
      description: 'The page where you can create your new Note',
      url: 'https://notehub.com/notes/action/create',
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "NoteHub image",
      }],
      type: 'article'
        }
  
}

const CreateNote = async () => {
  return (
  <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
              <NoteForm/>
  </div>
</main>

  );
};

export default CreateNote;