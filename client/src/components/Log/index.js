import React, {useState} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = () => {
        setSignUpModal(!signUpModal)
        setSignInModal(!signInModal)
    }
  return (
    <div className="connection-form">
        <div className="form-container">
            <ul>
                <li onClick={handleModals} className={signUpModal ? 'active-btn' : ""}>S'inscrire</li>
                <li onClick={handleModals} className={signInModal ? 'active-btn' : ""}>Se connecter</li>
            </ul>
            {signUpModal && <SignUpForm />}
            {signInModal && <SignInForm />}
        </div>
    </div>
  )
}

export default Log