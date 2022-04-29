export const signUpErrors = (err) => {
    let errors = {pseudo: '', email: '', password: ''}
    
    if(err.message.includes('pseudo')){
        errors.pseudo = "Pseudo incorrect"
    }
    if(err.message.includes('email')){
        errors.email = "Email incorrect"
    }
    if(err.message.includes('password')){
        errors.password = "Password incorrect ! Password must be at least 6 characters"
    }
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')){
        errors.pseudo = "Pseudo already use"
    }
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = "Email already use"
    }

    return errors
}

export const signInErrors = (err) => {
    let errors = { email: '', password: '', err}
    if(err.message.includes('email')){
        errors.email = "Email inconnu"
    }
    if(err.message.includes('password')){
        errors.password = "Password incorrect ! Mot de passe ne correspond pas."
    }
    return errors
}