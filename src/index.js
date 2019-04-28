// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
QUOTES_URL = 'http://localhost:3000/quotes'

const form = document.querySelector('#new-quote-form')
const ul = document.querySelector('ul#quote-list')

const showQuote = quote => {
   const li = document.createElement('li')
   li.className = 'quote-card'
   li.innerHTML = `
      <blockquote class="blockquote">
         <p class="mb-0">${quote.quote}</p>
         <footer class="blockquote-footer">${quote.author}</footer>
         <br>
         <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
         <button class='btn-danger'>Delete</button>
      </blockquote>`
   li.addEventListener('click',(e) => {
      switch (e.target.className) {
         case "btn-danger": deleteQuote(quote.id)
         case "btn-success": likeQuote(quote)
      }
   })
   ul.append(li)
}

const likeQuote = quote => {
   quote.likes ++
   return fetch(QUOTES_URL + `/${quote.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
   }).then(r => r.ok)
}

const showQuotes = quotes => quotes.forEach(showQuote)

const getQuotes = () => fetch(QUOTES_URL).then(r => r.json())

const deleteQuote = id => fetch(QUOTES_URL + `/${id}`, { method: 'DELETE' })

const addQuote = quote =>
   fetch(QUOTES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
   }).then(r => r.ok)


// Initialise

getQuotes().then(showQuotes)

form.addEventListener('submit',(e) => {
   e.preventDefault()
   const quote = {
      quote: e.target.quote.value,
      likes: 0,
      author: e.target.author.value
   }
   addQuote(quote)
   showQuote(quote)
   form.reset()
})