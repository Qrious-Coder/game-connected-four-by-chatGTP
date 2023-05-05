import { BrowserRouter, Routes, Route }from 'react-router-dom';
import LandingPage from "./pages/landing/LandingPage";
import EntryPage from "./pages/entry/EntryPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <LandingPage /> } />
          <Route path="/register" element={ <EntryPage /> } />
          <Route path="/login" element={ <EntryPage /> } />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
