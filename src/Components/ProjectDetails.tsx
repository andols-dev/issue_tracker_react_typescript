import { useParams,Link } from 'react-router-dom';
import { Project } from '../types/types';
import { Button, Card, Container } from 'react-bootstrap';
const ProjectDetails = () => {
const {id} = useParams<{id: string}>();

const projects: Project[] = JSON.parse(localStorage.getItem('projectList') || '[]');

const project = projects.find(proj => proj.projectId === id);

console.log(project?.projectName);

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
            </Card.Body>
        </Card>
        <Button variant='secondary' className='mt-3' onClick={() => window.history.back()}>Back to project list</Button>

    </Container>
)

}
export default ProjectDetails;