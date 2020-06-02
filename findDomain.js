const fetch = require('node-fetch');
const details = require('./details.js');
const toDb = require('./avDb.js')




async function main() {


    const charachters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let domains;
    for (let i = 0; i < charachters.length; i++) {
        domains = []
        const apiC = await fetch('https://unstoppabledomains.com/api/v1/websites/?page=1&perPage=all&letter=' + charachters[i])
        const json = await apiC.json()
        for (let j = 0; j < json.length; j++) {
        domains.push([json[j]])
        }

        // console.log(domains);
        


        if (domains.length != 0)
            toDb.toDb("cryptoDomain", domains)

    }
}
main()