import log from 'src/config/logger';

type SessionMapKey = string;
type SessionMapValue = {
	user: User;
	connected: boolean;
};
export const sessions: Map<SessionMapKey, SessionMapValue> = new Map();

export interface SessionRepository {
	newSession: (id: SessionMapKey, session: SessionMapValue) => void;
	getSession: (id: SessionMapKey) => SessionMapValue;
	getAllSessions: () => SessionMapValue[];
}

export class InMemorySessionRepository implements SessionRepository {
	newSession = (id: SessionMapKey, session: SessionMapValue) => {
		log.info(
			`newSession| typeof id: ${typeof id},
			typeof session: ${typeof session},
			session: ${session} `,
		);
		log.info(`new session: ${id} saved`);
		sessions.set(id, session);
	};

	getSession = (id: SessionMapKey) => {
		return sessions.get(id);
	};

	getAllSessions = () => {
		return [...sessions.values()];
	};
}
