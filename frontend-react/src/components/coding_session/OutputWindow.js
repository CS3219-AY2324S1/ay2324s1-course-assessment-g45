import React, { useState, useEffect } from "react";

const OutputWindow = ({ outputDetails }) => {
  const [ output, setOutput ] = useState(null)
  const successMsg = 'Compiled successfully.'
  const [ showSuccessMsg, setShowSuccessMsg ] = useState(false)
  const [ error, setError ] = useState(null)
  
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    switch (statusId) {
      case 6: // compile error
        setError(outputDetails?.compile_output)
        break;
      case 3: //
        setShowSuccessMsg(true) 
        if (outputDetails.stdout === null) setOutput(null)
        else {
          console.log(outputDetails.stdout)
          setOutput(outputDetails.stdout)
        }
        break;
      case 5:
        setError('Time limit Exceeded')
        break;
      default:
        setError(outputDetails.stderr)
    }
  };

  useEffect(() => {
    if (!outputDetails) return
    // reset variables
    setOutput(null)
    setShowSuccessMsg(false)
    setError(null)
    console.log(outputDetails)
    getOutput()
    console.log(output)
  }, [outputDetails])

  return (
    <>
      { 
        showSuccessMsg && 
        <div className="text-success d-flex align-items-center"> 
          <span className="material-symbols-outlined mx-2">check_circle</span>
          { successMsg } 
        </div>
      }

      {
        error &&
        <div className="text-danger d-flex align-items-center"> 
        <span className="material-symbols-outlined mx-2">error</span>
        { error }
        </div>
      }
      <div className="overflow-y-auto"> 
        <b> Output: </b>
        { output }
      </div>
    </>
  );
};

export default OutputWindow;