import React, { FC } from 'react'
import { Container } from '@mui/material'
import Loader from './Loader'

const LoadingPage:FC = () => {
  return (
    <Container
        maxWidth={false}
        sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            alignContent:'center',
            height: '100vh',
            backgroundImage: 'url(/img/coming-soon.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
        <Loader />  
    </Container> 
  )
}

export default LoadingPage