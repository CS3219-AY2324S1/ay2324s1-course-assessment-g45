import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

const SampleCodePopup = ({showCodeSample, setShowCodeSample, template }) => {
  const [ alert, setAlert ] = useState()

  const copyToClipboard = () => {
    if (template) {
      navigator.clipboard.writeText(template)
      setAlert('Copied to clipboard')
      setTimeout(() => setAlert(null), 5000)
    }
  }
  return (
    <Modal show={showCodeSample} onHide={() => setShowCodeSample(false)}>
      <Modal.Header closeButton>
        <Modal.Title> Code sample </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { 
          template 
          ? <div className='code' style={{ whiteSpace: 'pre-line'}} > { template }</div> 
          : 'No sample available.'}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant='secondary' onClick={copyToClipboard}> Copy code sample </Button>
        {alert && <Alert variant='info'> {alert}</Alert>}
      </Modal.Footer>
    </Modal>
  )
}

export default SampleCodePopup