Try the search engine at https://ipfs.sarchy.online or at https://gateway.pinata.cloud/ipfs/QmPse2Zoo3njo3P2tMY5RLWvVhczZruG6zMi4Q8YEkZ3FE

If you can access crypto domains, check it at http://sarchy.crypto

## Unique Feature of the search engine.

In this search engine, one can sort webpages by user-defined ranking factors.
For example, the user can increase the ranking for webpages with images.
One can even select unstoppable domains which have gundb chat enabled. 

This way, every user can set their own ranking algorithm instead of Google deciding the ranking algorithm for the whole world. This will stop data manipulation by monopolies and promote decentralization.

## 4 parts of a search engine.

 1. Crawling - Get domain names from unstoppabledomains Ethereum and Zil blockchain. For crawling IPFS pages, Yacy 2 is used. Scrappy and apache nutch were considered.

 2. Assessing popularity of domain. - Standard page rank like techniques using backlinks and social media popularity can also be used for Ranking. 
Presence of ipfs hash is used as minimum ranking parameter. 
As of now, number of words, number of images, volume of ethereum transactions and outlinks are used as ranking parameters.

 3. Search - Parse content from webpage and put into Elasticsearch

 4. Frontend - UI for search engine. 

## To do

1. Remove bugs while searching
2. Will slowly increase decentralization by moving the data to blockchain and using smart contracts.
3. Ability to upvote pages using metamask auth

## Steps to get domain names from unstoppable domains blockchain 

1. Transactions details from https://etherscan.io/address/0xb485d89aba096fc9f117fa28b80dc8aac7971049 can get us Transaction Hashes. That transaction hash has info about domain name. 
2. From domain name, get ipfs hash from Unstoppable Domains API.
3. From ipfs hash, get webpage contents.

 Finding ipfs hash from crypto domain can be done in two ways.

1) API call. From https://unstoppabledomains.com/api/v1/kyber.crypto
2) Using blockchain library. https://github.com/unstoppabledomains/resolution or https://github.com/unstoppabledomains/dot-crypto

 For finding all trasactions from address

1. From blockchain https://ethereum.stackexchange.com/questions/8900/how-to-get-transactions-by-account-using-web3-js
2. Use etherscan api http://api.etherscan.io/api?module=account&action=txlist&address=/0xd1e5b0ff1287aa9f9a268759062e4ab08b9dacbe&startblock=9080000&endblock=99999999&sort=asc&apikey=

## Other Notes

Commands for database creation are in techDocs folder
