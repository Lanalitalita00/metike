home_tab = document.querySelector(".home_tab");
share_tab = document.querySelector(".share_tab");
price_tab = document.querySelector(".price_tab");
account_tab = document.querySelector(".account_tab");
titleBar = document.querySelector(".titleBar").querySelector("h1");


function gotoHome() {
    home_tab.style.display = "block";
    share_tab.style.display = "none";
    price_tab.style.display = "none";
    account_tab.style.display = "none";
    titleBar.innerHTML = "Magasins";
}
function gotoShare() {
    home_tab.style.display = "none";
    share_tab.style.display = "block";
    price_tab.style.display = "none";
    account_tab.style.display = "none";
    titleBar.innerHTML = "Partagés";
}
function gotoPrice() {
    home_tab.style.display = "none";
    share_tab.style.display = "none";
    price_tab.style.display = "block";
    account_tab.style.display = "none";
    titleBar.innerHTML = "Prix";
}
function gotoAccount() {
    home_tab.style.display = "none";
    share_tab.style.display = "none";
    price_tab.style.display = "none";
    account_tab.style.display = "block";
    titleBar.innerHTML = "Mon Compte";
}




const addUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'john_doe',
          email: 'john@example.com',
          password: 'securepassword',
          data: JSON.stringify({ age: 30, city: 'New York' })
        })
      });
      const data = await response.json();
      console.log('User added:', data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  const removeUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log('User removed:', data);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };
  
  const updateUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'john_doe_updated',
          email: 'john_updated@example.com',
          password: 'newsecurepassword',
          data: JSON.stringify({ age: 31, city: 'Los Angeles' })
        })
      });
      const data = await response.json();
      console.log('User updated:', data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`);
      const data = await response.json();
      console.log('User info:', data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  // Usage examples:
  addUser();
  removeUser(1);
  updateUser(1);
  getUser(1);
