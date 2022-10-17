import mongoose, { Schema } from 'mongoose'


const userSchema = Schema({
  nom: {
    type: String,
    // required: true,
    trim: true // Pour supprimer les caractères invisibles commes les espaces, etc...
  },
  prenom: {
    type: String,
    // required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Conversion de l'email en minuscule
  },

  haveWallet: {
    type: Boolean, 
    default: false
  }, 
  
  telephone: {
    type: String,
    // required: true,
    //minLenght: 10
  },
  password: {
    type: String,
    // required: true,
  },

  adresses: [{
    streetAdress: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
   
  }],
  
  passwordResetCode: String,
  passwordResetExpiration: Date,
  lastPurchase: Date,
},{timestamps: true})


export default module = mongoose.model('User', userSchema)
