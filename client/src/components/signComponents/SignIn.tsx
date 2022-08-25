import React, { useContext, useState, useEffect } from 'react'
import SignInBG from '../animations/SignInBG'
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import Loader from '../Loader';
import { useHistory } from 'react-router-dom';
import NavbarDefault from '../navigation/NavbarDefault';

const SignIn = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    useEffect(() => {
        if(localStorage.getItem('token')) {
        store.checkAuth()
        }

    }, [])

    let history = useHistory();

    const handleSignIn = async () => {
        const signin = await store.signin(email, password)
        if (store.isAuth){
            const redirect = await history.push('/contacts')
        }
    };

    if (store.isAuth) {
        store.setLoading(true)
        const redirect = history.push('/contacts')
        store.setLoading(false)
    }
        



    return (
        <>
            <SignInBG />
            <NavbarDefault />
            <Container 
                sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    alignContent:'center',
                    height: '100vh'
                }}>
                {store.isLoading ? <Loader /> 
                :
                <Box 
                    component="form"
                    sx={{
                        display:'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems:'center',
                        alignContent:'center',
                        width: 450,
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '1rem',
                        backgroundColor: '#00000080',
                        color: '#ffffff',
                        
                    }}>
                    <Typography variant="h4" component="h4" align='center'>
                        Авторизация
                    </Typography>
                    <TextField
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        focused
                        variant="outlined"
                        label="Email"
                        color='info'
                        sx={{
                            margin: '1rem',
                        }}
                        />
                    <TextField
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        focused
                        variant="outlined"
                        label="Password"
                        color='info'
                        sx={{
                            margin: '1rem',
                        }}
                        />
                    <Button 
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={handleSignIn}
                        sx={{
                            marginBottom: '1rem',
                        }}
                    >
                        Войти
                    </Button>
                </Box>
                }
            </Container>
        </>
    )
}

export default observer(SignIn)