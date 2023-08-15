var fetchUrl = "http://localhost:3005"
var username = getCookie("username")
var password = getCookie("password")

function post() {
    let description = document.getElementById("description").value
    let airType = document.getElementById("airType").value
    let smell = document.getElementById("smell").value
    let place = document.getElementById("place").value
    let email = document.getElementById("email").value
    console.log(document.getElementById("email"))
    let request = {"username": username, "password": password,"description": description, "airType": airType, "smell": smell, "place": place, "email": email}
    console.log(request)
    fetch(`${fetchUrl}/api/addPost/`, {"body": JSON.stringify(request), "headers": {"Content-Type": "application/json"}, "method": "POST"}).then(data => data.json()).then(data => {
        if(data["error"] == true) {
            alert("An error has occured.")
        }
        else {
            console.log(data)
            location.href = `post.html?p=${data["id"]}`
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
