import express from 'express'
import hbs from 'hbs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import forecast from './utils/forecast.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "../templates/views"))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.static(path.join(__dirname, "../public/IMG")))

hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
  
    if(!req.query.address){
        return res.send({ error: 'You must provide an address.' })
    }

    forecast(req.query.address, (error, {location, temp, description} = {}) => {
        if (error) {
            res.send({ forecast: error })
        } else {
            const forecastDescrip = "It is " + temp  + "C in " + location + ". " + description + ".";
            res.send({ forecast: forecastDescrip })
        } 
    })

})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('*', (req, res) =>{
    res.render('404', { errorMSG: "404 can't find page" })
})

app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})