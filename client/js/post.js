let fetchUrl = "http://localhost:3005"

fetch(`${fetchUrl}/api/post/${location.search.replace("?p=", "")}`).then(data => data.json()).then(data => {
    let datajson = data["response"]
    let date = new Date(datajson["time"])
    let postHtml = `<p>Location : ${datajson["place"]}</p><p>Smell : ${datajson["smell"]}</p><p>Air type : ${datajson["airType"]}</p><p>description : ${datajson["description"]}</p><p>Email : ${datajson["email"]}</p><p>Time : ${date.toLocaleString()}</p><p>Username : ${datajson["username"]}</p>`
    console.log(postHtml)
    console.log(data)
    document.body.innerHTML = postHtml + `<a href="https://twitter.com/intent/tweet?url=${location.href}">Share to Twitter</a><button id="copyText" onclick="copyLink()">Link (click to copy) : ${location.href}</button><a href='index.html'>I want to go back to the home page<a>`
})

function copyLink() {

   // Copy the text inside the text field
  navigator.clipboard.writeText(location.href);

  // Alert the copied text
  alert("Copied the text: " + location.href);
}
