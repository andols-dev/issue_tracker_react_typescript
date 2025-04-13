import {useState, useEffect} from 'react';
import { Project, Issue, IssueCategory, IssueStatus } from '../types/types'; 
import { Container,Row,Col,Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    return (
        <Container>
            <Row>
                <Col>
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
        </Container>
    )
}

export default ProjectList;
