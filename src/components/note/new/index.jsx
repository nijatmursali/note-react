import React from "react";
import { useData } from "../../../contexts/noteContext";
import styles from "./styles.module.css";

function AddNote() {
  const data = useData();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const onSave = () => {
    const id = Math.max(...data.notes.map((item) => item.id)) + 1;
    const value = isFinite(id) ? id : 1;
    console.log(id);
    const newNote = {
      id: value,
      name: name,
      description: description,
    };
    data.setNotes([...data.notes, newNote]);
    setName("");
    setDescription("");
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="New note"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        name="name"
        id="description"
        cols="10"
        rows="8"
        value={description}
        maxLength={200}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Type to add a note..."
      ></textarea>

      <div className={styles.footer}>
        <p>{200 - description.length} remaining</p>
        <button className={styles.save_icon} onClick={onSave}>
          <img src="/svg/save.svg" alt="save" />
        </button>
      </div>
    </div>
  );
}

export default AddNote;
