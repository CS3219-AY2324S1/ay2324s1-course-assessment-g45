import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMatchContext } from '../../hooks/useMatchContext';


const NoMatchFoundPopUp = ({ handleSubmit, complexity }) => {
    const { state: bannerState, dispatch: bannerDispatch } = useMatchContext();

    const handleClose = () => {
        bannerDispatch({ type: 'HIDE_MODAL' });
    };

    const handleContinue = async () => {
        bannerDispatch({ type: bannerState.previousBanner });
        await handleSubmit(complexity)
    };

    return (
        <Modal show={bannerState.showModal} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>No match found</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Do you want to continue to search for a match?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleContinue}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default NoMatchFoundPopUp;
