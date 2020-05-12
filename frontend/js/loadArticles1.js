async function loadArticles(event) {

    document.querySelector("#loading").style.display = "";
    // document.querySelector("#loading").style.animation = "";
    document.querySelector("#loaded").style.display = "None";
    document.querySelector("#button").style.visibility = "hidden";

    const apiC = await fetch("api/all");
    const apiD = await apiC.json()
    const results = apiD.results;

    document.querySelector("#loading").style.display = "None";
    document.querySelector("#loaded").style.display = "";

    console.log(results);
    var i = 0
    for (let result of results) {
        console.log(result);

        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        clone.querySelector("a").id = i

        clone.querySelector("a").href = "https://cloudflare-ipfs.com/ipfs/" +result.ipfsHash
        clone.querySelector(".avtext").textContent = result.domainTitle

         clone.querySelector(".totalPopularity").textContent = result.defaultPopularity

        var host = document.querySelector('#iframe-container');
        host.appendChild(clone);
        i++
    }


}

$(document).ready(function () {
    $("input").bind('keyup mouseup', function () {
        loadArticles();
    });
    $("select").change(function () {
        if (document.querySelector("#site").value != "others") {
            loadArticles();
        }
    });
    $("#button").click(function () {
        loadArticles();
    });
    loadArticles();
    var num = document.querySelectorAll('input[type="selector"]');
    for (var i = 0; i < num.length; i++) { num[i].addEventListener('focus', function () { document.querySelector("#button").style.visibility = 'visible'; }); }

});

