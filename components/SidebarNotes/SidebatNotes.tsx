// import React from 'react';
// import css from './SidebarNotes.module.css';
// import Link from 'next/link';

// const SidebarNotes = async () => {
//  const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

//   return (
//     <ul>
//       <li>
//         <Link href="/notes/filter/all">All Notes</Link>
//       </li>
//       {categories.map((category) => (
//         <li key={category}>
//           <Link href={`/notes/filter/${category}`}>
//             {category}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };
// export default SidebarNotes;