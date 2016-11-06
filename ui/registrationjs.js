function loadRegistration(){
    
    var username=document.getElementById('username');
    var password1=document.getElementById('password1');
    var password2=document.getElementById('password2');
    var email=document.getElementById('email');
    var submit=document.getElementById('btn_register');
    
    submit.onclick=function(){
        var request =new XMLHttpRequest();
        request.onreadystatechange=function(){
          if (request.readyState === XMLHttpRequest.DONE) {
                  // Take some action
                  if (request.status === 200) {
                      submit.value = 'Sucess!';
                  } else if (request.status === 403) {
                      submit.value = 'Invalid credentials. Try again?';
                  } else if (request.status === 500) {
                      alert('Something went wrong on the server');
                      submit.value = 'Login';
                  } else {
                      alert('Something went wrong on the server');
                      submit.value = 'Login';
                  }  
          }
        };
        // Make the request
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            console.log(username);
            console.log(password);
            request.open('POST', '/login', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({username: username, password: password}));  
            submit.value = 'Logging in...';
    };
}
loadRegistration();