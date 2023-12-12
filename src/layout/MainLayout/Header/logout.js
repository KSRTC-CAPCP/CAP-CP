import { Avatar, Box, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconPower } from '@tabler/icons';
import React from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logout');
    localStorage.removeItem('userData');
    navigate('/');
  };
  return (
    <div>
      <Box
        sx={{
          ml: 2,
          mr: 2,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            aria-haspopup="true"
            onClick={handleLogout}
            color="inherit"
          >
            <IconPower stroke={2} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Logout;
