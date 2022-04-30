import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const pseudoError = document.querySelector('.pseudo.error');
    const confirmPasswordError = document.querySelector('.confirm-password.error');
    const termError = document.querySelector('.terms.error');
    const terms = document.getElementById("terms")
    confirmPasswordError.innerHTML = "";
    termError.innerHTML = ''

    if(password != controlPassword){
      confirmPasswordError.innerHTML = "Vous n'avez pas correctement confirmé votre mot de passe ! "
    }
    if(!terms.checked){
      termError.innerHTML = "Vous devez acceptez les conditions générales !"
    }
    if(terms.checked && password == controlPassword){
      await axios.post(`${process.env.REACT_APP_API_URL}api/user/register`, {
        email,
        pseudo,
        password,
      },      { withCredentials: true })
      .then(function (res) {
        console.log(res)
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password
          pseudoError.innerHTML = res.data.errors.pseudo
        } else {
          setFormSubmit(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  }
  return (
    <>
    {formSubmit ? 
    (<>
    <SignInForm/>
    <h4>Enregistrement réussi, veuillez-vous connecter</h4>
    </> ) :  
(<form onSubmit={handleRegister}  id="sign-up-form">
<label htmlFor="pseudo">Pseudo</label>
<br />
<input type="text" name="pseudo" id="pseudo" value={pseudo} onChange={e => { setPseudo(e.target.value) }} />
<div className="pseudo error"></div>
<br />
<label htmlFor="email">Email</label>
<br />
<input type="email" name="email" id="email" value={email} onChange={e => { setEmail(e.target.value) }} />
<div className="email error"></div>
<br />
<label htmlFor="password">Mot de passe</label>
<br />
<input type="password" name="password" id="password" value={password} onChange={e => { setPassword(e.target.value) }} />
<div className="password error"></div>

<br />
<label htmlFor="confirm-password">Confirmation mot de passe</label>
<br />
<input type="password" name="confirm-password" id="confirm-password" value={controlPassword} onChange={e => { setControlPassword(e.target.value) }} />
<div className="confirm-password error"></div>
<br />
<input type="checkbox" id="terms" />
<label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
<div className="terms error"></div>
<input type="submit" value='Valider inscription' />
</form>
    ) }
     
    </>
   
  )
}

export default SignUpForm