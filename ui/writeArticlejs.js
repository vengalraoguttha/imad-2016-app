function writeArticle(){ 
    var submit=document.getElementById("publish");
    var title=document.getElementById("title");
    var head=document.getElementById("heading");
    var content=document.getElementById("article");
    
    submit.onclick=function(){
        var request = new XMLHttpRequest();
            
            // Capture the response and store it in a variable
            request.onreadystatechange = function () {
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
                  loadLogin();
              }  
              // Not done yet
            };
            
            // Make the request
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            request.open('POST', '/login-blog', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({username: username, password: password}));  
            submit.value = 'Logging in...';
    };
}

writeArticle();