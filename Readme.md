# Tech Info

Steps to get domain names 
1. Transactions details from https://etherscan.io/address/0xb485d89aba096fc9f117fa28b80dc8aac7971049 can get us Transaction Hashes. That transaction hash has info about domain name.
2. From domain name, get ipfs hash from Unstoppable Domains API.
3. FRom ipfs hash, get webpage contents. 

Commands for database creation are in techDocs folder.

Finding ipfs hash from crypto domain can be done in two ways.
1) API call. From https://unstoppabledomains.com/api/v1/kyber.crypto
2) Using blockchain library. https://github.com/unstoppabledomains/resolution or https://github.com/unstoppabledomains/dot-crypto


For finding all trasactions from address
1. From blockchain https://ethereum.stackexchange.com/questions/8900/how-to-get-transactions-by-account-using-web3-js
2. Use etherscan api 
http://api.etherscan.io/api?module=account&action=txlist&address=/0xd1e5b0ff1287aa9f9a268759062e4ab08b9dacbe&startblock=9080000&endblock=99999999&sort=asc&apikey=XXD3MNH8GV8M88UN4VNEQ7RGPFBFTVGYD6