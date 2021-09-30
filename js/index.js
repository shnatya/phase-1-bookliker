document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(bookArray => bookArray.forEach(bookObj => renderBook(bookObj)))

    
});
function renderBook(bookObj) {
    const listOfBooks = document.querySelector("#list");
    let oneBookPointer = document.createElement("li");
    oneBookPointer.innerText = `${bookObj.title}`;
    listOfBooks.appendChild(oneBookPointer);

    oneBookPointer.addEventListener("click", () => {
        handleBookClick(bookObj)
    })
}
function handleBookClick(bookObj) { 
    const showPanel = document.querySelector("#show-panel");
    showPanel.innerHTML = " ";
    let bookDetails = document.createElement("div");
    bookDetails.innerHTML = `
        <img src = ${bookObj.img_url}>
        <h1>${bookObj.title}</h1>
        <h1>${bookObj.subtitle}</h1>
        <h1>${bookObj.author}</h1>
        <p>${bookObj.description}</p>
        <ul></ul>
        <button>Like</button>
    `
    showPanel.appendChild(bookDetails);
    const buttonLike = document.querySelector("button");
    buttonLike.addEventListener("click", () => handleButtonLike(bookObj));
    console.log(buttonLike);

    renderUsers(bookObj);
}
function renderUsers(bookObj) {
    debugger
    const listOfUsers = document.querySelector("#show-panel div ul");
    listOfUsers.replaceChildren();
    debugger
    for(user of bookObj.users) {
        debugger
        let oneUser = document.createElement("li");
        listOfUsers.appendChild(oneUser);
        debugger
        oneUser.innerText = `${user.username}`
        debugger
    } 
}
function handleButtonLike(bookObj) {
    const newUser = {
        id: 11,
        username: "Nastya",
    }
    bookObj.users.push(newUser);

    updatedBookObj = {
        users: bookObj.users,
    }
   
    fetch(`http://localhost:3000/books/${bookObj.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(updatedBookObj)
}).then(res => console.log(res))

    renderUsers(bookObj);

}