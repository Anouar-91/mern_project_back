const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    pseudo: {
        type: String,
        required:true,
        minlength: 3, 
        maxlength:55, 
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate:[isEmail],
        lowercase:true,        
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
    },
    picture:{
        type:String,
        default:"./uploads/profil/random-user.png"
    },
    bio:{
        type:String,
        max:1024
    },
    followers: {
        type:[String],
    },
    following:{
        type:[String],
    },
    likes: {
        type:[String],
    }
}, {
    timestamps:true
}
);

//play function before save into db to allow crypt password
// le next veut dire quand t'a fini passe à la suite
UserSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//c'est ce qui va nous permettre de comparer le password crypté de notre user en base de données avec celui utilise pdt le login d'un user
UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email: email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        else{
            throw Error('Incorrect password');
        }
    }
    throw Error('Incorrect password');
}
let User = mongoose.model('User', UserSchema);
module.exports = User;