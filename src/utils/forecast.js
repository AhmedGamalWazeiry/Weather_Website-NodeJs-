const request = require('request')

const forecast = (latitude , longitude ,callback)=>{

    const url = 'https://api.darksky.net/forecast/72d74b0bff0e357b70ef0d611d0e1ff9/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable connection to server',undefined)
        }else if(body.error){
            callback('Unable to forecast',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +" it is currently degree out " + body.currently.temperature + " Degrees Out. Theres is a " +parseFloat(body.currently.precipProbability) +" chance of rain .")
        }
    })

}

module.exports = forecast