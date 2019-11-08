import React, { PureComponent } from "react";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import CharacterService from "../../services/CharacterService";
import CharacterItem from "../CharacterItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default class CharacterList extends PureComponent {
	state = {
		page: {
			results: []
		},
		itemsPerPage: 10,
		currentPage: 1,
		loading: false
	};

	get characterService() {
		if (!this._characterService) {
			this._characterService = new CharacterService();
		}
		return this._characterService;
	}

	findPage = url => {
		if (!!url) {
			url = url.split("page=");
			return url[1];
		} else {
			return null;
		}
	};

	request = async () => {
		const { match: { params } = {} } = this.props;

		try {
			this.setState({ loading: true });
			const { data } = await this.characterService.index(params.page);
			this.setState({
				page: {
					...data,
					previousValue: this.findPage(data.previous),
					nextValue: this.findPage(data.next)
				},
				loading: false
			});
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	componentDidMount = () => {
		this.request();
	};

	componentDidUpdate = prevProps => {
		const { match: { params } = {} } = this.props;
		const { match: { params: paramsPrev } = {} } = prevProps;
		if (params.page !== paramsPrev.page) {
			this.request();
		}
	};

	render() {
		const { page, loading } = this.state;

		return (
			<>
				{loading ? (
					<CircularProgress />
				) : (
					<Grid container spacing={2}>
						{page.results.map((char, index) => (
							<Grid item xs={4} key={index}>
								<CharacterItem char={char} />
							</Grid>
						))}
						<Grid
							item
							xs={12}
							key={11}
							style={{ display: "flex", justifyContent: "center" }}
						>
							{!!page.previous && (
								<Link to={`/${page.previousValue}`}>
									<Button variant="outlined">
										<FontAwesomeIcon icon={faCaretLeft} />
										Anterior
									</Button>
								</Link>
							)}
							{!!page.next && (
								<Link to={`/${page.nextValue}`}>
									<Button variant="outlined">
										Próxima
										<FontAwesomeIcon icon={faCaretRight} />
									</Button>
								</Link>
							)}
						</Grid>
					</Grid>
				)}
			</>
		);
	}
}
