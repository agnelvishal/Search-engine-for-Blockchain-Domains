async function loadArticles(event, pagination) {

    if (!pagination)
        document.querySelector("#row").innerHTML = "";

    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());

    if (document.querySelector("#search").value != "") {
        loadSearchApi(data)
        loadIpfsApi(data)
        return
    }



    document.querySelector("#loading").style.display = "";
    // document.querySelector("#loading").style.animation = "";
    document.querySelector("#loaded").style.display = "None";
    document.querySelector("#button").style.visibility = "hidden";

    // const apiC = await fetch("https://apiIpfs.sarchy.online/api/all", {
    //  const apiC = await fetch("http://localhost:3000/api/all", {
    const apiC = await fetch("https://apiIpfs.sarchy.online/api/all", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // "Content-Type": "application/json" 
        },
        body: JSON.stringify(data), // convert Js object to a string

    });

    const apiD = await apiC.json();
    const results = apiD.results;

    document.querySelector("#loading").style.display = "None";
    document.querySelector("#loaded").style.display = "";

    document.querySelector("#loadMore").style.visibility = "visible";
    document.querySelector("body > div.picked").style.display = "block"


    var i = 0
    for (let result of results) {

        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        clone.querySelector("a").id = i

        clone.querySelector("a").href = "https://cloudflare-ipfs.com/ipfs/" + result.ipfsHash
        clone.querySelector(".avtext").textContent = result.domainTitle2
        clone.querySelector(".avBody").textContent = result.domainDesc2 + " ..."


        clone.querySelector(".totalPopularity").textContent = result.defaultPopularity
        clone.querySelector(".charCount  > p:nth-child(2) ").textContent = result.charCount
        clone.querySelector(".imgCount  > p:nth-child(2) ").textContent = result.imgCount
        clone.querySelector(".outLinksCount  > p:nth-child(2) ").textContent = result.outLinksCount


        var host = document.querySelector('#row');
        host.appendChild(clone);
        i++
    }
}

async function loadIpfsApi() {

    let avQuery = document.querySelector("#search").value;

    const apiC = await fetch("https://api.ipfs-search.com/v1/search?q=" + avQuery);

    const apiD = await apiC.json();
    const results = apiD.hits;

    document.querySelector("body > div.picked").style.display = "block"

    var i = 0
    for (let result of results) {
        // console.log(result);

        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        clone.querySelector("a").id = i

        clone.querySelector("a").href = "https://cloudflare-ipfs.com/ipfs/" + result.hash
        clone.querySelector(".avtext").innerHTML = result.title

        clone.querySelector(".totalPopularity").textContent = result.score

        var host = document.querySelector('#row');
        host.appendChild(clone);
        i++
    }

}

async function loadSearchApi(data) {

    document.querySelector("#loading").style.display = "";
    // document.querySelector("#loading").style.animation = "";
    document.querySelector("#loaded").style.display = "None";
    document.querySelector("#button").style.visibility = "hidden";


    // const apiC = await fetch("https://apiIpfs.sarchy.online/api/search", {
    // const apiC = await fetch("http://localhost:3000/api/search", {
    const apiC = await fetch("https://apiIpfs.sarchy.online/api/search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // "Content-Type": "application/json" 
        },
        body: JSON.stringify(data), // convert Js object to a string

    });

    const apiD = await apiC.json();
    const results = apiD.results;

    document.querySelector("#loading").style.display = "None";
    document.querySelector("#loaded").style.display = "";

    document.querySelector("#loadMore").style.visibility = "visible";
    document.querySelector("body > div.picked").style.display = "block"

    var i = 0
    for (let result of results) {
        console.log(result);


        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        clone.querySelector("a").id = i

        clone.querySelector("a").href = "https://cloudflare-ipfs.com/ipfs/" + result.ipfsHash
        clone.querySelector(".avtext").textContent = result.domainTitle2
        clone.querySelector(".avBody").textContent = result.domainDesc2 + " ..."


        clone.querySelector(".totalPopularity").textContent = result.defaultPopularity
        clone.querySelector(".charCount  > p:nth-child(2) ").textContent = result.charCount
        clone.querySelector(".imgCount  > p:nth-child(2) ").textContent = result.imgCount
        clone.querySelector(".outLinksCount  > p:nth-child(2) ").textContent = result.outLinksCount


        var host = document.querySelector('#row');
        host.appendChild(clone);
        i++
    }
}

async function  votefn(cryptoDomain,vote)
{
const apiC = await fetch(`https://apiIpfs.sarchy.online/api/vote?cryptoDomain=${cryptoDomain}&vote=${vote}`)
const json = await apiC.json()
console.log(json);

}

$(document).ready(function () {
    $("input").bind('keyup mouseup', function () {
        loadArticles();
    });
    $("select").change(function () {
        loadArticles();

    });
    // $("#button").click(function () {
    //     loadArticles();
    // });
    loadArticles();
    // var num = document.querySelectorAll('input[type="selector"]');
    // for (var i = 0; i < num.length; i++) { num[i].addEventListener('focus', function () { document.querySelector("#button").style.visibility = 'visible'; }); }

    document.querySelector("#loadMore").addEventListener("click", () => {
        document.querySelector("#pageNo").value = Number(document.querySelector("#pageNo").value) + 1;
        loadArticles(null, true)
    }
    )


});

