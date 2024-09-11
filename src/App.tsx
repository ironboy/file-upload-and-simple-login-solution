import { useState } from 'react'
import Register from './Register';
import Login from './Login';

export default function App() {

  let [componentToShow, setComponentToShow] = useState('');
  let [_user, setUser] = useState(null);

  return <>
    <button onClick={() => setComponentToShow('Register')}>Register</button>
    <button onClick={() => setComponentToShow('Login')}>Login</button>
    {componentToShow === 'Register' ? <Register /> : null}
    {componentToShow === 'Login' ? <Login {...{ setUser }} /> : null}
  </>

}