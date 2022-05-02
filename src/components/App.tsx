import React, { useState } from 'react';
import { User } from '../model/Model';
import { AuthService } from "../services/AuthService";
import { Login } from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import history from "../utils/history";
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Profile } from './Profile';
import { Spaces } from './spaces/Spaces';
import { DataService } from '../services/DataService';

interface AppState {
  user: User | undefined;
}

const App: React.FC<{}> = () => {
  const authService: AuthService = new AuthService();
  const dataService: DataService = new DataService();
  const [userObj, setUserObj] = useState<AppState>({
    user: undefined
  });

  const setUser = (user: User) => {
    setUserObj({ user });
    console.log(user);
  }

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <div>
          <Navbar user={userObj.user} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login
              authService={authService}
              setUser={setUser} />} />
            <Route path='/profile' 
                element={<Profile authService={authService} user={userObj.user}/>} />
            <Route path='/spaces'
              element={<Spaces dataService={dataService} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;