

document.addEventListener("DOMContentLoaded", () => {
    init();
  });

const init = () => {
   addEventListenertoForm()
   getQuotes()
      .then(data => renderQuotes(data))
}


 const renderQuote = (quote) => {
    const quoteList = document.getElementById('quote-list')
    const liEl = document.createElement('li')
    liEl.classList = 'quote-card'
    liEl.innerHTML = 
        `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>  
        `
   liEl.id = `${quote.id}`
    quoteList.appendChild(liEl)
    
   liEl.querySelector('.btn-danger').addEventListener('click', () => {
      liEl.remove()
      deleteQuote(quote.id)
      })

   liEl.querySelector('.btn-success').addEventListener('click', (e) => {
      e.target.firstElementChild.innerText = `${quote.likes++}`
      increaseLikes(quote)
      })
   
 }

 const renderQuotes = (quotes) => {
   quotes.forEach(quote => {
      renderQuote(quote)
   });
 }

const addEventListenertoForm = () => {
   const formEl = document.getElementById('new-quote-form')
   formEl.addEventListener ('submit', (e) => {
      e.preventDefault() 

      const quote = {
         quote: document.getElementById('new-quote').value,
         likes: 1,
         author: document.getElementById('author').value
      }
      createQuote(quote)
      renderQuote(quote)

      formEl.reset()
   })
}



// Clicking the like button will increase the number of likes for this particular comment in the database and on the page without having to refresh.