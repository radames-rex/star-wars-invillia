import React, { PureComponent } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faJediOrder } from "@fortawesome/free-brands-svg-icons";

import "./styles.scss";

export default class Page extends PureComponent {
	handleClose = () => {
		window.close();
	};

	render() {
		const { children } = this.props;
		return (
			<div className="page">
				<AppBar position="static">
					<Toolbar className="pageToolbar">
						<IconButton
							edge="start"
							className="pageMenuButton"
							color="inherit"
							aria-label="menu"
						>
							<FontAwesomeIcon icon={faJediOrder} />
						</IconButton>
						<Typography variant="h6" className="pageTitle">
							Star Wars | Invillia
						</Typography>
						<Button color="inherit" onClick={this.handleClose}>
							<FontAwesomeIcon icon={faPowerOff} />
						</Button>
					</Toolbar>
				</AppBar>
				<div className="pageContent">{children}</div>
			</div>
		);
	}
}
