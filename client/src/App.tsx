import React, { FC, } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';

const SignIn = React.lazy(() => import('./components/signComponents/SignIn'))
const SignUp = React.lazy(() => import('./components/signComponents/SignUp'))
const ContactsPage = React.lazy(() => import('./components/contacts/ContactPage'))
const Default = React.lazy(() => import('./components/Default'))  

const App:FC = () => {
  

  return (
    <>
      <Switch>
        <Route exact path='/'> <React.Suspense fallback={<LoadingPage/>}> <SignIn /> </React.Suspense> </Route>
        <Route path='/signin'> <React.Suspense fallback={<LoadingPage/>}> <SignIn /> </React.Suspense> </Route>
        <Route path='/signup'> <React.Suspense fallback={<LoadingPage/>}> <SignUp /> </React.Suspense> </Route>
        <Route path='/contacts'> <React.Suspense fallback={<LoadingPage/>}> <ContactsPage /> </React.Suspense> </Route>
        <Route> <React.Suspense fallback={<LoadingPage/>}> <Default /> </React.Suspense> </Route>
        
      </Switch>
      

    </>
  );
}


export default App;
