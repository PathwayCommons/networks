var fetch = require('fetch-ponyfill')().fetch;
import {utilities} from 'pathway-commons';

var checkList = [
	"uniprot",
	"chebi",
	"smpdb",
	"refseq"
];


// var hgncUrl = "http://www.genenames.org/cgi-bin/download?col=gd_app_sym&col=gd_prev_sym&status=Approved&status_opt=2&where=&order_by=gd_app_sym_sort&format=text&limit=&submit=submit"; // URL of hgncSymbols.txt data

let parseFile = text => {
	let i = text.indexOf("\n") + 1; // Get index of first newline
	let textNoHeader = text.substr(i).toUpperCase();
	return textNoHeader
	.split(/[\s,]+/) // Split file string by whitespace (spaces, tabs, newlines) and commas
	.filter(symbol => symbol) // Check for and remove any empty strings
};

let getHGNCData = fetch("hgncSymbols.txt", {method: 'get', mode: 'no-cors'})
	.then(res => res.text())
	.then(parseFile)
	.then(dataArray => new Set(dataArray));

let tokenPrefix = ( phrase, collection ) => {
	return phrase
		.split(/\s+/g)
		.filter((token) => {// exclude any whitespace-separated tokens that are NOT gene symbols
            // regex checks
			let isSymbol = checkList.some( ds => utilities.sourceCheck( ds, token ) );
			// more expensive HGNC check
			if(!isSymbol) {
				isSymbol = collection.has( token.toUpperCase() );
			}
			return isSymbol;
		});
};

export let queryProcessing = (query, failureCount = 0) => {
	// Check q to ensure it contains a valid value otherwise return q
	if(typeof query.q === "string" && query.q.length) {
		var words = query.q.trim();
	}
	else {
		return Promise.resolve(query.q);
	}

	if( failureCount === 0 ) {
		//filter out non-gene-symbols; then, join the gene symbols with commas
		return getHGNCData
			.then( tokenPrefix.bind( null, words ) ) //implicit Promise result
			.then( result => result.join(",") );
	} else {
		 // conclude no results available and return null
		return Promise.resolve(null);
	}
};
