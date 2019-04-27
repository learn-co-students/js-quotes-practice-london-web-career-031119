// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const formEl = document.querySelector('#new-quote-form')
const quoteUl = document.querySelector('#quote-list')
  
// add a single quote to the page
const addQuote = quote => {
    const newLi = document.createElement('li')
    newLi.className = 'quote-card'

    newLi.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success' id='btn-likes' name='likes'>Likes: <span>${quote.likes}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    quoteUl.append(newLi)

    getQuote()


    // increase likes 
    const likes = document.querySelector('#btn-likes')
    likes.addEventListener('click', () => {
        quote.likes++
        likes.innerHTML = `Likes: <span>${quote.likes}</span>`
        updateQuote(quote)
    })

    // delete quote
    const deleteBtn = document.querySelector('.btn-danger')
    deleteBtn.addEventListener('click', () => {
        quoteUl.remove()
        deleteQuote(quote.id)
    })

    
}

// add multiple quotes to the page 
const addQuotes = quotes => {
    quotes.forEach(addQuote)
}

// create a new quote 
const submitQuote = () => {
    formEl.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const quote = {
            quote: formEl.quote.value,
            author: formEl.author.value,
            likes: 0
        }
        formEl.reset()

        createQuote(quote)
            .then(addQuote(quote))

    })
}

// get data 
const getQuote = () => {
    return fetch('http://localhost:3000/quotes')
        .then(resp => resp.json())
} 

// create a new quote
const createQuote = (quote) => {
    return fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
    }).then(resp => resp.json())
}

// increase likes
const updateQuote = (quote) => {
    return fetch('http://localhost:3000/quotes/${quote.id}', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
    }).then(resp => resp.json())
}

const deleteQuote = (id) => {
    return fetch('http://localhost:3000/quotes/id', {
        method: 'DELETE'
    })
}

// initialize the page
const init = () => {
    return getQuote()
        .then(addQuotes)
}
init() 



