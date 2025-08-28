export interface Note {
  notes: Note[];
  tag: NoteTag;
  id: string;
  title: string;
  content: string;
  createdAt: string;
    updatedAt: string;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
}



export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

