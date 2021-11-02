import { rooms } from "src/services";

export const roomResolver = {
	Query: {
		rooms: () => rooms,
	},
};
