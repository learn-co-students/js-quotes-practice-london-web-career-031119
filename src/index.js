// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const quoteList = document.querySelector('#quote-list')

const renderQuotes = function() {
  API.fetchQuotes().then(quotes => quotes.forEach(renderQuote))
}

const renderQuote = function(quote) {
  const quoteLi = document.createElement('li')
  quoteLi.className = "quote-card"

  const blockquote = document.createElement('blockquote')
  blockquote.className = "blockquote"
  quoteLi.append(blockquote)

  const quoteP = document.createElement('p')
  quoteP.className = "mb-0"
  quoteP.innerText = quote.quote
  blockquote.append(quoteP)

  const quoteFooter = document.createElement('footer')
  quoteFooter.className = "blockquote-footer"
  quoteFooter.innerText = quote.author
  blockquote.append(quoteFooter)

  const likeBtn = document.createElement('button')
  likeBtn.className = "btn-success"
  likeBtn.innerText = `Likes: ${quote.likes}`
  likeBtn.addEventListener('click', () => {
    quote.likes++
    API.updateQuote(quote)
      .then(likeBtn.innerText = `Likes: ${quote.likes}`)
  })
  blockquote.append(likeBtn)

  const editBtn = document.createElement('button')
  editBtn.className = "btn-warning"
  editBtn.innerText = `Edit`
  editBtn.addEventListener('click', () => {
    if (quoteLi.querySelector('form')) {
      quoteLi.querySelector('form').remove()
    } else {
      quoteLi.append(editForm(quote, quoteLi))
    }
  })
  blockquote.append(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.className = "btn-danger"
  deleteBtn.innerText = "Delete"
  deleteBtn.addEventListener('click', () => {
    API.deleteQuote(quote)
      .then(quoteLi.remove())
  })
  blockquote.append(deleteBtn)

  quoteList.append(quoteLi)
}

const editForm = function(quote, quoteCard) {
  const formEl = document.createElement('form')

  formEl.innerHTML = `
    <div class="form-group">
      <label for="new-quote">Edit Quote</label>
      <input name="quote" type="text" class="form-control" id="new-quote" value="${quote.quote}">
    </div>
    <div class="form-group">
      <label for="Author">Author</label>
      <input name="author" type="text" class="form-control" id="author" value="${quote.author}">
    </div>
  `
  const editSubmitBtn = document.createElement('button')
  editSubmitBtn.setAttribute("type", "submit")
  editSubmitBtn.className = "btn btn-primary"
  editSubmitBtn.innerText = ("Confirm changes")

  formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    
    quote.quote = formEl.quote.value,
    quote.author = formEl.author.value

    API.updateQuote(quote)
    
    quoteCard.querySelector(".mb-0").innerText = quote.quote
    quoteCard.querySelector(".blockquote-footer").innerText = quote.author
  })

  formEl.append(editSubmitBtn)

  return formEl      
}




window.addEventListener('DOMContentLoaded', renderQuotes())