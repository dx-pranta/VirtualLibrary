let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
let books = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];
let myBooks = localStorage.getItem("mybooks") ? JSON.parse(localStorage.getItem("mybooks")) : [];
let currentUser = user.filter((item) => item.userName === sessionStorage.getItem('loggedin'))

renderMyBooks();

console.log(books);



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

let buttons = document.querySelectorAll('.edit-book');
let editableBook;
buttons.forEach(function(button){
    button.addEventListener('click', function(e){ 
        let ind = 0;
        let book = myBooks.filter((book) => book.title === e.toElement.id)[0];
        let temp = [book.image, book.title, book.description, book.author, book.isbn, book.rating, book.seller];
        let form = document.getElementById(`form-${e.toElement.id}`);
        
        for(i of form) if(ind < 7) i.value = temp[ind++];
        
        form.style.display = "block";
        editableBook = e.toElement.id;
    });
})





   
 
