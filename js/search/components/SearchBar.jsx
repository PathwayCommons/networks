import React from 'react';
import {Col, FormGroup, InputGroup, FormControl, Button, Modal, Glyphicon} from 'react-bootstrap';
import {SearchOptions} from './SearchOptions.jsx';
import {HelpTooltip} from './../../components/HelpTooltip.jsx';
import {SearchEngine} from './SearchEngine.jsx';

// SearchBar
// Prop Dependencies ::
// - query
// - updateSearchArg(updateObject)
// - help

// Note: Spread operator used to provide props to SearchOptions, therefore SearchBar also adopts SearchOptions dependencies in addition to those provided above
export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			q: this.props.query.q || "",
			showFilterMenu: false
		}
	}

	updateTerm() {
		if (this.state.q != this.props.query.q) {
			this.props.updateSearchArg({q: this.state.q, type: "Pathway"});
		}
	}

	submit(e) {
		if (e.which == 13) {
			this.updateTerm();
			e.target.blur();
		}
	}

	onChange(queryString) {
		this.setState({q: queryString});
	}

	toggleFilterMenu(state) {
		this.setState({
			showFilterMenu: state != null ? state : !this.state.showFilterMenu
		});
	}

	render() {
		return (
			<div className="SearchBar jumbotron clearfix">
				<Col xs={10} sm={11}>
					<FormGroup>
						<InputGroup>
							<SearchEngine placeholder="Search pathway by name, a list of gene names or type a URI" onChange={(e) => this.onChange(e)}/>
							<InputGroup.Button>
								<Button onClick={() => this.updateTerm()}>Search</Button>
							</InputGroup.Button>
						</InputGroup>
					</FormGroup>
					<HelpTooltip show={this.props.help} title="Search Bar">
						Enter a keyword, phrase, gene name or gene id. Separate multiple items by clicking "Enter" after each. Submit the query by clicking the "Search" button.
					</HelpTooltip>
				</Col>
				<Col xs={2} sm={1}>
					<Glyphicon glyph="cog" onClick={() => this.toggleFilterMenu(true)}/>
					<HelpTooltip show={this.props.help} title="Search Options" placement="left" positionTop="-110px" positionLeft="-280px">
						This menu provides a way to refine your search results. For example, filter the results by database or order by pathway size.
					</HelpTooltip>
				</Col>

				<Modal show={this.state.showFilterMenu} onHide={() => this.toggleFilterMenu(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Advanced Search</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<SearchOptions {...this.props}/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.toggleFilterMenu(false)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
