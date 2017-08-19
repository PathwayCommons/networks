import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

// SearchFaq
// Prop Dependencies ::
// none
export class SearchFaq extends React.Component {
	render() {
		var hostName = window.location.protocol + "//" + window.location.host + window.location.pathname;
		return (
			<div className="SearchFaq">
				<Panel header="Where can I ask a question or post a comment?">
					Please refer questions or comments to our <a href="https://groups.google.com/forum/#!forum/pathway-commons-help" target="_blank">Pathway Commons help Google group</a>.
				</Panel>
				<Panel header="How does the app get its data?">
					All data is retrieved using the <a href="http://www.pathwaycommons.org/pc2/" target="_blank">Pathway Commons web service API</a>.
				</Panel>
				<Panel header="How does it work?">
					<p>
						The app uses the <a href="http://www.pathwaycommons.org/pc2/">Pathway Commons web service API</a> which provides a BioPAX graph queries.
					</p>
					<p>
						By default, the app executes 'pathsbetween' graph query using a gene/chemical names/IDs list.
					</p>
				</Panel>
				<Panel header="How do I perform a more specific query?">
					'Filter' icon <Glyphicon
						glyph="filter"
						onClick={() => this.toggleFilterMenu(true)}/> provides access to an options menu to tailor your search. You may filter the results that are returned by data provider and/or restrict pathways containing a certain minimum or maximum number of participants. To remove filtering altogether, simply remove any entries for data sources and participants.
				</Panel>
				<Panel header="What types of identifiers or symbols will the app recognize?">
					The search app accepts a list of gene or chemical identifiers as input. The app recognizes names/IDs approved by:
					<ul>
						<li>
							<a href="http://www.genenames.org/" target="_blank">HUGO Gene Nomenclature Committee (HGNC)</a>
						</li>
						<li>
							<a href="http://www.uniprot.org/" target="_blank">UniProt</a>
						</li>
						<li>
							<a href="https://www.ebi.ac.uk/chebi/" target="_blank">Chemical Entities of Biological Interest (ChEBI)</a>
						</li>
						<li>
							<a href="https://www.ncbi.nlm.nih.gov/refseq/" target="_blank"> Reference Sequence (RefSeq)</a>
						</li>
					</ul>
				</Panel>
				<Panel header="How can I use the search or view in my web page?">
					<p>
						You have a few options here.
					</p>

					<dl>
						<dt>
							Formulate a URL with a search query
						</dt>
						<dd>
							Construct the following URL <code>{hostName + "#/search?q="}</code> where you supply the value of the query parameter <code>q</code>. For example, this could be the contents of a text form. Don't forget to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" target="_blank">encode</a> the contents.
						</dd>
						<br/>
					  <dt>
							Embedding a search box in an <a href="https://developer.mozilla.org/en/docs/Web/HTML/Element/iframe" target="_blank">iframe</a>
						</dt>
					  <dd>
							Use the following URL <code>{hostName + "#/search/embed"}</code>.
						</dd>
						<br/>
						<dt>
							Embedding a view in an iframe
						</dt>
					  <dd>
							Once you have viewed a pathway in the app, modify the URL to contain the path <code>/#/pathway/embed</code>.<br/>
							For example, if you used the app to view Reactome's 'Signaling by BMP' via the URL:
							<a href={hostName + "#/view?uri=NOG,BMP2"} target="_blank">{hostName + "#/view?uri=NOG,BMP2"}</a>,
							the corresponding embeddable URL would be <a href={hostName + "#/view/embed?uri=NOG,BMP2"} target="_blank">{hostName + "#/view"}<strong>{"/embed"}</strong>{"?uri=NOG,BMP2"}</a>.
						</dd>
					</dl>
				</Panel>
				<Panel header="Where is the source code for this web app?">
					This web app is an open source project <a href="https://github.com/PathwayCommons/networks">hosted on Github</a> where you can view instructions on how to download, build and run the project on your computer.
				</Panel>
			</div>
		);
	}
}
