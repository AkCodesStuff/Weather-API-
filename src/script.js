const  cityInputName=document.getElementById("cityName");
const Output=document.getElementById("weatherCard");
const WeatherForm=document.getElementById("WeatherForm");
const weatheAPI="22549bfdb1bfe82a5af5919056c780c3";
const err=document.getElementById("error");
const icon=document.getElementById("icon");
const temperature=document.getElementById("temp");
const outHumidity=document.getElementById("Humidity");
const condition=document.getElementById("condition");
const CityOutput=document.getElementById("city");



WeatherForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const city=cityInputName.value;
    if(city){
        Error("");
        try{
            const data= await getWeatherData(city);
            displayWeather(data);
        }
        catch(error){
            giveError(error);
        }
    }
    else{
        giveError("Please Enter a city");
    }
})
async function getWeatherData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatheAPI}`;
    const output=await fetch(apiURL);
    if(!output.ok){
        throw new Error("Could not fetch the data");
        
    }
    return await output.json();
    
}
function displayWeather(data){
    console.log(data);
    const {name,city,main:{temp , pressure,humidity}, weather:[{description,id}]}=data;
    const emote= displayEmoji(id);
    console.log(emote);
    icon.textContent=emote;
    CityOutput.textContent=name;
    temperature.textContent=`${(temp-273).toFixed(2)}C`;
    outHumidity.textContent=`Humiditiy: ${humidity}%`;
    condition.textContent=description;

}
function displayEmoji(id){
    switch(true){
        case (id>=200 && id< 300):
            return "⛈️";
        case (id>=300 && id<500):
            return "🌦️";
        case (id>=500 && id<600):
            return "🌧️";
        case (id>=600 && id<700):
            return "☃️";
        case (id==800):
            return "☀️";
        case(id>800):
        return "☁️";
    }

}
function giveError(msg){
    err.textContent=msg;
    
}