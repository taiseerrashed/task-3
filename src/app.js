const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const path = require("path")
const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');
const viewsDirectory = path.join(__dirname , "../temp1/views")
app.set("views" , viewsDirectory)

const hbs = require("hbs")
const partialsPath = path.join(__dirname, "../temp1/partials")
hbs.registerPartials(partialsPath)


app.get('/' , (req , res)=>{
    res.render('index' , {
        title: "Home",
        message: "Welcome to the weather app!"
    })
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

app.get('/weather' , (req , res)=>{
    res.render('weather' , {
        title: "Weather"
    })  
    if(!req.query.address){
        return res.send({
            error: " You must provide address"
        })
    }
    geocode(req.query.address , (error , data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude , data.longtitude , (error , data)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location : req.query.address,
                forecast : data
            })
        })
    })    
})







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})