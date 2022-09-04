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
import { IFetchedUser } from '../../interfaces/IFetchedUser';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



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

  const [userInfo, setUserInfo] = React.useState(store.fetchedUsers)

  const handleChange = (selector:string, id:number, value: string) => {
    setUserInfo(prevState => {
      return prevState.map(item => {
        if (item.id === id) {
          if (selector === 'name') {
            item.name = value
            return item
          } else if (selector === 'phone') {
            item.phone = value
            return item
          } else if (selector === 'companyName') {
            item.company.name = value
            return item
          } else {
            item.company.catchPhrase = value
            return item
          }
        } else {
          return item
        }
      })
    })
  }

  const handleDelete = (id:number) => {
    setUserInfo(prevState => prevState.filter((item:IFetchedUser) => item.id !== id))
  }

  const handleAdd = () => {
    setUserInfo(prevState => {return [
      ...prevState,
      {
        id: prevState.length+1,
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: '',
            }
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: '',
    
        }
    }
    ]})
  }

  const sortedUsers = userInfo.filter(user => {
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
        <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
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
                <Avatar alt={item.name}>{item.name.split('')[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                primary={
                  <TextField 
                    id="outlined-basic"
                    value={item.name} 
                    label="Name"
                    variant="outlined"
                    sx={{
                      marginBottom:'1rem'
                    }}
                    onChange={(e) => {
                    handleChange('name', item.id, e.target.value)
                  }}
                  />}
                secondary={
                    <React.Fragment>
                    <TextField 
                      id="standard-basic"
                      value={item.phone} 
                      label="Phone"
                      variant="standard"
                      sx={{
                        marginRight:'1rem'
                      }}
                      onChange={(e) => {
                        handleChange('phone', item.id, e.target.value)
                      }}
                      />
                    <TextField 
                      id="standard-basic"
                      value={item.company.name} 
                      label="Company name"
                      variant="standard"
                      sx={{
                        marginRight:'1rem'
                      }}
                      onChange={(e) => handleChange('companyName', item.id, e.target.value)}
                      />
                    <TextField 
                      id="standard-basic"
                      value={item.company.catchPhrase} 
                      label="Company catch phrase"
                      variant="standard"
                      onChange={(e) => handleChange('companyCatchPhrase', item.id, e.target.value)}
                      />
                    </React.Fragment>
                }
                />
                </>
                <Button
                  color='error'
                  onClick={() => handleDelete(item.id)}
                >
                    <DeleteIcon />
                </Button>
            </ListItem>
            
            )
        })}
        <Button
            endIcon={<AddCircleOutlineIcon />}
            color='info'
            variant='contained'
            size='large'
            onClick={handleAdd}
            sx={{ margin: '1rem', fontSize: '2rem'}}
        >
            Add new user
        </Button>
        </List>
      </Main>
    </Box>
  );
}
export default observer(ContactsPage)