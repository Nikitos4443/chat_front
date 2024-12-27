import './App.css'
import Chat from "./Chat.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./Main.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/room/:roomId/:clientName" element={<Chat />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
