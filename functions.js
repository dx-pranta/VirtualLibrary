let render = function(){
    document.querySelector('#reg-error-message').textContent = '';
    document.querySelector('#log-error-message').textContent = '';
};

let renderBook = function(){
    let booklistHTML = '';
    for(book of books){
        let b = `
                <ul>
                    <img src = ${book.image} height="100px" width="100px">
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

let renderMyBooks = function(){
    let myBooks = books.filter((book) => book.addedby === currentUser[0].userName);

    let booklistHTML = '';
    for(book of myBooks){
        let b = `
                <ul>
                    <img src = ${book.image} height="100px" width="100px">
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
    document.querySelector('#my-book-div').innerHTML = booklistHTML;
}


