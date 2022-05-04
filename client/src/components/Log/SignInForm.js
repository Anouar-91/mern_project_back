import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignInForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`, {
      email: email,
      password: password,
    },      { withCredentials: true })
    .then(function (res) {
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email
        passwordError.innerHTML = res.data.errors.password
      } else {
        window.location = "/";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <form onSubmit={handleLogin} id="sig-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input type="text" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  )
}

export default SignInForm