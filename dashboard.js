let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
let books = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];


let currentUser = user.filter((item) => item.userName === sessionStorage.getItem('loggedin'));
let myBooks = books.filter((book) => book.addedby === currentUser[0].userName);

renderMyBooks();


window.addEventListener('load', function(){
    if(!sessionStorage.getItem('loggedin')) window.location.href = "index.html";
})

document.querySelector("#logout").addEventListener('click', function(){
    sessionStorage.clear();
    window.location.href = "index.html";
})

document.querySelector('#add-book').addEventListener('submit', function(e){
    e.preventDefault();
    addBook(currentUser[0].userName);
    renderMyBooks();
})









   
 
