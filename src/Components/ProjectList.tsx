import {useState, useEffect} from 'react';
import { Project, Issue, IssueCategory, IssueStatus } from '../types/types'; 
import { Container,Row,Col,Table, Button,Modal,Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    projects: Project[];
}

const ProjectList = ({projects}:Props) => {
    const [projectList, setProjectList] = useState<Project[]>(() => {
        const savedProjects = localStorage.getItem('projectList');
        return savedProjects ? JSON.parse(savedProjects) : projects;
    });

    useEffect(() => {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    },[projectList]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
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

    const handleAddProject = () => {
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
        setShowModal(false);
    };

    return (
        <Container>
            <Row>
                <Col>
                <div className="d-flex justify-content-between align-items-center mb-3">
            
            <Button onClick={() => setShowModal(true)}>Add project</Button>
          </div>
                <Table striped bordered hover >
      <thead>
        <tr>
          <th className="text-center">Project Name</th>
          <th className="text-center">Project Description</th>
          <th className="text-center">Start date</th>
          <th className="text-center">End date</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projectList.length === 0 && (
            <tr>
                <td colSpan={5} className="text-center">No projects available</td>
            </tr>
        )}
        {projectList.map((p: Project)=> (
            <tr key={p.projectId}>
                <td className="text-center">{p.projectName}</td>
                <td className="text-center">{p.projectDescription}</td>
                <td className="text-center">{p.projectStartDate}</td>
                <td className="text-center">{p.projectEndDate}</td>
                <td className="text-center">
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                        <Button variant="primary">See details</Button>
                        <Button variant="danger">Delete</Button>
                    </div>
                </td>       
            </tr>
        ))}




      </tbody>
    </Table>
                </Col>

            </Row>
                 {/* Modal för nytt projekt */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project name</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                name="projectStartDate"
                value={formData.projectStartDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                name="projectEndDate"
                value={formData.projectEndDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddProject}>
            Save project
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
    )
}

export default ProjectList;
