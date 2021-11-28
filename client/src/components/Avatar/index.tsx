import BasicAvatar from './Avatar';
import EditableAvatar from './Editable';

const Avatar: React.FC<AvatarProps> = ({ avatar, userUpdateHandler }) => {
	if (!userUpdateHandler) return <BasicAvatar avatar={avatar} />;
	return (
		<EditableAvatar avatar={avatar} userUpdateHandler={userUpdateHandler} />
	);
};
export default Avatar;
