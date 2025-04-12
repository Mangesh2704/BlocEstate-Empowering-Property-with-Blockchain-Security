import React, { useState } from 'react';
import close from '../assets/close.svg';  // Close icon image
import styled from 'styled-components';
import emailjs from 'emailjs-com';  // Importing emailjs

// Styled Components for CSS-in-JS
const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* Darker background for modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  padding: 0 20px;
  box-sizing: border-box; /* Ensures padding doesn't affect overall size */
`;

const ContactDetails = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  max-width: 700px; /* Set a smaller max-width for better content layout */
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-y: auto;
  max-height: 80vh; /* Restrict max height to 80% of the viewport */
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 30px;
    max-width: 90%;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const OverviewSection = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center; /* Center align text for better readability */
  margin-bottom: 30px;

  h1 {
    font-size: 2.4em;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2em;
    color: #34495e;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  hr {
    margin: 20px 0;
    border: 1px solid #ecf0f1;
  }

  h2 {
    font-size: 2em;
    font-weight: 500;
    color: #34495e;
    margin-bottom: 20px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center; /* Center the form inputs and button */
`;

const InputLabel = styled.label`
  font-size: 1.1em;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 8px;
  align-self: flex-start; /* Align label to the left */
`;

const Input = styled.input`
  padding: 14px;
  margin-bottom: 20px;  /* Adjusted margin for better spacing */
  width: 100%; /* Make inputs fill their container */
  max-width: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border 0.3s ease;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Textarea = styled.textarea`
  padding: 14px;
  margin-bottom: 15px;  /* Adjusted margin for better spacing */
  width: 100%;
  max-width: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  resize: vertical;
  transition: border 0.3s ease;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1f6fb2;
  }
`;

const MapSection = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
  iframe {
    width: 100%;
    height: 350px;
    border: none;
    border-radius: 8px;
  }
`;

const Contact = ({ contacttogglePop }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare email parameters for both emails
    const templateParamsForOwner = {
      owner_name: 'BlocEstate',  // Static, or use a real owner's name if applicable
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
    };

    const templateParamsForUser = {
      user_name: formData.name,
      message: formData.message,
      user_email: formData.email,
    };

    // Send email to the website owner
    emailjs.send('service_z3ce38g', 'template_igff185', templateParamsForOwner, 'qVbSIVxqZT9lJUoqO')
      .then((response) => {
        console.log('Owner email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending owner email:', error);
      });

    // Send email to the user (confirmation)
    emailjs.send('service_z3ce38g', 'template_3xxr7g2', templateParamsForUser, 'qVbSIVxqZT9lJUoqO')
      .then((response) => {
        alert('Your message has been sent!');
        setFormData({ name: '', email: '', message: '' }); // Clear form after submission
      })
      .catch((error) => {
        alert('Failed to send message, please try again later.');
        console.error('Error sending user email:', error);
      });
  };

  return (
    <ContactContainer>
      <ContactDetails>
        <OverviewSection>
          <h1>Contact Us</h1>
          <p>If you have any questions, feel free to reach out to us. We would love to hear from you!</p>
          <hr />
          <MapSection>
            <iframe
              title="Google Map - Xavier Institute of Engineering"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4208854208064!2d72.83909397520459!3d19.045223882152982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92fb093d785%3A0x38854a716f0ca945!2sXavier%20Institute%20of%20Engineering!5e0!3m2!1sen!2sin!4v1740680823640!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: '0' }}
              allowFullScreen="true"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapSection>
          <hr />
          <h2>Get In Touch</h2>
          <FormSection>
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="name">Your Name</InputLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              <br />
              <InputLabel htmlFor="email">Your Email</InputLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <br />
              <InputLabel htmlFor="message">Your Message</InputLabel>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message"
                rows="6"
                required
              ></Textarea>
              <Button type="submit">Send Message</Button>
            </form>
          </FormSection>
          <hr />
        </OverviewSection>
        <CloseButton onClick={contacttogglePop}>
          <img src={close} alt="Close" />
        </CloseButton>
      </ContactDetails>
    </ContactContainer>
  );
};

export default Contact;
