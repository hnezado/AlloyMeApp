const showAuthNav = (isAuth) => {
  const login = document.getElementById('nav-login')
  const signup = document.getElementById('nav-signup')
  const logout = document.getElementById('nav-logout')
  
  isAuth ? login.style.display = 'none' : login.style.display = 'block'
  isAuth ? signup.style.display = 'none' : signup.style.display = 'block'
  isAuth ? logout.style.display = 'block' : logout.style.display = 'none'
}

// document.addEventListener('DOMContentLoaded', () => {

//   console.log('IronGenerator JS imported successfully!');

// }, false);

