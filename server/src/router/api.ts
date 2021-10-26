import express from 'express';
import colors from 'colors';
import * as API from '../controllers/api';

const router = express.Router();

router.post('/generate-token', (req, res) => {
	const body = JSON.parse(req.body);
	console.log(colors.rainbow('/api/generate-token req.body: '), body);
	if (!body.name) {
		return res.send({ status: false });
	} else {
		const user: User = {
			id: API.generateRandomId(),
			name: body.name,
			username: body.username ? body.username : body.name,
			currentRoomname: '',
			roomHistory: [] as string[],
			avatar: API.generateRandomAvatar(),
			geo: {
				lat: '',
				lng: '',
			},
		};
		return res.send({ status: true, jwt: API.createToken(user) });
	}
});

export default router;
