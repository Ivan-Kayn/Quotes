// waiting document loading
document.addEventListener('DOMContentLoaded', () => {
    // getting all elements from page
    const quoteContainer = document.querySelector('#quote-container');
    const quoteText = document.querySelector('#quote');
    const authorText = document.querySelector('#author');
    const twitterBtn = document.querySelector('#twitter');
    const newQuoteBtn = document.querySelector('#new-quote');
    const loader = document.querySelector('#loader');

    // using quotes api http://api.forismatic.com/api/1.0/
    async function getQuote() {
        showSpinner();
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

        try {

            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();

            // checking if author exists
            if (data.quoteAuthor === '') {
                authorText.innerText = 'Unknown';
            } else {
                authorText.innerText = data.quoteAuthor;
            }

            // changing font size for very long quotes
            if (data.quoteText.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }

            quoteText.innerText = data.quoteText;
            removeSpinner();
        } catch (e) {
            await getQuote(); // retry if quote has any problem
        }
    }

    // show loading
    function showSpinner() {
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

    // hide loading
    function removeSpinner() {
        if (!loader.hidden) {
            quoteContainer.hidden = false;
            loader.hidden = true;
        }
    }

    // tweet quote
    function tweetQuote() {
        const quote = quoteText.innerText;
        const author = authorText.innerText;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
    }

    // event listeners
    newQuoteBtn.addEventListener('click', getQuote);
    twitterBtn.addEventListener('click', tweetQuote);

    // on load
    getQuote();

})

