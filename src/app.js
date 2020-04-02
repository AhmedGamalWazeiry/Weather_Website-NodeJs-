const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const PublicDirectroyPath = path.join(__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const PartialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',ViewsPath)
app.use(express.static(PublicDirectroyPath))
hbs.registerPartials(PartialsPath)
app.get('',(req,res)=>{
    res.render('index',{title:'Index',Name:'Jimmy'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About Me',Name:'AhmedGamal'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',Name:'AhmedGEmmy'})
})
app.get('/help/*',(req,res)=>{
    res.render('Error',{title:'404',errormasg:'Not foud help page',Name:'AhmedGamal'})
})
app.get('/products',(req,res)=>{
      if(!req.query.search){
          return res.send({
              error:'you must provide a search term'
          })
      }
      res.send({
          products:[]
      })
})
app.get('/weather',(req,res)=>{
    const cityName = req.query.address 
    if(!cityName){
        return res.send({
            error:'you must provide an address term'
        })
    }
    geocode(cityName,(error,{longitude,latitude}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude ,latitude,(error,forecastdata)=>{
           if(error){
               return res.send({error})
           }
           res.send({
            location:cityName ,
            forecast: forecastdata
        })
        })
    })
  
})
app.get('*',(req,res)=>{
    res.render('Error',{title:'404',errormasg:'Not foud page',Name:'AhmedGamal'})
})
app.listen(port,()=>{
    console.log('server on port ' + port)
})