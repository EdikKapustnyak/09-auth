import { QueryClient, dehydrate } from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { HydrationBoundary } from "@tanstack/react-query";

import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/serverApi";


export interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}


export const generateMetadata = async ({ params }: NoteDetailsProps): Promise<Metadata> => {
  const {id} = await params;
  const note = await fetchNoteById(id);
  return {
    title: `Notes: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Notes: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      siteName: 'NoteHub',
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: note.title,
      }],
      type: 'article'
        }
    }
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}