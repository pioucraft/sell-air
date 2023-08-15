const fetchUrl = "http://localhost:3005"

function yes() {
    document.body.innerHTML = `<h1>Please enter your credentials : </h1><input type="text" id="username"></input><input type="password" id="password"></input><button onclick="login()">Login</button>`
}

function no() {
   document.body.innerHTML = `<h1>Create your account : </h1><input type="text" id="username"></input><input type="password" id="password"></input><button onclick="register()">Register</button><p>Username can't be more than 15 characters long.</p><p>By creating an account, you agreee to the use of cookies and you agree to <a href="conditions.html">the therms of use and privacy policy</a>.</p>` 
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
        else {
            alert("wrong password/username")
        }
    })
}

function register() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    fetch(`${fetchUrl}/api/createUser/`, {"method": "POST", "headers": {"Content-Type": "application/json"}, "body": `{"username": "${username}", "password": "${password}"}`}).then(data => data.json()).then(data => {
        console.log(data)
        if(data["response"] == "alreadyUsername") {
            alert("Username already used.")
        }
        else if(data["error"] == true) {
            alert("An error has occured (your username is probably too long).")
        }
        else {
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
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Strict";
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


function calculateSHA256Hash(data) {
    const hashBuffer = window.crypto.subtle.digestSync("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
