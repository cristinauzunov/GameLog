import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<h1 className="m-4">Home (qui andra la collezione)</h1>} />
        </Routes>
    );
}

export default App;