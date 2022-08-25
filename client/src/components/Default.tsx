import React, { FC } from 'react'
import { Box, Container, Typography } from '@mui/material'
import SignInBG from './animations/SignInBG'
import NavbarDefault from './navigation/NavbarDefault'

const Default:FC = () => {
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
                
                <Box 
                    component="form"
                    sx={{
                        display:'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems:'center',
                        alignContent:'center',
                        width: 'fit-content',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '1rem',
                        backgroundColor: '#00000080',
                        color: '#ffffff',
                        
                    }}>

                    <Typography variant="h2" component="h2" align='center'>
                        Извините, такой страницы не найдено
                    </Typography>
                </Box>
            </Container>
        </>
  )
}

export default Default