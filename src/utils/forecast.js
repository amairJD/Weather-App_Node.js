import request from 'request'

const forecast = (address, callback) => {

    const geoUrl = "http://api.weatherstack.com/current?access_key=77fd0891054f5484fb92032673475a62&query="
                     + encodeURI(address);

    request({url:geoUrl, json: true}, (error, response) => {
        if (error){
            callback(error, undefined);
        } else if (response.body.error.code == 104) {
            callback("Monthly request's of 250 reached, please try again next month.", undefined);
        } else if (response.body.error){
            // TODO Enhance error response based on API error codes
            callback("Address does not exist.", undefined);
        } else {
            callback(undefined, {
                location : response.body.request.query,
                temp : response.body.current.temperature,
                /* precipitation: response.body.current.precip, */ // Weatherstack does not return accurate precipation data, always 0!
                description : response.body.current.weather_descriptions
            })
        }
    })
    
}

export default forecast;