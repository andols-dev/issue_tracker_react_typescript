import {useState, useEffect, MouseEventHandler} from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types/types'; 
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    projects: Project[];
}

const ProjectList = ({projects}:Props) => {
    const navigate = useNavigate();
    const goToDetails = (id: string) => {
      navigate(`/project/${id}`);
    }

    const [projectList, setProjectList] = useState<Project[]>(() => {
        const savedProjects = localStorage.getItem('projectList');
        return savedProjects ? JSON.parse(savedProjects) : projects;
    });

    useEffect(() => {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    },[projectList]);

    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProjects,setFilteredProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredProjects([]);
            return;
        }

        const filtered = projectList.filter(proj =>
            proj.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProjects(filtered);
    }, [searchTerm, projectList]);
    
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        projectStartDate: "",
        projectEndDate: "",
    });
    const [formErrors, setFormErrors] = useState({
      projectName: "",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };  
    const validateForm = () => {
      const errors = {
        projectName: "",
        projectDescription: "",
        projectStartDate: "",
        projectEndDate: "",
      };
      let isValid = true;

      if(!formData.projectName.trim()) {
        errors.projectName = "Project name is needed";
        isValid = false;
      }
      if(!formData.projectDescription.trim()){
        errors.projectDescription = "Project description is needed";
        isValid = false;
      }
      if(!formData.projectStartDate.trim()) {
        errors.projectStartDate = "Project start date is needed";
        isValid = false;
      }
      if(!formData.projectEndDate.trim()) {
        errors.projectEndDate = "Project end date is needed"; 
        isValid = false;
      }
      setFormErrors(errors);
      return isValid;
    }
    const deleteProject = (id: string) => {
        const updatedProjects = projectList.filter((p: Project) => p.projectId !== id); 
        setProjectList(updatedProjects);
    }
    const handleAddProject = () => {
      if(!validateForm()) {
        return;
      }
        const newProject: Project = {
            projectId: uuidv4(),
            projectName: formData.projectName,
            projectDescription: formData.projectDescription,
            projectCreated: new Date().toISOString(),
            projectStartDate: formData.projectStartDate,
            projectEndDate: formData.projectEndDate,
            projectIssues: [],
        };
        setProjectList((prevProjects) => [...prevProjects, newProject]);
        setFormData({
            projectName: "",
            projectDescription: "",
            projectStartDate: "",
            projectEndDate: "",
        });
        setFormErrors({
          projectName: '',
          projectDescription: '',
          projectStartDate: '',
          projectEndDate: '',
        });
        setShowModal(false);
    };

    return (
      <>
      <Container className='mt-5'>
        <h1 className='text-center display-4 fw-bold text-primary'>Issue Tracking App</h1>
        <p className="text-center text-muted">Manage your projects and issues efficiently</p>

        <Form className="mt-4">
          <InputGroup>
            <Form.Control 
              type='text' 
              placeholder='Search project by name' 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="shadow-sm"
            />
            <Button variant="outline-primary" className="shadow-sm">Search</Button>
          </InputGroup>
        </Form>

        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          {filteredProjects.length === 0 && searchTerm.trim() !== "" && projectList.length > 0 &&  (
            <div className="text-danger">No projects found with the name "{searchTerm}"</div>
          )}
        </div>
      </Container>

      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button className='btn btn-primary shadow-sm' onClick={() => setShowModal(true)}>Add Project</Button>
              <Button className='btn btn-danger shadow-sm' onClick={() => setProjectList([])}>Remove All Projects</Button>
            </div>

            <h3 className="text-muted">
              {projectList.length === 0
                ? 'No projects'
                : `${projectList.length} ${projectList.length > 1 ? 'projects' : 'project'} added`}
            </h3>

            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-center">Project Name</th>
                  <th className="text-center">Project Description</th>
                  <th className="text-center">Start Date</th>
                  <th className="text-center">End Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">No projects available</td>
                  </tr>
                )}
                {(filteredProjects.length > 0 ? filteredProjects : projectList).map((p: Project)=> (
                  <tr key={p.projectId}>
                    <td className="text-center">{p.projectName}</td>
                    <td className="text-center">{p.projectDescription}</td>
                    <td className="text-center">{p.projectStartDate}</td>
                    <td className="text-center">{p.projectEndDate}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center flex-wrap gap-2">
                        <Button variant="outline-primary" className="shadow-sm" onClick={() => goToDetails(p.projectId)}>See Details</Button>
                        <Button variant="outline-danger" className="shadow-sm" onClick={() => deleteProject(p.projectId)}>Delete</Button>
                      </div>
                    </td>       
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.projectName}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.projectName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.projectDescription}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.projectDescription}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="projectStartDate"
                  value={formData.projectStartDate}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.projectStartDate}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.projectStartDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="projectEndDate"
                  value={formData.projectEndDate}
                  isInvalid={!!formErrors.projectEndDate}
                  onChange={handleInputChange}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.projectEndDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleAddProject}>
              Save Project
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      </>
    )
}

export default ProjectList;
