"use client";

import * as Yup from "yup";
import css from "../../css/NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewNoteData } from "@/types/note";
import { addNote } from '@/lib/api/clientApi';
import { useRouter } from "next/navigation";
import { create } from 'zustand'
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useState } from "react";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Required field"),
  content: Yup.string()
    .max(500, "Maximum 500 characters"), 
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Required field"),
});


export default function NoteForm() {

  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
 const [error, setError] = useState<{ [key: string]: string }>({});
  
  const mutation = useMutation({
    mutationFn: addNote,
    onSuccess() {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push('/notes/filter/All');
    },
    onError() {
      setError({form: 'Try again'});
    }

  });
   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
     setDraft({
      ...draft,
      [event.target.name]: event.target.value
    });
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setError((prev) => ({ ...prev, [name]: ""}))
      })
    .catch ((error: Yup.ValidationError) => {
      setError((prev) => ({...prev, [name]: error.message}))
    })
  };
  
  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as NewNoteData;
    try {
      await validationSchema.validate(data, { abortEarly: false })
      setError({});
      mutation.mutate(data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newError: { [key: string]: string} = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newError[err.path] = err.message;
          }
        });
        setError(newError);
      }
    }
    
  }
  const handleClose = () => {
    router.back();
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input value={draft.title} onChange={handleChange} id="title" name="title" className={css.input} />
        {error.title && <span className={css.error}>{error.title}</span>}
        <div className={css.charCount}>
          {(draft?.title)}
        </div>
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea value={draft.content} onChange={handleChange}
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        {error.content && <span className={css.error}>{error.content}</span>}
        <div className={css.charCount}>
          {(draft?.content)}
        </div>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select value={draft.tag} onChange={handleChange} id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {error.tag && <span className={css.error}>{error.tag}</span>}
      </div>
      {error.form && <span className={css.error}>{error.form}</span>}
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
        >
          Create note +
        </button>
      </div>
    </form>
  );
}
    


