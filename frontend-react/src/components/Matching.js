import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as formik from 'formik';
import * as yup from 'yup';
import io from 'socket.io-client';
import { post } from '../apis/MatchingApi';

const socket = io.connect('http://localhost:3004/matching'); // connect to backend

const Matching = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const { Formik } = formik;

  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    complexity: yup.string().required('Required'),
  });

  const handleReceiveMsg = (msg) => {
    console.log(msg);
  };

  useEffect(() => {
    socket.on('matching', handleReceiveMsg);

    return () => {
      socket.off('matching', handleReceiveMsg);
    };
  }, []);

  const handleFailedMatch = () => {
    setIsLoading(false);
    setError('Unable to find match, please try again later!');
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    await post(values);
    const timeout = setTimeout(handleFailedMatch, 30000);
  };

  return (
    <div>
      <Button
        className="ms-3 mt-3"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {' '}
        Find Match{' '}
      </Button>

      {showModal && (
        <Modal show={true} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title> Find Match </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                complexity: '',
              }}
            >
              {(props) => (
                <Form noValidate onSubmit={props.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label> Complexity</Form.Label>
                    <Form.Select
                      required
                      name="complexity"
                      onChange={props.handleChange}
                      value={props.values.complexity}
                      isInvalid={!!props.errors.complexity}
                    >
                      {!props.values.complexity && (
                        <option> Select Complexity </option>
                      )}
                      <option value="Easy"> Easy</option>
                      <option value="Medium"> Medium</option>
                      <option value="Hard"> Hard</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {props.errors.complexity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {isLoading && (
                    <div>
                      <div className="d-flex justify-content-center">
                        {' '}
                        Find match in progress...{' '}
                      </div>
                      <div className="bg-primary d-flex justify-content-center">
                        {' '}
                        <Spinner animation="border" />
                      </div>
                    </div>
                  )}
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    Find Match
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Matching;
