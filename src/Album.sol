// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract Album {

    string public artist;
    string public albumTitle;
    uint256 public tracks;
    string public constant contractAuthor = "0xschizokidz";

    constructor() {
        artist = "Nirvana";
        albumTitle = "Nevermind";
        tracks = 13;
    }

    function getAlbum() public view returns (string memory, string memory, uint256) {
        return(artist, albumTitle, tracks);
    }

    function setAlbum(string memory _artist, string memory _albumTitle, uint256 _tracks) public {
        artist = _artist;
        albumTitle = _albumTitle;
        tracks = _tracks;
    }

    event albumEvent (string albumEvent_Artist, string albumEvent_Title, uint256 albumEvent_Tracks);


} 
