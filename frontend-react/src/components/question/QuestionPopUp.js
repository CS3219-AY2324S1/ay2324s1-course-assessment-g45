import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const QuestionPopUp = ({ question, handleClose }) => {
  return (
    <>
      <Modal show={true} onHide={handleClose} dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title> {question.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill value={question.description} readOnly={true} theme='bubble'/>
        </Modal.Body>
        {/* <Modal.Body dangerouslySetInnerHTML={{ __html: question.description}}/> */}
      </Modal>
    </>
  );
}

export default QuestionPopUp