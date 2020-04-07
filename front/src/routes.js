import React, {useState} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';


 
 import SignUp from './pages/signUp/SignUP'
import SignIn from './pages/signIn/SingIn'
import Incomes from './pages/incomes/incomes'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Expenses from './pages/expenses/expenses'
import Saving from './pages/Saving_goal/Saving_goal'
import Report from './pages/reports/reports'


const Routes = () => {

    const initialLoggedIn = localStorage.getItem('email') && localStorage.getItem('password')
    const [login, setLogin] = useState(initialLoggedIn);


    return (
        <BrowserRouter>
            {
                !login ? <Header/> : ''
            }


            <Switch>

                <Route exact path="/" component={Home}/>
                <Route path="/incomes" component={Incomes}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/signIn' render={(props) => {
                    return <SignIn {...props} setLogin={setLogin}/>
                }}/>
                <Route path='/expenses' component={Expenses}/>
                <Route path='/saving_goal' component={Saving}/>
                <Route path='/reports' component={Report}/>
            </Switch>
            {
                !login ? <Footer/> : ''
            }


        </BrowserRouter>

    )
}

export default Routes;