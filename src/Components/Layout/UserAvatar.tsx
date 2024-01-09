import Avatar from '@mui/material/Avatar/Avatar'
import avatarImageUrl from '../../Assets/Images/placeHolderAvatar.jpg';
import React from 'react'

function UserAvatar() {
  return (
    <div>
      <Avatar alt="User avatar" src={avatarImageUrl} sx={{ width: 35, height: 35, marginLeft: 2 }} />
    </div>
  )
}

export default UserAvatar
