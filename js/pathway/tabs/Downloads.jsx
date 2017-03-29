import React from 'react';
import classNames from 'classnames';
import {Col, Button, Glyphicon} from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';
import {saveAs} from 'file-saver';
import {get} from 'pathway-commons';
import {DownloadCard} from './DownloadCard.jsx';
import {Spinner} from '../../components/Spinner.jsx';

// Downloads
// Prop Dependencies ::
// - name
// - uri
// - pathwayData
// - graphImage
export class Downloads extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	toggleLoading() {
		this.setState({loading: !this.state.loading});
	}

	initiatePCDownload(format, file_ext) {
		this.toggleLoading();
		get()
			.uri(this.props.uri)
			.format(format)
			.fetch()
			.then(content => this.saveDownload(file_ext, typeof content === "object" ? JSON.stringify(content) : content))
			.then(() => this.toggleLoading());
	}

	saveDownload(file_ext, content) {
		saveAs(new File([content], this.generatePathwayName() + "." + file_ext, {type: "text/plain;charset=utf-8"}));
	}

	generatePathwayName() {
		const FILENAME_CUTOFF = 20;
		var filename = this.props.name || "pathway";
		return filename.substr(0, filename.length < FILENAME_CUTOFF ? filename.length : FILENAME_CUTOFF).replace(/ /g, "_");
	}

	render() {
		return(
			<div className={classNames("Downloads", (this.props.hidden ? "hidden" : ""))}>
				<Spinner full hidden={!this.state.loading}/>
				<div className="downloadContainer clearfix">
					{/* All custom download links go below */}
					<DownloadCard name="Pathway Image" format="png" onClick={() => {
							// Allow 10ms for toggleloading to finish before calling graphImage or else toggleLoading does not work properly
							this.toggleLoading();
							setTimeout(() => this.props.graphImage(() => this.toggleLoading()), 10);
					}}>
						Dowloads an image of the entire pathway. If you wish to capture only a subsection of the pathway, use the 'Screencapture' link on the top left of the main viewer.
						<br/>
						Format: PNG
					</DownloadCard>
					<DownloadCard name="Gene Set Database" format="gmt" onClick={() => {this.initiatePCDownload("GSEA", "gmt")}}>
						Database of pathway and gene names (Uniprot)
						<br/>
						Format: <a target="_blank" href="http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#GMT:_Gene_Matrix_Transposed_file_format_.28.2A.gmt.29">Tab-delimited text</a>
						<br/>
						<ul>
							<li>Perform enrichment analysis using GSEA.</li>
						</ul>
					</DownloadCard>
					<DownloadCard name="Simple Interaction Format" format="sif" onClick={() => {this.initiatePCDownload("BINARY_SIF", "sif")}}>
						Simplified description of pathway as a list of interaction pairs.
						<br/>
						Format: <a target="_blank" href="http://wiki.cytoscape.org/Cytoscape_User_Manual/Network_Formats">Tab-delimited text</a>
						<br/>
						<ul>
							<li>View, style and edit using the Cytoscape desktop software.</li>
							<li>Analyze using graph algorithms.</li>
						</ul>
					</DownloadCard>
				</div>
			</div>
		);
	}
}
