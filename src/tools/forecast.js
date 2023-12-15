const request = require("request")
const forecast = (latitude , longtitude , callback) => {
    const url = "http://api.weatherapi.com/v1/current.json?key=61008bd95b5b4fb5b7f210156232211&q=" + latitude + "," + longtitude
    request({url , json : true} , (error , response)=>{
        
        if(error){
            callback("Unable to connect weather service" , undefined)
        }else if(response.body.error){
            callback(response.body.error.message , undefined)
        }else{
            callback(undefined , response.body.location.name + " It Is " + response.body.current.condition.text + 
            " And Temp is " + response.body.current.temp_c)
        }
    })
}
module.exports = forecast;