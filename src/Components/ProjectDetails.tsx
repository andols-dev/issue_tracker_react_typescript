import { useParams,Link } from 'react-router-dom';
import { Project } from '../types/types';
import { Button, Card, Container } from 'react-bootstrap';
import { IssueCategory, IssueStatus } from '../types/types';

const ProjectDetails = () => {
const {id} = useParams<{id: string}>();

const projects: Project[] = JSON.parse(localStorage.getItem('projectList') || '[]');

const project = projects.find(proj => proj.projectId === id);


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

    </Container>
)

}
export default ProjectDetails;