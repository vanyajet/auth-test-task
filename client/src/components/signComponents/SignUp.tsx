import React, { FC, useContext, useState } from 'react'
import SignInBG from '../animations/SignInBG'
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import Loader from '../Loader';
import NavbarDefault from '../navigation/NavbarDefault';
import { useHistory } from 'react-router-dom';

const SignUp:FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    let history = useHistory();
    
    const handleSignUp = async () => {
        store.setLoading(true)
        const signup = await store.signup(email, password)
        if (store.isAuth){
            const redirect = await history.push('/contacts')
        }
        store.setLoading(false)
    };

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
                    onKeyDown={(e:React.KeyboardEvent<HTMLFormElement>) => e.key === 'Enter' && handleSignUp()}
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
                        ??????????????????????
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
                        color='secondary'
                        size='large'
                        onClick={handleSignUp}
                        sx={{
                            marginTop: '1rem',
                        }}
                    >
                        ????????????????????????????????????
                    </Button>
                </Box>
                }
            </Container>
        </>
    )
}

export default observer(SignUp)