function loadLoginForm(){
    
    var loginHtml = `Username:<input type="text" id="username"/><br>
            Password:<input type="password" id="password"><br>
            <input type="submit" value="submit" id="btn_login"><br>
            <a href="/registration.html">not yet registered..</a>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    
    var username=document.getElementById("username");
    var password=document.getElementById("password");
    var submit=document.getElementById("btn_login");
    
    submit.onclick=function(){
        var request = new XMLHttpRequest();
            
            // Capture the response and store it in a variable
            request.onreadystatechange = function () {
              if (request.readyState === XMLHttpRequest.DONE) {
                  // Take some action
                  if (request.status === 200) {
                      submit.value = 'Sucess!';
                      request.open('GET','/blog-main',true);
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
            console.log(username);
            console.log(password);
            request.open('POST', '/login-blog', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({username: username, password: password}));  
            submit.value = 'Logging in...';
    };
}
function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout-blog">Logout</a>
    `;
}
function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login-blog', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].title}</a>
                    </li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}

loadLogin();

loadArticles();