import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CharacterList from "./components/CharacterList";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={props => <CharacterList {...props} />} />
			<Route path="/:page" component={props => <CharacterList {...props} />} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
