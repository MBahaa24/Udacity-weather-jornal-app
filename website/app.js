
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();


// API Key & URL
const URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=095267cdbc63aff6740659d372b1e445&units=metric";

const server = "http://127.0.0.1:4000";

const error = document.getElementById("error");

const filldata = ()=>{
    const zip = document.getElementById("zip").value;
    const feel = document.getElementById("feelings").value;
    GetweatherData(zip).then((data)=>{
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
                temp: Math.round(temp),
                description,
                feel,
            };
            postData(server+"/add",info)
            updatingUI();
            document.getElementById('entry').style.opacity = 1;
        }
    });

};
// Get the weather data

document.getElementById("generate").addEventListener("click",filldata);



const GetweatherData=async(zip)=>{
    try{
        const res = await fetch(URL+zip+apiKey);
        const data = await res.json();
        if(data.cod != 200)
        {
            throw `${data.message}`;
        }
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
    console.log(`You just saved`,newData)
    return newData;
}catch (error){
    console.log(error);
}
};


// updating The ui by the data

const updatingUI = async ()=>{
    const res = await fetch(server+"/all");
    try{
        const savedata = await res.json();

        document.getElementById("date").innerHTML = savedata.newDate;
        document.getElementById("temp").innerHTML = savedata.temp +'&degC';
        document.getElementById("content").innerHTML =savedata.description;
        document.getElementById("city").innerHTML = savedata.city;
        document.getElementById("feeling").innerHTML = savedata.feel; 
    }
    catch (error){
        console.log(error);
    }
};
