const randomDiv = document.getElementById("randomDiv");
const quoteDiv = document.getElementById("quoteDiv")

async function randomQuote(){
    const randomQuote = document.getElementById("randomQuote");
    const randomAuthor = document.getElementById("randomAuthor");

    await fetch("https://usu-quotes-mimic.vercel.app/api/random").then((response) => {
        response.json().then((data) => {
            randomQuote.innerText = data.content;
            randomAuthor.innerText = "-"+data.author;
        })     
    });
}

async function getAuthor(author){
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query="+author).then((response) => {
        response.json().then((data) => {

            let oldQuotes = document.getElementsByClassName("specialQuote");

            const size = oldQuotes.length;
            let temp = [];

            for (let i=0; i< size; i++){
                if(oldQuotes[i].dataset.pinned == "false"){
                    temp.push(oldQuotes[i])
                }
            }

            for(let i=0; i< temp.length; i++){
                temp[i].remove();
            }

            for (let i=0; i<data.results.length; i++){
                const quote = document.createElement("button");
                quote.innerText = data.results[i].content;
                quote.innerText += "\n -" + data.results[i].author;
                quote.setAttribute("class", "specialQuote");
                quote.setAttribute("data-pinned", "false");
                quote.setAttribute("role", "button");

                quote.addEventListener("click", () => {
                    if (quote.dataset.pinned == "false"){
                        quote.setAttribute("data-pinned", "true");
                    } else {
                        quote.setAttribute("data-pinned", "false");
                    }
                })

                quoteDiv.appendChild(quote)
            }
        })
    });
}

function searchAuthor(){
    let author = document.getElementById("searchBar").value;

    getAuthor(author);
   
    const titleBar = document.getElementById("titleBar");
    const body = document.getElementById("body");
    const searchBar = document.getElementById("searchBar");

    randomDiv.setAttribute("data-visual", "false");
    titleBar.setAttribute("data-list", "true");
    body.setAttribute("data-list", "true");
    searchBar.setAttribute("data-list", "true");
}

randomQuote();