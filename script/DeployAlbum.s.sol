// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Script} from "../lib/forge-std/src/Script.sol";
import {Album} from "../src/Album.sol";


contract DeployAlbum is Script {

    function run() external returns(Album) {
        vm.startBroadcast();
        Album album = new Album();
        vm.stopBroadcast();
        return album;

    }

}