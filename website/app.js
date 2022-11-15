/* Global Variables */

const { json } = require("body-parser");
const { Server } = require("http");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// API Key
const URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "095267cdbc63aff6740659d372b1e445";


const filldata = ()=>{
    const zipid = document.getElementById("zip").ariaValueNow;
    const feel = document.getElementById("feelings").ariaValueNow;
}

// Get the weather data

document.getElementById("generate").addEventListener("click",filldata);

GetweatherData(zipid).then((data)=>{
    if(data)
    {
        const {
            main: {temp},
            name : city,
            weather: [{description}],
        } = data;

        const info = {
            newDate,
            city,
            temp: math.round(temp),
            description,
            feelings,
        };
        postData(Server+"/add",info)
        updatingUI();
        document.getElementById('entry').style.opacity = 1;
    }
});

const GetweatherData=async(zipid)=>{
    try{
        const res = await fetch(URL+zipid+apiKey);
        const data = await res.json();

        return data;    
    }
    catch(error){
        console.log(error);
    }
}


// function for posting data

const postData = async(url="",info={})=>{
const res = await fetch(url ,{
    method:"post",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify(info),
});
try {
    const newData = await res.json();
    console.log('You just saved',newData)
    return newData;
}catch (error){
    console.log(error);
}
};


// showing the data 

const updatingUI = async ()=>{
    const res = await fetch(Server+"/all");
    try{
        const savedata = await res.json();

        document.getElementById("date").innerHTML = savedata.newData;
        document.getElementById("temp").innerHTML = savedata.temp +'&degC';
        document.getElementById("content").innerHTML =savedata.feelings;  
    }
    catch (error){
        console.log(error);
    }
};
