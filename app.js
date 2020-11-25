//Blog Post App
// The objective here was to get creative with adding blog posts to the front end and generating a random image. I used the Unpslash API to get a random image every time a new blog post is added.

const form = document.getElementById("add-post");
const title = document.getElementById("title");
const content = document.getElementById("content");

let getPhoto = async () => {
    let key = config.key;
    const photo = await fetch(`https://api.unsplash.com/photos/random?client_id=${key}`);
    const res = await photo.json();
    return res;
}

const addPost = (data) => {
    //output vars
    const img = data.urls.regular;
    console.log(img);
    // build a post
    const grid = document.querySelector(".post-grid");
    const article = document.createElement("article");
    article.className = "post-card";
    article.innerHTML = ` 
    <img class="post-image" src="${img}" width="500px" alt="">
    <div class="post-content">
        <h2>${title.value}</h2>
        <p>${content.value}</p>
    </div>`
    grid.appendChild(article);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();    
    if (title.value === "" || content.value === "") {
        postAlert("You need to enter a value", "warning");
    } else {
        getPhoto().then(data => {
            postAlert("Post successful!", "success");
            addPost(data);
        })
    }
})

let postAlert = (msg, className) => {
    //Parent and first child of the form section
    const section = document.querySelector('#post-section');
    const container = document.querySelector('.form-container');

    //Make a divy div. 
    const div = document.createElement('div');
    div.classList = `row alert ${className}`;
    div.innerHTML = msg;
    section.insertBefore(div, container);
    setTimeout(() => {
        div.remove();
    }, 3000);
}
