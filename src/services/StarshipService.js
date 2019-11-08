import axios from "axios";

export default class CharacterService {
	search = url => axios.get(url);
}
