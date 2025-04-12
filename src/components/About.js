import React, { useEffect, useState } from 'react';
import close from '../assets/close.svg';  // Close icon image
import styled from 'styled-components';

// Styled Components for CSS-in-JS
const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for the modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const AboutDetails = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  max-width: 900px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-y: auto;
  max-height: 80vh; /* Restrict max height to 80% of the viewport */
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
`;

const OverviewSection = styled.div`
  h1 {
    font-size: 2.5em;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.8em;
    font-weight: 600;
    color: #444;
    margin-top: 30px;
  }

  p {
    font-size: 1.1em;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  hr {
    margin: 20px 0;
  }
`;

const TeamSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TeamMember = styled.div`
  text-align: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2em;
    color: #333;
  }

  p {
    font-size: 1em;
    color: #666;
  }

  strong {
    font-weight: 600;
  }
`;

const About = ({ togglePop }) => {
  const [companyDetails, setCompanyDetails] = useState({
    name: 'BlocEstate - Decentralized RealEstate App',
    description:
      'We help people find, buy, sell, and rent properties in a decentralized way. Our platform connects buyers, sellers, lenders, and inspectors directly using blockchain technology, ensuring trust, transparency, and efficiency in every real estate transaction.',
    mission:
      'Our mission is to revolutionize the real estate industry by providing a transparent, secure, and efficient platform for property transactions. We aim to simplify the buying, selling, and lending process while reducing the need for intermediaries.',
    vision:
      'To create a decentralized real estate ecosystem that empowers individuals to transact freely and securely, without the constraints of traditional methods.',
    team: [
      {
        name: 'Mangesh Pangam',
        role: 'Frontend Developer',
        image: 'https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg',
        description:
          'Mangesh leads the vision of the company and is passionate about transforming the real estate industry with blockchain technology.',
      },
      {
        name: 'Rakshita Sarap',
        role: 'Research and Development',
        image: 'https://img.freepik.com/free-photo/satisfied-smiling-blonde-young-woman-with-pleased-expression-expresses-happiness-dressed-casual-white-t-shirt_273609-17168.jpg',
        description:
          'Rakshita is the technical mind behind the platform, ensuring that the system is secure, scalable, and user-friendly.',
      },
      {
        name: 'Saish Rane',
        role: 'Backend Developer',
        image: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        description:
          'Saish is the technical mind behind the platform, ensuring that the system is secure, scalable, and user-friendly.',
      },
    ],
  });

  useEffect(() => {
    // Placeholder for potential dynamic content fetching
  }, []);

  return (
    <AboutContainer>
      <AboutDetails>
        <OverviewSection>
          <h1>{companyDetails.name}</h1>

          <h2>What We Do</h2>
          <p>{companyDetails.description}</p>

          <hr />

          <h2>Mission</h2>
          <p>{companyDetails.mission}</p>

          <hr />

          <h2>Vision</h2>
          <p>{companyDetails.vision}</p>

          <hr />

          <h2>Meet Our Team</h2>
          <TeamSection>
            {companyDetails.team.map((member, index) => (
              <TeamMember key={index}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>
                  <strong>{member.role}</strong>
                </p>
                <p>{member.description}</p>
              </TeamMember>
            ))}
          </TeamSection>

          <hr />

          <CloseButton onClick={togglePop}>
            <img src={close} alt="Close" />
          </CloseButton>
        </OverviewSection>
      </AboutDetails>
    </AboutContainer>
  );
};

export default About;
