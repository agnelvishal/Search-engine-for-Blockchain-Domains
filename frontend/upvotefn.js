function upvotefn(a) {
    try {

        
        web3.eth.sendTransaction({
            from: web3.eth.coinbase,
            to: '0x40ADe8d4B29306486b0ED948Dc2Ed7a4eA71c2d8',
            value: web3.toWei(0.05, 'ether'),
            data: a.dataset.domain
        }, function (error, result) {
            if (!error) {
                localStorage.setItem("txnHash", result);

                document.querySelector('#upvote').innerHTML = 'Success: <a href="https://etherscan.io/tx/' + result + '"> View Transaction </a>'

            } else {
                p = document.createElement("p")
                p.className = "error"
                if (error.code == -32000) {
                    t = document.createTextNode("Error: Gas fee was set low. Can you try again?")
                    p.append(t)
                    document.querySelector("#upvote").append(p)
                }
                else {
                    p = error.message
                    document.querySelector("#upvote").append(p)
                }
            }
        })
    }
    catch (error) {
        console.log(error)
        p = document.createElement("p")
        p.className = "error"
        if (error == "ReferenceError: web3 is not defined") {
            console.log("undefined")
            t = `To use your Ethereum Wallet, login into Torus by clicking on the Blue icon at bottom left. Also allow popup. Then click pay crypto again`;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var linkElement = document.createElement('a');

                linkElement.href = "https://play.google.com/store/apps/details?id=org.toshi";
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    linkElement.href = "https://apps.apple.com/app/coinbase-wallet/id1278383455?ls=1";
                }

                linkElement.id = "coinbase"

                var oImg = document.createElement("img");
                oImg.setAttribute('src', 'assets/browser/getCoinbaseWallet.svg');
                linkElement.appendChild(oImg);
                document.body.appendChild(linkElement);

            }
        }
        else {
            if (typeof torus !== 'undefined') {
                t = document.createTextNode("To use your Ethereum Wallet, login into Torus by clicking on the Blue icon at bottom left. Also allow popup. Then click pay crypto again")
            }
            else {
                t = document.createTextNode("Login and check Metamask or similar extension");
            }
        }
        p.append(t)
        document.querySelector("#upvote").append(p)
    }
}