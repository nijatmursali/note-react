import React from "react";
import styles from "./styles.module.css";
import Note from "../../components/note";
import { useData } from "../../contexts/noteContext";
import AddNote from "../../components/note/new";

function Home() {
  const data = useData();
  const [search, setSearch] = React.useState("");
  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <div className={styles.search}>
        <img src="/svg/search.svg" alt="search" />
        <input
          type="text"
          className={styles.search_input}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.notes_list}>
        {data.notes
          .filter((note) =>
            note.name.toLowerCase().includes(search.trim().toLowerCase())
          )
          .map((note) => (
            <Note note={note} key={note.id} />
          ))}
        <AddNote />
      </div>
    </div>
  );
}

export default Home;
