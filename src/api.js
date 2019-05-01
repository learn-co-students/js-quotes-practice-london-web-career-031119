//Stuff for the server

const SERVER_DATA = 'http://localhost:3000/quotes'

//get quotes from the server
function getQuotesFromServer(){
    return fetch(SERVER_DATA)
        .then(resp => resp.json())
}

//add the quote on the server
function createQuoteOnServer(quote){
    return fetch(SERVER_DATA, { 
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(quote)
    })
    .then(response => response.json())
}

//delete quote from the server
function deleteQuoteFromServer(quote){
    fetch(SERVER_DATA + `/${quote.id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

//update likes on the quote
function updateLike(quote){
    fetch(SERVER_DATA + `/${quote.id}`, {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(quote)
    })
    .then(response => response.json())
}