let fetchUrl = "http://localhost:3005"
let query = location.search.replace("?q=", "")

fetch(`${fetchUrl}/api/search/${query}`).then(data => data.json()).then(data => {
    console.log(data)
    try {
        for(let i=0; i<20; i++) {
            let post = data["response"][i]
            document.body.innerHTML += `<button class="post" onclick="location.href = 'post.html?p=${post["id"]}'"><h2>${post["place"]}</h2><h2>${post["airType"]}</h2><h2>${post["smell"]}</h2></button>`
        }
    }
    catch(err) {
        console.log(err)
    }
    document.body.innerHTML += "<a href='index.html'>I want to go back to the home page<a>"
})
