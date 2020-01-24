let render = function(){
    document.querySelector('#reg-error-message').textContent = '';
    document.querySelector('#log-error-message').textContent = '';
};

let renderMyBooks = function(){
    let myBooks_rnd = localStorage.getItem("mybooks") ? JSON.parse(localStorage.getItem("mybooks")) : [];
    let myBooksJSON = JSON.stringify(myBooks_rnd);
    localStorage.setItem('mybooks', myBooksJSON);

    let booklistHTML = '';
    for(book of myBooks){
        console.log(book.title);
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

                <button class = "edit-book" id = "${book.title}">Edit</button>

                <form id = "form-${book.title}" style="display: none;">
                    <input type = "text" placeholder = "Image: insert url" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Title" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Description" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Author" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "ISBN" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Rating" class = "book-form-${book.title}" >
                    <input type = "text" placeholder = "Seller" class = "book-form-${book.title}" >
                    <input type="submit" onclick = "editBook()">
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
}

let editBook = function() {
    console.log('here');
    event.preventDefault();
    
    let elements = event.target.form.elements;
    let temp = [];
    ind = 0;
    for(i of elements) temp[ind++] = i.value;
    console.log(temp);

    myBooks.forEach(function(book){
        
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
    let bookJson = JSON.stringify(myBooks);
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
    else someError("Username already exist.")

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







