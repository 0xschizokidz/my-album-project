// index.js

import Web3 from 'web3';
import axios from 'axios'; // Import axios

// Define Alchemy API endpoint for Sepolia testnet
const alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/FiCcSvlIuZs0HfGtBw_56NfE_mslOIMD'; // Replace with your Alchemy API key

// Initialize Web3 instance with Alchemy provider
const web3 = new Web3(new Web3.providers.HttpProvider(alchemyUrl));

// Variables for contract interaction
const myAccountNumber = '0x880EdAd988BA902e3FD8A3482B2C9d38dCBc2a78';
const myContractAddress = '0x7af54110B520Bfae99b68B1eCc892FdFa93Bba95';

// Contract ABI
const albumContractABI = [
    // Your contract ABI here
    {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"albumEvent_Artist","type":"string","indexed":false},{"internalType":"string","name":"albumEvent_Title","type":"string","indexed":false},{"internalType":"uint256","name":"albumEvent_Tracks","type":"uint256","indexed":false}],"type":"event","name":"albumEvent","anonymous":false},{"inputs":[],"stateMutability":"view","type":"function","name":"albumTitle","outputs":[{"internalType":"string","name":"","type":"string"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"artist","outputs":[{"internalType":"string","name":"","type":"string"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"contractAuthor","outputs":[{"internalType":"string","name":"","type":"string"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"getAlbum","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}]},{"inputs":[{"internalType":"string","name":"_artist","type":"string"},{"internalType":"string","name":"_albumTitle","type":"string"},{"internalType":"uint256","name":"_tracks","type":"uint256"}],"stateMutability":"nonpayable","type":"function","name":"setAlbum"},{"inputs":[],"stateMutability":"view","type":"function","name":"tracks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}]}
];

// Build a reference to the smart contract
const albumContract = new web3.eth.Contract(albumContractABI, myContractAddress);

// Function to get album details
function getAlbumDetails() {
    albumContract.methods.getAlbum().call()
        .then(result => {
            console.log('Album Details:', result);
            // Update HTML or perform other actions with the album details
        })
        .catch(error => console.error('Error fetching album details:', error));
}

// Function to update album details
function updateAlbum(artist, albumName, tracks) {
    albumContract.methods.setAlbum(artist, albumName, tracks).send({ from: myAccountNumber })
        .then(receipt => {
            console.log('Transaction Receipt:', receipt);
            getAlbumDetails(); // Update album details after transaction
        })
        .catch(error => console.error('Error updating album:', error));
}

// Example usage: Fetching latest block number using Alchemy API
const payload = {
    jsonrpc: '2.0',
    method: 'eth_blockNumber',
    params: [],
    id: 1
};

axios.post(alchemyUrl, payload)
    .then(response => {
        console.log('Latest Block Number:', parseInt(response.data.result, 16));
    })
    .catch(error => {
        console.error('Error fetching latest block number:', error);
    });

// Example usage: Update album details on button click
document.getElementById('updateButton').addEventListener('click', () => {
    const artist = document.getElementById('albumArtist').value;
    const albumName = document.getElementById('albumName').value;
    const tracks = parseInt(document.getElementById('tracks').value);

    updateAlbum(artist, albumName, tracks);
});

// Load initial album details on page load
document.addEventListener('DOMContentLoaded', () => {
    getAlbumDetails();
});
