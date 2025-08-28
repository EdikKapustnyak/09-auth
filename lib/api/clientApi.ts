
import { NewNoteData, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";



export type  AxiosErrorResponse = {
  error: string;
};

export type CreateNoteProps = {
  title: string,
  content: string,
  categoryId: string,
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number,
}

export const fetchNotes = async (
page = 1, perPage: number, search = "", tagId: string | undefined): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search.trim() !== "") {
    params.search = search.trim();
  }
  if (tagId) {
    params.tag = tagId;
  }
 
  
  
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params, 
  });
  return res.data;
};



export type LoginRegister = {
  email: string,
  password: string,
}

export const login = async (data: LoginRegister) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export const addNote = async (newNote: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};


export type RegisterRequest = {
  email: string,
  password: string,
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}


export type UpdateUserRequest = {
  username?: string;
  email?: string;
  formData?: FormData,
};

export const updateMe = async (data: UpdateUserRequest) => {
  
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};


export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout")
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  // const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Cookie: cookieStore.toString(),
    // },
  });
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me');
  return data;
};

type CheckSessionProps = {
  success: boolean,
}

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionProps>('/auth/session');
  return res.data.success;
}