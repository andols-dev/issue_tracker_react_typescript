import ProjectList from "./Components/ProjectList"
import { Routes, Route } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDetails from "./Components/ProjectDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectList projects={[]} />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
  );
}

export default App
