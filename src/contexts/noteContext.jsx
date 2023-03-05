import { createContext, useContext, useEffect, useState } from "react";

export const noteContext = createContext();

export const NoteProvider = ({ children }) => {
  const data = useProvider();
  return <noteContext.Provider value={data}>{children}</noteContext.Provider>;
};

const useProvider = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return {
    notes,
    setNotes,
    requests: {},
  };
};

export const useData = () => {
  return useContext(noteContext);
};
