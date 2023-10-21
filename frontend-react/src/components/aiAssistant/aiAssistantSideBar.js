import React, { useEffect, useState } from 'react'
import { post } from '../../apis/ChatGPTApi';
import { useUserContext } from '../../hooks/useUserContext';
import { Col, Row, Form, Card, Button } from 'react-bootstrap';

const AiAssistantSideBar = ({ onClose }) => {
    const { user } = useUserContext();
    const [explainCodeMsg, setExplainCodeMsg] = useState('')
    const [explainCodeError, setExplainCodeError] = useState('')
    const [explainCodeAns, setexplainCodeAns] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        const query = {
            message: explainCodeMsg
        }

        const response = await post(user.token, query)
        const json = await response.json()
        if (!response.ok) {
            setExplainCodeError(json.error)
        } else {
            setExplainCodeError(null)
            setexplainCodeAns(json.data.trim())
        }
        setIsLoading(false);
    };


    const handleClose = () => {
        if (onClose) {
            setexplainCodeAns('')
            setExplainCodeMsg('')
            setExplainCodeError('')
            onClose();
        }
    };


    return (
        <div className="chatgptsidebar">
            <button id="close-btn" onClick={handleClose}>X</button>
            <h3>Explain Code</h3>
            <Form autoComplete="off" onSubmit={handleAsk} className="profileForm">
                <Row className="mb-3">
                    <Col md={12} xs={12}>
                        <Form.Control
                            id="query"
                            as="textarea"
                            rows="5"
                            placeholder="Enter your code..."
                            value={explainCodeMsg}
                            onChange={(e) => setExplainCodeMsg(e.target.value.trim())}
                            required
                        />
                    </Col>
                    {explainCodeError && (
                        <Col md={12} xs={12}>
                            <div className="error">{explainCodeError}</div>
                        </Col>
                    )}
                    <Col md={12} xs={12} id="ask-button">
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            Ask ChatGPT
                        </Button>
                    </Col>
                    <Col md={12} xs={12} id="loading">
                        {isLoading && <div className="loader"></div>}
                    </Col>
                    {explainCodeAns &&
                        <div>
                            <h3>Result</h3>
                            <Col md={12} xs={12}>
                                <Form.Control
                                    as="textarea"
                                    rows="10"
                                    id="answer"
                                    value={explainCodeAns}
                                    readOnly
                                    placeholder="Result will be shown here..." />
                            </Col>
                        </div>}
                </Row>
            </Form>
        </div>
    );
};

export default AiAssistantSideBar;
