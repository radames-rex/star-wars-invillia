import api from "./api";

export default class CharacterService {
	index = (page = 1) => api.get(`people/?page=${page}`);
	show = id => api.get(`people/${id}`);
}
