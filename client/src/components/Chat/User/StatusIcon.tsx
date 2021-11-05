import { ConnectedIcon, Icon } from './styles';

const StatusIcon: React.FC<{ connected: boolean }> = (connected) =>
	connected ? <Icon /> : <ConnectedIcon />;
export default StatusIcon;
