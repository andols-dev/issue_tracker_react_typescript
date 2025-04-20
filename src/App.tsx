import ProjectList from "./Components/ProjectList"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDetails from "./Components/ProjectDetails";



function App() {
 

  return (
    <Router>
      <Routes>
           
        <Route path="/" element={<ProjectList projects={[]} />} />
        <Route path="/project/:id" element={<ProjectDetails  />} />
      </Routes>
    </Router>
  )
}

export default App
