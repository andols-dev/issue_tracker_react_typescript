import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, Issue, IssueCategory, IssueStatus } from '../types/types'; 
import { Container,Row,Col,Table, Button,Modal,Form } from "react-bootstrap";
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
        <Container>
          
            <Row>
                <Col>
                <div className="d-flex justify-content-between align-items-center mb-3">
            
            <Button className='mt-5 mb-3' onClick={() => setShowModal(true)}>Add project</Button>
            

          </div>
          <div>            
            <h3>{projectList.length === 0
              ? 'No projects'
              : `${projectList.length} ${projectList.length > 1 ? 'projects' : 'project'} added`  
            }</h3></div>
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
                        <Button variant="primary" onClick={() => goToDetails(p.projectId)}>See details</Button>
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
                isInvalid={!!formErrors.projectName}
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
              />
              <Form.Control.Feedback type='invalid'>
                {formErrors.projectDescription}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                name="projectStartDate"
                value={formData.projectStartDate}
                onChange={handleInputChange}
                isInvalid={!!formErrors.projectStartDate}
              />
               <Form.Control.Feedback type='invalid'>
                {formErrors.projectStartDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                name="projectEndDate"
                value={formData.projectEndDate}
                isInvalid={!!formErrors.projectEndDate}
                onChange={handleInputChange}
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
            Save project
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
    )
}

export default ProjectList;
