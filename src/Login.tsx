import { FormEvent, useState } from 'react';
import getFormElement from './utils/getFormElement';

interface MyProps {
  setUser: Function
}

export default function Login(props: MyProps) {

  let setUser = props.setUser;
  let [profileImg, setProfileImg] = useState('');

  async function login(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const userName = getFormElement('login', 'userName').value;
    const password = getFormElement('login', 'password').value;
    const response = await (await fetch('/api/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password })
    })).json();
    if (response.error) { return;  /* no such user */ }
    setUser(response);
    setProfileImg(response.userFolder + '/userProfileImage.jpg');
  }

  return <>
    <h1>Login</h1>
    <form name="login" onSubmit={login}>
      <label>
        Användarnamn:<br />
        <input type="text" name="userName" />
      </label>
      <br />
      <label>
        Password:<br />
        <input type="password" name="password" />
      </label>
      <br />
      <input type="submit" value="Skicka" />
    </form>
    {profileImg === '' ? null : <img src={profileImg} />}
  </>;
}