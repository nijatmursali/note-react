import { Route, Routes } from "react-router-dom";
import { NoteProvider } from "./contexts/noteContext";
import Home from "./pages/home";
function App() {
  return (
    <NoteProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </NoteProvider>
  );
}

export default App;