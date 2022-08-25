import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../..';

const NavbarDefault:React.FC = () => {

  const {store} = React.useContext(Context)

  let history = useHistory();

  const handleSignOut = async () => {
      const signin = await store.signout()
      const redirect = await history.push('/signin')
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'flex-end', marginRight: '1rem', marginLeft: '1rem', marginTop: '1rem' }}>
      <Button 
            variant='contained'
            color='warning'
            size='large'
            onClick={handleSignOut}
            sx={{ minWidth: 100 }}>
                Выйти
        </Button>
        <Button 
            component={Link} to='/signin'
            variant='contained'
            color='primary'
            size='large'
            sx={{ minWidth: 100, marginLeft: '1rem' }}>
                Войти
        </Button>
        <Button 
            component={Link} to='/signup'
            variant='contained'
            color='secondary'
            size='large'
            sx={{ minWidth: 100, marginLeft: '1rem' }}>
                Зарегестрироваться
        </Button>
      </Box>
    </React.Fragment>
  );
}
export default NavbarDefault
