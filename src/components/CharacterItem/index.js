import React, { PureComponent } from "react";
import {
	Card,
	CardMedia,
	Typography,
	Button,
	IconButton,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	CircularProgress,
	Avatar
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaceShuttle, faTimes } from "@fortawesome/free-solid-svg-icons";

import StarshipService from "../../services/StarshipService";
import { pictures } from "../../utils/Constants";
import "./styles.scss";

const Square = ({ color = "unknown" }) => {
	color = color.split(",");
	return <div className="square" style={{ background: color[0] }} />;
};

class CharacterItem extends PureComponent {
	state = {
		open: false,
		char: {}
	};

	get starshipService() {
		if (!this._starshipService) {
			this._starshipService = new StarshipService();
		}
		return this._starshipService;
	}

	addInfoToChar = async () => {
		const { char } = this.props;

		let id = char.url.split("/");
		id = id[5];

		const character = {
			...char,
			id: id,
			picture: pictures.CHARACTERS + id + ".jpg"
		};

		this.setState({ char: character });
	};

	request = async char => {
		let spaceships = [];

		const starships = char.starships.map(async starship => {
			const { data } = await this.starshipService.search(starship);
			let starshipId = data.url.split("/");
			starshipId = starshipId[5];
			spaceships.push({
				...data,
				picture: pictures.STARSHIPS + starshipId + ".jpg"
			});
			return {
				...data,
				picture: pictures.STARSHIPS + starshipId + ".jpg"
			};
		});

		return Promise.all(starships);
	};

	requestSpaceships = async () => {
		const { char } = this.state;
		this.setState({ loading: true });

		if (!char.spaceships) {
			this.setState({
				char: {
					...char,
					spaceships: await this.request(char)
				},
				open: true, loading: false
			});
		} else {
			this.setState({ open: true, loading: false });
		}
	};

	componentDidMount = () => {
		this.addInfoToChar();
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { char, open, loading } = this.state;

		return (
			<Card className="characterItem">
				<CardMedia
					className="characterItemPicture"
					image={char.picture}
					title="Live from space album cover"
				/>
				<div className="characterItemDetails">
					<span>
						<Typography variant="h6">Nome: {char.name}</Typography>
					</span>
					<span>
						<Typography variant="subtitle1">Gênero: {char.gender}</Typography>
					</span>
					<span>
						<Typography variant="subtitle2">
							Ano de Nascimento: {char.birth_year}
						</Typography>
					</span>
					<div className="colors">
						<span>
							<Typography variant="subtitle2">Cor dos olhos: </Typography>
						</span>
						<Square color={char.eye_color} />
					</div>
					<div className="colors">
						<span>
							<Typography variant="subtitle2">Cor do cabelo: </Typography>
						</span>
						<Square color={char.hair_color} />
					</div>
					<div className="colors">
						<span>
							<Typography variant="subtitle2">Cor da pele: </Typography>
						</span>
						<Square color={char.skin_color} />
					</div>
					<Button
						variant="contained"
						onClick={() => this.requestSpaceships()}
						color="primary"
						className="spaceshipsButton"
					>
						{!loading ? (
							<>
								<FontAwesomeIcon icon={faSpaceShuttle} /> Espaçonaves
							</>
						) : (
							<CircularProgress color="secondary" size={24} />
						)}
					</Button>
					<Dialog onClose={this.handleClose} maxWidth="xl" open={open}>
						<DialogTitle onClose={this.handleClose}>
							<Typography variant="h6">Espaçonaves de {char.name}:</Typography>
							<IconButton
								aria-label="close"
								className="closeButton"
								onClick={this.handleClose}
							>
								<FontAwesomeIcon icon={faTimes} />
							</IconButton>
						</DialogTitle>
						<DialogContent dividers>
							<Grid container spacing={2}>
								{!!char.spaceships &&
									char.spaceships.map((spaceship, index) => (
										<Grid item xs={4} key={index}>
											<Avatar src={spaceship.picture} />
											<Typography variant="subtitle2">
												{spaceship.name}
											</Typography>
										</Grid>
									))}
							</Grid>
						</DialogContent>
					</Dialog>
				</div>
			</Card>
		);
	}
}

export default CharacterItem;
