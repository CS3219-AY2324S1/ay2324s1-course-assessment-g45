import { Modal } from 'react-bootstrap';

const QuestionPopUp = ({ question, handleClose }) => {
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {question.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body> { question.description }</Modal.Body>
      </Modal>
    </>
  );
}

export default QuestionPopUp