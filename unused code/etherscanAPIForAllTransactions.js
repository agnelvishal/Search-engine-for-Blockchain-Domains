const fetch = require('node-fetch');
const details = require('../details.js');
const InputDataDecoder = require('ethereum-input-data-decoder');
const toDb = require('../avDb.js')


apiKey = details.etherScanAPI

async function main() {

    // const apiC = await fetch("http://api.etherscan.io/api?module=account&action=txlist&address=0xb485d89aba096fc9f117fa28b80dc8aac7971049&startblock=9980000&endblock=99999999&sort=asc&apikey=" + apiKey);

     const START_BLOCK = 9082641;
    const END_BLOCK = 10025824;
    const increment = 1000

    for (i = START_BLOCK; i < END_BLOCK; i = i + increment) {
        try {
            process.stdout.write(i+" ");

            tempEndBlock = i + increment
            const apiC = await fetch("http://api.etherscan.io/api?module=account&action=txlist&address=0xb485d89aba096fc9f117fa28b80dc8aac7971049&startblock=" + i + "&endblock=" + tempEndBlock + "&sort=asc&apikey=" + apiKey);
            const json = await apiC.json()
            
            // console.log(json);


            if (json.result.length > 5000) {
                console.log(i);
                console.log(json.result.length);
            }

            let contractABI = [{ "inputs": [{ "internalType": "contract MintingController", "name": "mintingController", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "WhitelistAdminAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "WhitelistAdminRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "WhitelistedAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "WhitelistedRemoved", "type": "event" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "addWhitelistAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "addWhitelisted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }], "name": "bulkAddWhitelisted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }], "name": "bulkRemoveWhitelisted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isWhitelistAdmin", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "label", "type": "string" }], "name": "mintSLD", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "label", "type": "string" }, { "internalType": "string[]", "name": "keys", "type": "string[]" }, { "internalType": "string[]", "name": "values", "type": "string[]" }], "name": "mintSLDToDefaultResolver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "removeWhitelisted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceMinter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceWhitelistAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceWhitelisted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "label", "type": "string" }], "name": "safeMintSLD", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "label", "type": "string" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeMintSLD", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "label", "type": "string" }, { "internalType": "string[]", "name": "keys", "type": "string[]" }, { "internalType": "string[]", "name": "values", "type": "string[]" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeMintSLDToDefaultResolver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "label", "type": "string" }, { "internalType": "string[]", "name": "keys", "type": "string[]" }, { "internalType": "string[]", "name": "values", "type": "string[]" }], "name": "safeMintSLDToDefaultResolver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "resolver", "type": "address" }], "name": "setDefaultResolver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
            const decoder = new InputDataDecoder(contractABI);

            domains = []
            for (result of json.result) {
                data = result.input
                const decodedI = decoder.decodeData(data);
                domain = decodedI.inputs[1];
                domain = domain + ".crypto"
                domains.push([domain])
            }

            if (domains.length != 0)
                toDb.toDb("cryptoDomain", domains)
        }
        catch (err) {
            console.log(err);
            console.log(i);

        }
    }
}

main()

