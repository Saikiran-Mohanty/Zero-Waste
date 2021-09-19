// ===================Login Popup=======================

const loginPopup = document.querySelector(".login-popup");
const close = document.querySelector(".close");


window.addEventListener("load",function(){

 showPopup();
 setTimeout(function(){
   loginPopup.classList.add("show");
 },5000)

})

function showPopup(){
      const timeLimit = 1 // seconds;
      let i=0;
      const timer = setInterval(function(){
       i++;
       if(i == timeLimit){
        clearInterval(timer);
        loginPopup.classList.add("show");
       } 
       console.log(i)
      },1000);
}


close.addEventListener("click",function(){
  loginPopup.classList.remove("show");
})

closelogin=()=> {
    loginPopup.classList.remove("show");
}




// ================Location======================

let locate= (position)=>{
  
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  console.log(lat , long)

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpMDciLCJhIjoiY2tzd3B4djJkMTg3eDJ2bHNiYWFqOXpxayJ9.As93GnwadL3vF0LPGhtyzg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [long,lat],
zoom:14,
});

// Create a new marker.
const marker = new mapboxgl.Marker()
.setLngLat([long, lat])
.addTo(map);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
    }));

}

let error= (error)=>{
  console.log(error)
}

navigator.geolocation.getCurrentPosition( locate, error)

// ----------------------------------------------------------------------------

// -------------- interact with backend --------------- //
var name = "", email = "", password = "";
var API = "http://localhost:3000/api";

var opt = {
  method : "GET",
  headers: {
      'Content-Type': 'application/json',
  },
};
const postRequest = async (url, data) => {
  const response = await fetch(API + url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const login = async (e) => {
  let info = document.getElementById("inp-signup").getElementsByTagName("input");
  let mail = info[0].value;
  let pass = info[0].value;
  try{
    let res = await postRequest("/login", { email : mail, pass : pass});
    if(res.data){
      closelogin();
      email = mail;
      password = pass;
      setUsername(email);
      setCoins("-");
    }
    else{
      msg("inp-signup-msg", "Invalid Credentials");
    }
  }
  catch(e){
    console.log("Err ", e);
    msg("inp-signup-msg", "Something went wrong")
  }
}

const signup = async (e) => {
  let info = document.getElementById("inp-signup").getElementsByTagName("input");
  let mail = info[0].value;
  let pass = info[0].value;
  try{
    let res = await postRequest("/signup", { email : mail, pass : pass});
    if(res.data == "ok" ) msg("inp-signup-msg", "Account Created. Login Now");
    else msg("inp-signup-msg", res.data); 
  }
  catch(e){
    console.log("Err ", e);
    msg("inp-signup-msg", "Something went wrong")
  }
}

const checkPoints = async () => {
  if(email != ""){
    try{
      let res = await fetch(API + '/user?email=' + email, opt);
      let data = await res.json().then( result => result );
      let c = data.data;
      setCoins(c.points);
    }
    catch(e){
      console.log(e);
    }
  }
}

const checkPin = async () => {
  console.log("Pin check");
  let pin = document.getElementById("pin").value;
  console.log("pin: ", pin);
  try{
    let res = await postRequest("/otp", {email : email, pass : password, otp : pin});
    msg("otp-msg", res.data);
  }
  catch(e){
    console.log("otp:", e);
  }
}

const msg = (id, m) => {
  let dd = document.getElementById(id);
  if(dd){
    dd.innerHTML = m;
  }
}

const setUsername = (uname) => { document.getElementById("username").innerHTML = uname; }
const setCoins = (uname) => { document.getElementById("coins").innerHTML = uname; }

setInterval(() => {
  checkPoints();
}, 5000);
