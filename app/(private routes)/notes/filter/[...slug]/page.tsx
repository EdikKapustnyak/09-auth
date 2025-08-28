
import React from 'react';
import NotesClient from './Notes.client';
import css from './Notes.client.module.css';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ slug: string[]}>,
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Notes: ${slug[0]}`,
    description: slug[0],

    openGraph: {
      title: `Notes: ${slug[0]}`,
      description: slug[0],
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      siteName: 'NoteHub',
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: slug[0],
      }],
      type: 'article'
        }
    }
}

const NotesByCategory = async ({
    params
}: Props) => {
    const { slug } = await params;
    const tag = slug[0] === 'All' ? undefined : slug[0]
    const response = await fetchNotes(1, 12, '', tag);
  return (
    <div>
                <h1 className={css.tags}>{tag}</h1>
      {response?.notes?.length > 0 && <NotesClient tagId={ tag} />}
    </div>
  );
};

export default NotesByCategory;