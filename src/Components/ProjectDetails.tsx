import { useParams,Link } from 'react-router-dom';
import { useState } from 'react';
import { Issue, Project } from '../types/types';
import { Button, Card, Container,Modal,Form } from 'react-bootstrap';
import { IssueCategory, IssueStatus } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const ProjectDetails = () => {
const {id} = useParams<{id: string}>();
const [showModal, setShowModal] = useState(false);
const [validated, setValidated] = useState(false);
const projects: Project[] = JSON.parse(localStorage.getItem('projectList') || '[]');

const project = projects.find(proj => proj.projectId === id);
const [formData, setFormData] = useState({
    issueName: "",
    issueDescription: "",
    issueCategory: "",
    issueStatus: "",
});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Form submitted");

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        console.log("Form is invalid");
        setValidated(true);
        return;
    }


    if (!project) {
        console.error("Project not found");
        return;
    }

    console.log("Form data:", formData);

    const newIssue: Issue = {
        issueId: uuidv4(),
        projectId: project.projectId,
        issueName: formData.issueName,
        issueDescription: formData.issueDescription,
        issueCreated: new Date().toISOString(),
        issueCategory: formData.issueCategory as IssueCategory,
        issueStatus: formData.issueStatus as IssueStatus,
    };

    project.projectIssues.push(newIssue);

   /*  const updatedProjects = projects.map((proj) =>
        proj.projectId === project.projectId ? project : proj
    ); */

    localStorage.setItem('projectList', JSON.stringify(projects));
    console.log("Updated projects in localStorage:", projects);

    setShowModal(false);
    setFormData({
        issueName: "",
        issueDescription: "",
        issueCategory: "",
        issueStatus: "",
    });
};



// Adding a new issue to the project's issue list for testing purposes
/* project?.projectIssues.push({
    issueId: "1",
    projectId: id || "",
    issueName: "Issue 1",
    issueDescription: "Issue descrasdasdiption",
    issueCreated: new Date().toISOString(),
    issueCategory: IssueCategory.Bug,
    issueStatus: IssueStatus.Open
});
project?.projectIssues.push({
    issueId: "2",
    projectId: id || "",
    issueName: "Issue 2",
    issueDescription: "Issue descrasdfdsfsdasdiption",
    issueCreated: new Date().toISOString(),
    issueCategory: IssueCategory.Feature,
    issueStatus: IssueStatus.Open
}); */

    




if (!project) {
    return (
        <Container>
        <Card className='mt-4'>
            
            <Card.Body>
                <p><strong>Project not found</strong></p>

            </Card.Body>
        </Card>
        <Button variant='secondary' className='mt-3' onClick={() => window.history.back()}>Back to project list</Button>

        </Container>
    )
}

return (
    <Container>
        <Card className='mt-4'>
            <Card.Header as="h3">{project?.projectName}</Card.Header>
            <Card.Body>
            <button onClick={() => setShowModal(true)}>add issue</button>
            <p><strong>Project description:</strong> {project.projectDescription}</p>
            <p><strong>Start date:</strong> {project.projectStartDate}</p>
            <p><strong>End date:</strong> {project.projectEndDate}</p>
            <h3>{project.projectIssues.length > 0 && "Project issues"}</h3>
            {project.projectIssues.length > 0 ?  project.projectIssues.map(issue => (
                <div key={issue.issueId}>
                    <h6>Project name: {issue.issueName}</h6>
                    <p>Issue description: {issue.issueDescription}</p>
                    <p>Created: {new Date(issue.issueCreated).toLocaleDateString()}</p>
                    <p>Status: {issue.issueStatus}</p>

                    <p>Category: {issue.issueCategory}</p> 
                </div>
            )) : (<h2>No issues</h2>)
            
            }
            </Card.Body>
        </Card>
        <Button variant='secondary' className='mt-3' onClick={() => window.history.back()}>Back to project list</Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Issue name</Form.Label>
                    <Form.Control type='text'
                    name='issueName'
                     placeholder='Issue name'
                     value={formData.issueName}
                     onChange={handleInputChange}
                     required
                     >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
              Please choose a name for the issue.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Form.Label>Issue description</Form.Label>
                    <Form.Control type='text' name='issueDescription' placeholder='Issue description' value={formData.issueDescription} onChange={handleInputChange} required>

                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
              Please enter a description for the issue.
                    </Form.Control.Feedback>
                </Form.Group>
                
            
            
            <Form.Group className='mt-3'>   
                <Form.Label>Issue category</Form.Label>
                <Form.Select name='issueCategory' aria-label="Choose category" onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    <option value={IssueCategory.Bug}>Bug</option>
                    <option value={IssueCategory.Feature}>Feature</option>
                    <option value={IssueCategory.UI}>UI</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className='mt-3'>   
                <Form.Label>Issue status</Form.Label>
                <Form.Select name='issueStatus' aria-label="Choose status" onChange={handleInputChange} required>
                    
                    <option value="">Select status</option>
                    <option value={IssueStatus.Open}>Open</option>
                    <option value={IssueStatus.Closed}>Closed</option>
                </Form.Select>
            </Form.Group>
            <Button type='submit'>submit</Button>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          
        </Modal.Footer>
      </Modal>
    </Container>
)

}
export default ProjectDetails;