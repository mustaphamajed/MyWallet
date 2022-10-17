import express from 'express'
import mongoose from 'mongoose'
import Config from './config/config.js'
import apiRouter from './routes/router.js'


const {DB, ENV} = Config

// Connexion à la base de données 
mongoose.connect(DB.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })


// Initialisation du serveur http
const app = express()


// Parseur du body pour les requêtes
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Utilise v1 comme prefix pour l'API
app.use('/v1', apiRouter);




app.listen(process.env.PORT, () => {
    console.log(`Listening `)
  })