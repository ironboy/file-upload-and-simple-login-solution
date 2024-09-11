import fileToBase64 from './utils/fileToBase64';
import getFormElement from './utils/getFormElement';
import { FormEvent } from 'react';


export default function Register() {

  async function uploadImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // do not reload the page!
    let encoded = (await fileToBase64(getFormElement('register', 'imgFile'))) as string;
    let userName = getFormElement('register', 'userName').value;
    let password = getFormElement('register', 'password').value;
    await fetch('/api/uploadImage', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password, encoded })
    });
  }

  return <>
    <h1>Register</h1>
    <form name="register" onSubmit={uploadImage}>
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
      <label>
        Profilbild:<br />
        <input name="imgFile" type="file" accept=".jpg" />
      </label>
      <br />
      <input type="submit" value="Skicka" />
    </form>
  </>;
}