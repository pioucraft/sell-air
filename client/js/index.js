const fetchUrl = "http://localhost:3005"

fetch(`${fetchUrl}/api/search/air`).then(data => data.json()).then(data => {
    console.log(data)
    for(let i=0; i<20; i++) {
        let post = data["response"][i]
        document.getElementById("middle-posts").innerHTML += `<button class="post" onclick="location.href = 'post.html?p=${post["id"]}"><h2>${post["place"]}</h2><h2>${post["airType"]}</h2><h2>${post["smell"]}</h2></button>`
    }
})

if(getCookie("password") != "") {
    let password = getCookie("password")
    let username = getCookie("username")
    fetch(`${fetchUrl}/api/doIKnowMyPassword`, {method: "POST", body: `{"username": "${username}", "password": "${password}"}`, headers: {"Content-Type": "application/json"}}).then(data => data.json()).then(data => {
        console.log(data)
        if(data["response"] == true) {
            document.getElementById("middle-account").innerHTML = `<h2>Connected with the account ${username}</h2><button onclick="logout()">Logout</button><button onclick="location.href = 'addPost.html'">Post somethin'<button>`
        }
        else {
            logout()
        }
    })
}

function logout() {
    setCookie("username", getCookie("username"), -1)
    setCookie("password", getCookie("password"), -1)
    location.reload()
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
