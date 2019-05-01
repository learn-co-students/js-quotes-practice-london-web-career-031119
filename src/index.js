// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const ulListOfQuotes = document.querySelector('#quote-list')
const entireForm = document.querySelector('#new-quote-form')
const singleEntry = document.querySelector('.form-group')
const submitBn = document.querySelector('.btn.btn-primary')

const state = {
    quotes: []
}

//render single quote
function renderQuote(quote){
    // debugger
    const liEl = document.createElement('li')
    liEl.className = 'quote-card'
    liEl.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span class="my-likes">${quote.likes}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `

    //Delete Button
    const deleteBn = liEl.querySelector('.btn-danger')
    deleteBn.addEventListener('click', function(){
        liEl.remove()
        deleteQuoteFromServer(quote)

    })

    //Increase likes 
    const likeBn = liEl.querySelector('.btn-success')
    likeBn.addEventListener('click', function(){
        // debugger
        quote.likes++
        updateLike(quote)
        const likeDiv = liEl.querySelector('.my-likes')
        likeDiv.innerText = quote.likes
    })
    ulListOfQuotes.append(liEl)
}

//asd
//render multiple quotes
function renderQuotes(quotes){
    quotes.forEach(renderQuote)
}

// Creates a new quote and adds it to the list of quotes without having to refresh the page. 
function createQuote(){
    entireForm.addEventListener('submit', function(event){
        event.preventDefault()
        quote = {
            quote: entireForm.quote.value,
            likes: 0,
            author:entireForm.author.value
        }

        
        createQuoteOnServer(quote) //conditional rendering is better
            .then(renderQuote)

        // createQuoteOnServer(quote)
        // renderQuote(quote)
        // debugger

        entireForm.reset()
            
    })
}





// function init(){
//     getQuotesFromServer()
//         .then(renderQuotes)
//         createQuote()
// }

function init(){
    getQuotesFromServer()
        .then(function(quotes){
            state.quotes = quotes
            renderQuotes(state.quotes)
        })
        createQuote()
}

init()