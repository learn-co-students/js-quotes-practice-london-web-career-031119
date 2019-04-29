const url = 'http://localhost:3000/quotes'

const getQuotes = () =>
  fetch(url)
  .then(resp => resp.json())

const createQuote = quote => 
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    }).then(resp => resp.json())

const updateQuote = quote => 
    fetch(url+`/${quote.id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    }).then(resp => resp.json())

const deleteQuote = quote => 
    fetch(url+`/${quote.id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())


const renderQuote = quote => {
    const list = document.querySelector('#quote-list')
    const li = document.createElement('li')
    li.className = 'quote-card'
    li.innerHTML= `
    <blockquote class=blockquote>
      <p class=mb-0> ${quote.quote} </p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class=btn-success>Likes: <span>${quote.likes}</span></button>
      <button class=btn-danger>Delete</button>
    </blockquote>
    `
    list.append(li)

    const likeBtn = li.querySelector(".btn-success")
    const delBtn = li.querySelector(".btn-danger")

    delBtn.addEventListener('click', () =>{
        deleteQuote(quote)
        li.remove()
    })

    likeBtn.addEventListener('click', () => {
        quote.likes++
        updateQuote(quote)
        likeBtn.innerHTML = `Likes: <span>${quote.likes}</span>`
    })

}

const addQuote = () => {
    const formEl = document.querySelector('#new-quote-form')
    const newQuote = formEl.querySelector('#new-quote')
    const newAuthor = formEl.querySelector('#author')

    formEl.addEventListener('submit', event => {
        event.preventDefault()
        const quote = {
            quote: newQuote.value,
            author: newAuthor.value,
            likes: 0
        }
    createQuote(quote)
    .then(renderQuote)
    
    formEl.reset()
    })
}

const renderQuotes = quotes => {
    quotes.forEach(renderQuote)
}


const init = () => {
    getQuotes()
    .then(renderQuotes)
    addQuote()
}

init()