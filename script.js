function postFetchForSignUp() {
  let nameInput = document.querySelector("#name")
  let usernameInput = document.querySelector("#username")
  fetch('http://localhost:3000/users', { // First, we make a Post fetch request where we want to store our users.
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      username: usernameInput.value
    })
  })
  .then(res=>res.json())
  .then(user => {
    localStorage.clear() // If there was a user signed in, this will                                   
                         // clear it up
    localStorage.id = user.id  // Then we can store the id we got 
    slapUser(user)
    logOutButton()
  })
}

signInButton.addEventListener('click', e => {
  signInForm()
  let form = signDiv.querySelector('.sign-in')
  let usernameInput = document.querySelector("#username")
  form.addEventListener('submit', e=>{
    e.preventDefault()
    fetch('http://localhost:3000/users') // We make a get fetch    // request where users are stored
    .then(res=>res.json()) 
    .then(usersArray => { 
      let user = usersArray.find(function(user){ 
          return user.username === usernameInput.value // Then we        // check if there is a user with a value given
        })
      if (user){
        signDiv.innerHTML = ""
        slapUser(user)
        localStorage.id = user.id // If there is so, we then store // it
        logOutButton()
        writeReview()
      }
    })
  })
})

function logOutButton(){
 let logOutButton = document.createElement("button")
 logOutButton.className = "log-out-button"
 logOutButton.innerText = "Log Out"
 signDiv.append(logOutButton)
 logOutButton.addEventListener('click', e=>{
   localStorage.clear() // We clear localStorage like so
 })
}

document.querySelector("#add_all_button").onclick =  postFetchForSignUp();
