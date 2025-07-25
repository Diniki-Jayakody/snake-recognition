import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [snakeData, setSnakeData] = useState([])

  const firstAidData = [
    {
      title: "What Should NOT Be Done",
      description: "Do Not Panic, The person giving first aid should stay calm to provide proper care, Do Not Show the Snake to the Patient, If the snake is highly venomous, the patient, may panic, worsening their condition,Do Not Let the Patient Walk, Movement can spread venom faster and cause muscle damage, Do Not Give Alcohol – Alcohol can accelerate the spread of venom in the body, Do Not Apply Kondis Powder, It may damage the tissue and worsen the wound, Do Not Give Aspirin or Certain Beverages, Avoid aspirin and drinks high inpotassium and minerals, like king coconut and coconut water."
    },

    {
      title: "What Should Be Done",
      description:"Keep the Patient Calm, Reassure them that there are treatments available for snake bites, Provide Artificial Respiration, If the patient is experiencing breathing difficulties, give artificial respiration, Loosen Tight Clothing, This helps improve circulation and breathing, Wash the Wound – Use clean water to gently wash the affected area, Show the Snake to a Doctor, If possible, take a picture of the snake and show it to medical professionals for accurate treatment, Give Paracetamol for Severe Pain, If the patient is in extreme pain, paracetamol can be given as a pain reliever"
    }
  ]
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Sets the raw file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 preview string
      };
      reader.readAsDataURL(file); 
  
      setResultVisible(false);
    }
  };
  

  const handleGenerate = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await fetch('http://127.0.0.1:5000/v1/prediction_', {
          method: 'POST',
          body: formData
        });        
  
        const result = await response.json();
        setSnakeData(result);
        console.log(result)
        setResultVisible(true);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
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
            {imagePreview ? (
              <img src={imagePreview} alt="Snake Preview" className="preview-img" />
            ) : (
              'Click to Upload Image'
            )}
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
                <p className="result-value">{snakeData.snake_type}</p>
              </div>
              <div className="result-box">
                <p className="result-title">VENOM POTENCY</p>
                <p className="result-value">{snakeData.venom_potency}</p>
              </div>
            </>
          )}
        </div>
        {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{textAlign:'center'}}>First Aid Instructions</h2>
            <div className="modal1">
            {firstAidData.map((section, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3>{section.title}</h3>
                <ul>
                  {section.description.split(',').map((point, idx) => (
                    <li key={idx}>{point.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
            </div>

            <button className="close-button" onClick={closeModal}>GOT IT!</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;



