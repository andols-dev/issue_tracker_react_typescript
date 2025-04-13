import { Project, Issue, IssueCategory, IssueStatus } from '../types/types'; 
import { Container,Row,Col,Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectList = () => {
    
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
        <tr>
          <td className="text-center">Mark</td>
          <td className="text-center">Otto</td>
          <td className="text-center">@mdo</td>
          <td className="text-center">df</td>
          <td className="text-center">
  <div className="d-flex justify-content-center flex-wrap gap-2">
    <Button variant="primary">See details</Button>
    <Button variant="danger">Delete</Button>
  </div>
</td>

        </tr>



      </tbody>
    </Table>
                </Col>

            </Row>
        </Container>
    )
}

export default ProjectList;
