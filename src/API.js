class API {
  static QUOTES_URL = "http://localhost:3000/quotes"
  
  static fetchQuotes() {
    return fetch(this.QUOTES_URL)
      .then(resp => resp.json())
  }

  static updateQuote(quote) {
    return fetch(this.QUOTES_URL + `/${quote.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
    }).then(resp => resp.json())
  }

  static deleteQuote(quote) {
    return fetch(this.QUOTES_URL + `/${quote.id}`, {
      method: 'DELETE',
    }).then(resp => resp.json())
  }

  
}