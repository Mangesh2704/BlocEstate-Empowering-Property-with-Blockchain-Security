import { ethers } from 'ethers';
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount, toggleModal }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
    };

    return (
        <nav>
            <div className='nav__brand'>
                <img src={logo} alt="Logo" />
                <h1>BlocEstate</h1>
            </div>

            <ul className='nav__links' style={{fontWeight:"700"}}>
                <li><a href="/" onClick={() => toggleModal('home')}>Home</a></li>  {/* This can navigate to homes section */}
                <li><a href="#" onClick={() => toggleModal('about')}>About</a></li>  {/* This will open the About modal */}
                <li><a href="#" onClick={() => toggleModal('contact')}>Contact</a></li>  {/* This will open the Contact modal */}
            </ul>

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                    style={{fontWeight:"700"}} 
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}
        </nav>
    );
};

export default Navigation;
