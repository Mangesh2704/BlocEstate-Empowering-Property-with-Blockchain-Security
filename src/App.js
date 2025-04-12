import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';  // Import the Footer component

// ABIs
import RealEstate from './abis/RealEstate.json';
import Escrow from './abis/Escrow.json';

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState([]);
  const [home, setHome] = useState({});
  const [modal, setModal] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();

    const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider);
    const totalSupply = await realEstate.totalSupply();
    const homes = [];

    for (var i = 1; i <= totalSupply; i++) {
      const uri = await realEstate.tokenURI(i);
      const response = await fetch(uri);
      const metadata = await response.json();
      homes.push(metadata);
    }

    setHomes(homes);

    const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider);
    setEscrow(escrow);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement('script');
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'af,ar,be,bg,bn,bs,ca,hr,cs,da,nl,eo,et,tl,fi,fr,de,el,gu,hi,hu,id,is,it,ja,kn,ko,la,lv,lt,mk,ml,mr,ne,pl,pt,ro,ru,sr,si,sk,sl,es,sv,ta,te,tr,uk,ur,vi,cy,zu'
          },
          'google_translate_element'
        );
      };
    }
  }, []);

  const toggleModal = (type, home = null) => {
    if (type === 'home') {
      setHome(home);
      setModal('home');
    } else if (type === 'about') {
      setModal('about');
    } else if (type === 'contact') {
      setModal('contact');
    } else {
      setModal(null);
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <Navigation account={account} setAccount={setAccount} toggleModal={toggleModal} />
        <div id="google_translate_element"></div>
      </div>
      
      <Search />

      <div className='cards__section'>
        <h3>Homes For You</h3>
        <hr />
        <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => toggleModal('home', home)}>
              <div className='card__image'>
                <img src={home.image} alt="Home" />
              </div>
              <div className='card__info'>
                <h4>{home.attributes[0].value} ETH</h4>
                <p>
                  <strong>{home.attributes[2].value}</strong> bds |
                  <strong>{home.attributes[3].value}</strong> ba |
                  <strong>{home.attributes[4].value}</strong> sqft
                </p>
                <p>{home.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal === 'home' && <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={() => toggleModal(null)} />}
      {modal === 'about' && <About togglePop={() => toggleModal(null)} />}
      {modal === 'contact' && <Contact togglePop={() => toggleModal(null)} />}
      
      <Chatbot />

      <Footer /> {/* Add Footer component here */}

      <style>
        {`
          .navbar-container {
            position: relative;
          }

          #google_translate_element {
            position: absolute !important;
            top: 0 !important; 
            right: 0;
            margin: 10px;
            z-index: 9999;
            margin-top: 90px;
            margin-left: 20px;
          }

          /* Footer Styling */
          .footer {
            background-color: #282c34;
            color: white;
            padding: 20px 0;
            text-align: center;
          }

          .footer p {
            margin: 5px;
          }

          /* Responsive Footer */
          @media (max-width: 767px) {
            .footer {
              padding: 15px 0;
            }
          }

          @media (max-width: 480px) {
            .footer {
              padding: 10px 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
