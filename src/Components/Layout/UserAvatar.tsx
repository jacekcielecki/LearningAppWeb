import Avatar from '@mui/material/Avatar/Avatar'
import UserContext from '../../Contexts/UserContext';
import { useContext } from 'react';

function UserAvatar () {
  const userContext = useContext(UserContext);

  return (
    <div>
      <Avatar src={userContext.user?.profilePictureUrl} sx={{ width: 35, height: 35, marginLeft: 2 }} />
    </div>
  )
}

export default UserAvatar
