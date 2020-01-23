let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
let books = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];
renderBook();
render();

document.getElementById('register-form').addEventListener("submit", function(e){
    e.preventDefault();
    register();
})

document.getElementById('login-form').addEventListener('submit', function(e){
    e.preventDefault();
    login();
})

document.querySelector("#register-username").addEventListener('input', function(e){
    let flag = false;
    user.forEach(function(item){
        if(item.userName === e.target.value) flag = true;
        else flag = false;
        if(flag) someError("Username already exists.");
        else someError("");
    })
})

render();










