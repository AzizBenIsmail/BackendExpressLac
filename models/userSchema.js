const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    email : {type : String , required : true , unique : true , lowercase : true , match : [ /@/ , 'Please fill a valid email address']},
    password : {type :String , required : true , minlength : 6 , match : [ /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.']},
    image_User : {type : String , default : 'client.png'},
    role : {type : String , enum : ['admin' , 'client'] , default : 'client'},
    age: Number,
    Status : Boolean,
    Ban : Boolean,
    //car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }, //One
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }], //Many
    //client
    NumTel : Number,
    Adresse : String,

    //Admin
    adminCode : String,

    //professor
    //students : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] //Many


}, {timestamps : true});

// Hash the password before saving the user

userSchema.pre('save', async function(next) {
try {
    const User = this;
    const salt = await bcrypt.genSalt();
    User.password =  await bcrypt.hash(User.password , salt);
    User.Status = false;

    next();
} catch (error) {
    next(error);
}
})

userSchema.post('save', function(doc, next) {
    console.log('New user created: ', doc);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


const User = mongoose.model('User', userSchema);
module.exports = User;