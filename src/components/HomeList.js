import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import Search from './Search';

const HomeList = () => {
    const [homes, setHomes] = useState([]);
    const [filteredHomes, setFilteredHomes] = useState([]);

    // Replace with your IPFS URLs or CID
    const ipfsURLs = [
        "https://ipfs.io/ipfs/QmUzEir6CtwukLLuuCnJZWEDnmDoB5fZWvLLmck1QzpN6r/", // Add your IPFS CID here
        // "https://ipfs.io/ipfs/QmU..."  // Add more IPFS URLs if needed
    ];

    // Fetch home data from IPFS
    const fetchHomes = async () => {
        try {
            const homeData = await Promise.all(
                ipfsURLs.map(async (url) => {
                    const response = await axios.get(url); // Fetch JSON data from IPFS
                    return response.data; // Assuming the data is in JSON format
                })
            );
            setHomes(homeData); // Store all the homes data
            setFilteredHomes(homeData); // Set the initial filtered homes to all homes
        } catch (error) {
            console.error("Error fetching homes data:", error);
        }
    };

    // Filter homes based on search term
    const filterHomes = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filtered = homes.filter(home =>
            home.address.toLowerCase().includes(term) ||
            home.name.toLowerCase().includes(term) ||
            home.description.toLowerCase().includes(term)
        );
        setFilteredHomes(filtered);
    };

    useEffect(() => {
        fetchHomes();
    }, []);

    return (
        <div>
            <Search filterHomes={filterHomes} />
            <div className="home-list">
                {filteredHomes.map(home => (
                    <Home key={home.id} home={home} />
                ))}
            </div>
        </div>
    );
};

export default HomeList;
