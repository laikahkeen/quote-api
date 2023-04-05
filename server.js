const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
	const randomQuote = {
		quote: getRandomElement(quotes),
	};
	res.send(randomQuote).status(200);
});

app.get('/api/quotes', (req, res, next) => {
	let returnQuote;
	if (!req.query.name) {
		returnQuote = { quotes: quotes };
	} else {
		returnQuote = { quotes: quotes.filter((quote) => quote.person === req.query.name) };
	}
	res.send(returnQuote).status(200);
});

app.post('/api/quotes', (req, res, next) => {
	let { person, quote } = req.query;
	if (!person || !quote) {
		res.send().status(400);
	} else {
		let newQuote = { person: person, quote: quote };
		quotes.push(newQuote);
		res.send({ quote: newQuote });
	}
});

app.put('/api/quotes', (req, res, next) => {
	let { id, quote } = req.query;
	if (!id || !quote) {
		res.send().status(404);
	} else {
		quotes[id] = { ...quotes[id], quote: quote };
		res.send({ quote: quotes[id] });
	}
});

app.delete('/api/quotes', (req, res, next) => {
	let { id } = req.params;
	if (!id) {
		res.send().status(404);
	} else {
		quotes = quotes.filter((quote, index) => index !== parseInt(id));
		res.send();
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
