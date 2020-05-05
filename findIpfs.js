const fetch = require('node-fetch');
const avDb = require('./avDb.js')


async function main() {

    cryptoDomains = await avDb.fromDb("cryptoDomain", "tokenOwnerAddress", true);
    //console.log(cryptoDomains);

    for (i = 1; i < cryptoDomains.length; i++) {

        try {
            cryptoDomain = cryptoDomains[i]["cryptoDomain"]
            process.stdout.write(i+" ");

            const apiC = await fetch("https://unstoppabledomains.com/api/v1/" + cryptoDomain);
            const json = await apiC.json()
            //  console.log(json);
//             if (json.ipfs.html === undefined)
// console.log(json);


            let ipfs = json.ipfs.html
            let owner = json.meta.owner
            let eth = json.addresses.eth
            let type = json.meta.type



            avDb.toDbUpdate("ipfsHash", ipfs, "cryptoDomain", cryptoDomain)
            avDb.toDbUpdate("tokenOwnerAddress", owner, "cryptoDomain", cryptoDomain)
            avDb.toDbUpdate("ethRedirectAddress", eth, "cryptoDomain", cryptoDomain)
            avDb.toDbUpdate("domainType", type, "cryptoDomain", cryptoDomain)

        }
        // avDb.toDbUpdate("cryptoDomain", ipfs, cryptoDomain)
        catch (err) {
            console.log("error in findIpfs.js");

            //console.log(err);
        }
    }
}
main()
