// function to login in user based on email and password existing in DB

const loginFormHandler = async (event) => {
    event.preventDefault();
  console.log('hellofromloginformhandler');
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
       
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  document
    .querySelector('#submitButton')
    .addEventListener('click', loginFormHandler);

  console.log('loginFormHandler is listening for clicks');
  
