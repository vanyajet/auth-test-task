import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, List, TextField, OutlinedInput, InputAdornment } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { Context } from '../..';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import SearchIcon from '@mui/icons-material/Search';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  }),
)

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const ContactsPage:React.FC = () => {

  const {store} = React.useContext(Context)

  let history = useHistory();

  if (!store.isAuth) {
    const redirect = history.push('/signin')
  }

  React.useEffect(() => {
        store.fetchUsers()
    }, [])

  const handleSignOut = async () => {
      const signin = await store.signout()
      const redirect = await history.push('/signin')
  };

  const theme = useTheme();

  const [searchValue, setSearchValue] = React.useState('')

  const sortedUsers = store.fetchedUsers.filter(user => {
    return user.name.toLowerCase().includes(searchValue.toLowerCase())
  })



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}} >
          <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center'}}>
            Контакты
          </Typography>
          <Button 
            variant='contained'
            color='primary'
            size='large'
            startIcon={<Logout/>}
            onClick={handleSignOut}
            >
            Выйти из профиля
        </Button>
        </Toolbar>
      </AppBar>
      <Main>
        <div style={{ display:'flex', flexDirection: 'column' }}>
        <Typography variant='h4' sx={{ marginTop: '4rem'}}>
          Список Контактов
        </Typography>
        <OutlinedInput
            onChange={(event) => setSearchValue(event.target.value)}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            placeholder="Поиск"
            sx={{marginTop:'1rem'}}
        />
        </div>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {sortedUsers.map(item => {
            return (
            <ListItem 
                key={item.id}
                sx={{
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <>
                <ListItemAvatar>
                <Avatar alt={item.name}>{item.username.split('')[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                primary={item.name}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {item.phone}
                    </Typography>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {item.company.name}
                    </Typography>
                    {` — ${item.company.catchPhrase}`}
                    </React.Fragment>
                }
                />
                </>
                <Button
                    color='error'
                    onClick={() => store.deleteUser(item.id)}
                >
                    <DeleteIcon />
                </Button>
            </ListItem>
            
            )
        })}
      
        </List>
      </Main>
    </Box>
  );
}
export default observer(ContactsPage)