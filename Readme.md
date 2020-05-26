## 4 parts of search engine. 

 1. Crawling - Get domain names from unstoppabledomains Ethereum and Zil blockchain. For crawling IPFS pages, Yacy 2 is used. Scrappy and apache nutch were considered. 

 2. Assessing popularity of domain. - Standard page rank like techniques using backlinks and social media popularity. 
Number and volume of transactions done in Ethereum can also be used for Ranking. 
Presence of ipfs hash can be used as minimum ranking parameter. 
As of now, number of words and outlinks can also be used as a ranking parameter. 

 3. Search - Parse content from webpage and put into  Elasticsearch

 4. Frontend - UI for search engine. 

## To do

1. Ability to sort pages by using different parameters from frontend. 
2. Display webpage summary in frontend. 
3. Will slowly increase decentralization by moving the data to blockchain and using smart contracts.
4. Option to upvote pages using metamask auth.
5. Crawl from Zil blockchain

## Steps to get domain names from unstoppable domains blockchain 

1. Transactions details from https://etherscan.io/address/0xb485d89aba096fc9f117fa28b80dc8aac7971049 can get us Transaction Hashes. That transaction hash has info about domain name. 
2. From domain name, get ipfs hash from Unstoppable Domains API.
3. FRom ipfs hash, get webpage contents.

 Finding ipfs hash from crypto domain can be done in two ways.

1) API call. From https://unstoppabledomains.com/api/v1/kyber.crypto
2) Using blockchain library. https://github.com/unstoppabledomains/resolution or https://github.com/unstoppabledomains/dot-crypto

 For finding all trasactions from address

1. From blockchain https://ethereum.stackexchange.com/questions/8900/how-to-get-transactions-by-account-using-web3-js
2. Use etherscan api http://api.etherscan.io/api?module=account&action=txlist&address=/0xd1e5b0ff1287aa9f9a268759062e4ab08b9dacbe&startblock=9080000&endblock=99999999&sort=asc&apikey=

## Other Notes

Commands for database creation are in techDocs folder
