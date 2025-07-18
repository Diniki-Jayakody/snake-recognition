// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [instructions, setInstructions] = useState([]);

  const [snakeData, setSnakeData] = useState(
    {
      snakeType: 'Grass Snake',
      potencyLevel: 'MIDDLE',
      firstAidData: [
        'Keep the victim calm and reassured.',
        'Immobilize the bitten limb and keep it below heart level.',
        'Do not apply ice or tourniquet.',
        'Seek medical help immediately.',
        'Do not try to suck out the venom.'
      ]
    }
  )
  
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setResultVisible(false);
      setSnakeType('');
      setVenomLevel('');
    }
  };

  const handleGenerate = () => {
    if (image) {
      const snake = snakeData.snakeType;
      const potency = snakeData.potencyLevel;
      setResultVisible(true);

      const match = firstAidData.find(
        (item) => item.snake === snake && item.potency === potency
      );
      if (match) setInstructions(match.instructions);
    }
  };

  const handleInstructionModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="title">Let's Recognize the Snake!</h1>
      <div className="main-section">
        <div className="left-section">
          <p className="sub-title">Upload the Image of the Snake Here</p>
          <div>
            <label htmlFor="imageUpload" className="upload-box">
              {image ? image.name : 'Click to Upload Image'}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="middle-section">
          <button className="generate-button" onClick={handleGenerate}>
            GENERATE RESULT
          </button>
        {resultVisible && (<button className="firstAid-button" onClick={handleInstructionModal}>  
            FIRST AID
          </button>)}
        </div>

        <div className="right-section">
        {resultVisible && (
             <>
          <p className="sub-title">Here is What We Got</p>
              <div className="result-box">
                <p className="result-title">SNAKE</p>
                <p className="result-value">{snakeData.snakeType}</p>
              </div>
              <div className="result-box">
                <p className="result-title">VENOM POTENCY</p>
                <p className="result-value">{snakeData.potencyLevel}</p>
              </div>
            </>
          )}
        </div>
        {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>First Aid Instructions</h2>
            <ol>
              {snakeData.firstAidData.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <button className="close-button" onClick={closeModal}>GOT IT!</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;



