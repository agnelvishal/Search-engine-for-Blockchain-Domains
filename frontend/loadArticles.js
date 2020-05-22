async function loadArticles(event) {

    document.querySelector("#row").innerHTML="";
    if (document.querySelector("#search").value != "") { 
        loadIpfsApi()
    return
    }


    document.querySelector("#loading").style.display = "";
    // document.querySelector("#loading").style.animation = "";
    document.querySelector("#loaded").style.display = "None";
    document.querySelector("#button").style.visibility = "hidden";

    const apiC = await fetch("https://apiIpfs.sarchy.online/api/all");

    const apiD = await apiC.json();
    const results = apiD.results;

    document.querySelector("#loading").style.display = "None";
    document.querySelector("#loaded").style.display = "";

    var i = 0
    for (let result of results) {

        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        clone.querySelector("a").id = i

        clone.querySelector("a").href = "https://cloudflare-ipfs.com/ipfs/" + result.ipfsHash
        clone.querySelector(".avtext").textContent = result.domainTitle

        clone.querySelector(".totalPopularity").textContent = result.defaultPopularity

        var host = document.querySelector('#row');
        host.appendChild(clone);
        i++
    }


}

async function loadIpfsApi(){
    let avQuery = document.querySelector("#search").value;

    const apiC = await fetch("https://api.ipfs-search.com/v1/search?q="+avQuery);

    const apiD = await apiC.json();
    const results = apiD.hits;


    var i = 0
    for (let result of results) {
console.log(result);

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


$(document).ready(function () {
    $("input").bind('keyup mouseup', function () {
        loadArticles();
    });
    $("select").change(function () {
            loadArticles();
        
    });
    $("#button").click(function () {
        loadArticles();
    });
    loadArticles();
    var num = document.querySelectorAll('input[type="selector"]');
    for (var i = 0; i < num.length; i++) { num[i].addEventListener('focus', function () { document.querySelector("#button").style.visibility = 'visible'; }); }

});

