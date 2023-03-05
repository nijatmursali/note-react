import React from "react";
import { useData } from "../../contexts/noteContext";
import styles from "./styles.module.css";

function Note({ note }) {
  const data = useData();

  const onClicked = () => {
    data.setNotes(data.notes.filter((item) => item.id !== note.id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>{note.name}</h2>
        <p>{note.description}</p>
      </div>
      <div className={styles.footer}>
        <p>13/04/2023</p>
        <button
          className={styles.delete_icon}
          // onClick={data.setNotes(
          //   data.notes.filter((item) => item.id !== note.id)
          // )}
          onClick={onClicked}
        >
          <img src="/svg/trash.svg" alt="trash" />
        </button>
      </div>
    </div>
  );
}

export default Note;
