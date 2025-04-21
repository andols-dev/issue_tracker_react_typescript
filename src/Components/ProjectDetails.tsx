import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Issue, Project } from "../types/types";
import { Button, Card, Container, Modal, Form, Badge } from "react-bootstrap";
import { IssueCategory, IssueStatus } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import ProjectList from "./ProjectList";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const projects: Project[] = JSON.parse(
    localStorage.getItem("projectList") || "[]"
  );

  const project = projects.find((proj) => proj.projectId === id);
  const [projectIssues, setProjectIssues] = useState<Issue[]>(
    project ? project.projectIssues : []
  );
  
  const [formData, setFormData] = useState({
    issueName: "",
    issueDescription: "",
    issueCategory: "",
    issueStatus: "",
  });
  const removeIssues = () => {
    console.log("Remove all issues clicked");
    
      if (project) {
        project.projectIssues = [];
        setProjectIssues([]);
      }
      localStorage.setItem("projectList", JSON.stringify(projects));
      console.log("Updated projects in localStorage:", projects);

  }
  const closingModal = () => {
    setShowModal(false);
    setValidated(false);
  }
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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
    setProjectIssues([...project.projectIssues]); 

    /*  const updatedProjects = projects.map((proj) =>
        proj.projectId === project.projectId ? project : proj
    ); */

    localStorage.setItem("projectList", JSON.stringify(projects));
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
      <Container className="mt-5">
        <Card className="shadow-sm border-0">
          <Card.Body className="text-center">
            <p className="text-danger fw-bold">Project not found</p>
          </Card.Body>
        </Card>
        <Button
          variant="secondary"
          className="mt-3 shadow-sm"
          onClick={() => window.history.back()}
        >
          Back to Project List
        </Button>
      </Container>
    );
  }

  function deleteIssue(issueId: string): void {
    if (!project) {
      console.error("Project not found");
      return;
    }

    const updatedIssues = project.projectIssues.filter(
      (issue) => issue.issueId !== issueId
    );

    project.projectIssues = updatedIssues;
    setProjectIssues(updatedIssues);

    localStorage.setItem("projectList", JSON.stringify(projects));
    console.log(`Issue with ID ${issueId} deleted successfully.`);
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0">
        <Card.Header as="h3" className="bg-primary text-white">
          {project?.projectName}
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p>
                <strong>Project Description:</strong> {project.projectDescription}
              </p>
              <p>
                <strong>Start Date:</strong> {project.projectStartDate}
              </p>
              <p>
                <strong>End Date:</strong> {project.projectEndDate}
              </p>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="success" className="shadow-sm" onClick={() => setShowModal(true)}>
                Add Issue
              </Button>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-3">
            {projectIssues.length > 0 && <Button onClick={removeIssues}>Remove all issues</Button>  }
          </div>
          <h4 className="mt-4">
            {projectIssues.length > 0 ? "Project Issues" : "No Issues"}
          </h4>

          {project.projectIssues.length > 0 && (
            <div className="list-group">
              {projectIssues.map((issue) => (
                <div
                  key={issue.issueId}
                  className="list-group-item list-group-item-action mb-2 shadow-sm"
                >
                  <h5 className="mb-1">{issue.issueName}</h5>
                  <p className="mb-1">
                    <strong>Description:</strong> {issue.issueDescription}
                  </p>
                  <p className="mb-1">
                    <strong>Created:</strong>{" "}
                    {new Date(issue.issueCreated).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <Badge bg={issue.issueStatus === "Open" ? "success" : "secondary"}>
                      {issue.issueStatus}
                    </Badge>
                  </p>
                  <p className="mb-1">
                    <strong>Category:</strong>{" "}
                    <Badge bg="info" className="text-dark">
                      {issue.issueCategory}
                    </Badge>
                  </p>
                  <Button onClick={() => deleteIssue(issue.issueId)}>Delete</Button>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
      <Button
        variant="secondary"
        className="mt-3 shadow-sm"
        onClick={() => window.history.back()}
      >
        Back to Project List
      </Button>
      <Modal show={showModal} onHide={closingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Issue Name</Form.Label>
              <Form.Control
                type="text"
                name="issueName"
                placeholder="Enter issue name"
                value={formData.issueName}
                onChange={handleInputChange}
                required
                className="shadow-sm"
              />
              <Form.Control.Feedback type="invalid">
                Please choose a name for the issue.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="issueDescription"
                placeholder="Enter issue description"
                value={formData.issueDescription}
                onChange={handleInputChange}
                required
                className="shadow-sm"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a description for the issue.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue Category</Form.Label>
              <Form.Select
                name="issueCategory"
                aria-label="Choose category"
                onChange={handleInputChange}
                required
                className="shadow-sm"
              >
                <option value="">Select category</option>
                <option value={IssueCategory.Bug}>Bug</option>
                <option value={IssueCategory.Feature}>Feature</option>
                <option value={IssueCategory.UI}>UI</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a category.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue Status</Form.Label>
              <Form.Select
                name="issueStatus"
                aria-label="Choose status"
                onChange={handleInputChange}
                required
                className="shadow-sm"
              >
                <option value="">Select status</option>
                <option value={IssueStatus.Open}>Open</option>
                <option value={IssueStatus.Closed}>Closed</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a status.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" className="me-2 shadow-sm">
                Submit
              </Button>
              <Button variant="secondary" className="shadow-sm" onClick={closingModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectDetails;
