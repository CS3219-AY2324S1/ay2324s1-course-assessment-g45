import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as formik from 'formik';
import * as yup from 'yup';
import io from 'socket.io-client';
import { post } from '../apis/MatchingApi';
import Config from '../Config';
import { useUserContext } from '../hooks/useUserContext';

const baseUrl = Config.Common.MatchingApiBaseUrl;
var socketId = '';
const socket = io.connect(baseUrl); // connect to backend
socket.on('connect', () => {
  socketId = socket.id;
});

const Matching = () => {
  const { user } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const { Formik } = formik;

  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    complexity: yup.string().required('Required'),
  });

  const handleMatch = (msg) => {
    console.log(msg);
    setIsLoading(false);

    // get questions
    // const response = await getQuestionsByComplexity({ complexity: selectedComplexity})
    // const json = response.json()
    // console.log(json)

  };

  const handleTimeout = (msg) => {
    console.log(msg);
    setIsLoading(false);
  };

  useEffect(() => {
    socket.on('matching', handleMatch);
    socket.on('timeout', handleTimeout);

    return () => {
      socket.off('matching', handleMatch);
      socket.off('timeout', handleTimeout);
    };
  }, []);

  const handleSubmit = async (values) => {
    // Temporary solution. Make sure user is always logged in in the future.
    if (!user) {
      return;
    }
    setIsLoading(true);
    const response = await post({
      ...values,
      time: Date.now(),
      socketId,
      uid: user._id,
      username: user.username,
    });
    const json = response.json();
    if (!response.ok) {
      console.log(json);
    }
  };

  return (
    <div>
      <Button
        className="ms-3 mt-3 px-3"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Find Match
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
                      <div className="d-flex justify-content-center">
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
