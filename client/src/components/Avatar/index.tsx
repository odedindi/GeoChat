import BasicAvatar from './Avatar';
import EditableAvatar from './Editable';

const Avatar: React.FC<AvatarProps> = ({ avatar, updateHandler }) => {
	if (!updateHandler) return <BasicAvatar avatar={avatar} />;
	return <EditableAvatar avatar={avatar} updateHandler={updateHandler} />;
};
export default Avatar;
