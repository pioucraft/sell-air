const fetchUrl = "http://localhost:3005"

function yes() {
    document.body.innerHTML = `<h1>Please enter your credentials : </h1><input type="text" id="username"></input><input type="password" id="password"></input><button onclick="login()">Login</button>`
}

function no() {
    
}

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    fetch(`${fetchUrl}/api/doIKnowMyPassword/`, {"method": "POST", "body": `{"username": "${username}", "password": "${password}"}`, "headers": {"Content-Type": "application/json"}}).then(data => data.json()).then(data => {
        console.log(data)
        if(data.response == true) {
            setCookie("username", username, 365)
            setCookie("password", password, 365)
            location.href = "index.html"
        }
    })
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
