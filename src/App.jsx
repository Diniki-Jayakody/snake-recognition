// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [snakeType, setSnakeType] = useState('');
  const [venomLevel, setVenomLevel] = useState('');

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
      // Placeholder logic - replace with actual ML backend
      setSnakeType('Grass Snake');
      setVenomLevel('MIDDLE');
      setResultVisible(true);
    }
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
        </div>

        <div className="right-section">
        {resultVisible && (
             <>
          <p className="sub-title">Here is What We Got</p>
              <div className="result-box">
                <p className="result-title">SNAKE</p>
                <p className="result-value">{snakeType}</p>
              </div>
              <div className="result-box">
                <p className="result-title">VENOM POTENCY</p>
                <p className="result-value">{venomLevel}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
