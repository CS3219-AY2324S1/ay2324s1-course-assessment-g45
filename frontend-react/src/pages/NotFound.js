// NotFound.js
import React from 'react';
import { Fragment } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import errorImage from '../assets/images/404.png';

const NotFound = () => (
    <Fragment>
        <Row>
            <Col sm={12}>
                <div className="text-center">
                    <div className="mb-3">
                        <Image
                            src={errorImage}
                            alt=""
                            className="img-fluid mt-3"
                        />
                    </div>
                    <h1 className="display-4 fw-bold mb-4">Oops! Page Not Found.</h1>
                    <p className="mb-4">
                        We couldn't find the page you are looking for.
                    </p>
                    <Link to="/match" className="btn btn-primary">
                        Go Home
                    </Link>
                </div>
            </Col>
        </Row>
    </Fragment>
);

export default NotFound;
