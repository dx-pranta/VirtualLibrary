let render = function(){
    document.querySelector('#reg-error-message').textContent = '';
    document.querySelector('#log-error-message').textContent = '';
};

let updateMyBook = function(){
    let currentUser = user.filter((item) => item.userName === sessionStorage.getItem('loggedin'));
    myBooks = books.filter((book) => book.addedby === currentUser[0].userName);
}

let deleteBook = function(){
    console.log('Delete');
    console.log(event.target.id);
    books = books.filter((book) => `delete-${book.title}` !== event.target.id)
    localStorage.setItem('books', JSON.stringify(books));
    updateMyBook();      
    renderMyBooks();    
}

let editBook1 = function(){
    let ind = 0;
    let book = myBooks.filter((book) => book.title === event.toElement.id)[0];
    console.log(event.toElement.id);
    editableBook = event.toElement.id;
    let temp = [book.image, book.title, book.description, book.author, book.isbn, book.rating, book.seller];
    let form = document.getElementById(`form-${event.toElement.id}`);
    form.style.display = "block";
    
    for(i of form) if(ind < 7) i.value = temp[ind++];
    
}

let renderMyBooks = function(){

    let booklistHTML = '';
    for(book of myBooks){
        let b = `
                <ul>
                    <img src = ${book.image} height="100px" width="80px">
                    <li>Title: ${book.title}</li>
                    <li>Description: ${book.description}</li>
                    <li>Author: ${book.author}</li>
                    <li>ISBN: ${book.isbn}</li>
                    <li>Rating: ${book.rating}</li>
                    <li>Seller: ${book.seller}</li>
                </ul>

                <button class = "edit-book" id = "${book.title}" onclick = "editBook1()">Edit</button>
                <button class = "delete-book" id = "delete-${book.title}" onclick = "deleteBook()">Delete</button>
                
                <form id = "form-${book.title}" style="display: none;">
                    <input type = "text" placeholder = "Image: insert url" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Title" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Description" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Author" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "ISBN" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Rating" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Seller" class = "book-form-${book.title}" >
                    <input type = "submit" onclick = "editBook()" >
                </form>
                
        `
        booklistHTML += b;
    }
    document.querySelector('#my-book-div').innerHTML = booklistHTML;
}

let renderBook = function(){
    let booklistHTML = '';
    for(book of books){
        let b = `
                <ul>
                    <img src = ${book.image} height="100px" width="80px">
                    <li>Title: ${book.title}</li>
                    <li>Description: ${book.description}</li>
                    <li>Author: ${book.author}</li>
                    <li>ISBN: ${book.isbn}</li>
                    <li>Rating: ${book.rating}</li>
                    <li>Seller: ${book.seller}</li>
                </ul>
        `
        booklistHTML += b;
    }
    document.querySelector('#book-div').innerHTML = booklistHTML;
}

let addBook = function(addedby){
    let temp = [];
    let form = document.querySelectorAll('.book-form');

    form.forEach(function(input){
        temp.push(input.value);
    })
    let bookObject = {
        image: temp[0],
        title: temp[1],
        description: temp[2],
        author: temp[3],
        isbn: temp[4],
        rating: temp[5],
        seller: temp[6],
        addedby: addedby
    }
    books.push(bookObject);
    let bookJson = JSON.stringify(books);
    localStorage.setItem('books', bookJson);
    updateMyBook();
}

let editBook = function() {
    event.preventDefault();
    
    let elements = event.target.form.elements;
    let temp = [];
    ind = 0;
    for(i of elements) temp[ind++] = i.value;
    console.log(temp);

    books.forEach(function(book){
        if(book.title === editableBook){
            console.log('here');
            book.image = temp[0];
            book.title = temp[1];
            book.description = temp[2];
            book.author = temp[3];
            book.isbn = temp[4];
            book.rating = temp[5];
            book.seller = temp[6];
        }
    })

    let bookJson = JSON.stringify(books);
    localStorage.setItem('books', bookJson);
    
    renderMyBooks();
}



let someError = function(error){
    render();
    document.querySelector('#reg-error-message').style.display = "inline";
    document.querySelector('#reg-error-message').textContent = error;
};

let loginError = function(error){
    render();
    document.querySelector('#log-error-message').style.display = "inline";
    document.querySelector('#log-error-message').textContent = error;
};

let register = function(){
    let temp = [];
    let form = document.querySelectorAll('.reg-form');

    form.forEach(function(input){
        temp.push(input.value);
    })
    
    let userObject = {
        userName: temp[0],
        fullName: temp[1],
        email: temp[2],
        password: temp[3],
        confirmPassword: temp[4],
        book:[],
        isValidPass: function(){
            if(this.password === this.confirmPassword) return true;
            else return false;
        },
        isValidUserName: function(){
            let flag = true;
            user.forEach((item) => {
                if(item.userName === this.userName) flag = true;
            })
            return flag;
        }
    }

    if(userObject.isValidPass() && userObject.isValidUserName) user.push(userObject);
    else if(userObject.isValidUserName) someError("Password didn't match");
    else someError("Username already exists.")

    let userJson = JSON.stringify(user);
    localStorage.setItem("user", userJson);
}


let login = function(){
    let form = document.querySelectorAll('.login-form');
    let temp = [];
    form.forEach(function(input){
        temp.push(input.value);
    })
    let userName = temp[0];
    let password = temp[1];
    let flag = false;

    user.forEach((user) => {
        if(user.userName === userName && user.password === password) flag = true;
    })

    if(flag){
        sessionStorage.setItem('loggedin', userName);
        window.location.href = "dashboard.html";
    } 
    else loginError("Password or Username didn't match.")
}







