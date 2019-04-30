const QUOTES_URL = 'http://localhost:3000/quotes' 

const getQuotes = () => {
    return fetch(QUOTES_URL)
      .then(resp => resp.json())
 }

const createQuote = (quote) => 
    fetch(QUOTES_URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(quote)
    }).catch(err => {
        const modal = document.getElementById('modal');
        modal.classList.toggle("hidden");
        document.getElementById('modal-message').textContent = err;
        setTimeout(function() {
          modal.classList.toggle("hidden")
        }, 5000);
      });

const deleteQuote = (id) => {
    fetch(QUOTES_URL + `/${id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
}

const increaseLikes = quote => {
    fetch(QUOTES_URL + `/${quote.id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({likes :quote.likes})
  }).then(resp => resp.json()) 
}