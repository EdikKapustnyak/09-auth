import Link from 'next/link';
import React from 'react';
import css from './SidebarNotes.module.css';

const NotesSidebar = async () => {
 const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

  return (
    <>
    <ul className={css.menuList}>
      {categories.map((category) => (
        <li className={css.menuItem} key={category}>
          <Link className={css.menuLink } href={`/notes/filter/${category}`}>
            {category}
          </Link>
        </li>
      ))}
      </ul>
      </>
  );
};

export default NotesSidebar;
 