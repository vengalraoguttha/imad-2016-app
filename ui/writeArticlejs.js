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
                      submit.value = 'article uploaded sucessfully!';
                      var r=new XMLHttpRequest();
                      r.open("GET","/blog.html",true);
                  } else if (request.status === 403) {
                      submit.value = 'Invalid credentials. Try again?';
                  } else if (request.status === 500) {
                      alert('Something went wrong on the server');
                      submit.value = 'publish';
                  } else {
                      alert('Something went wrong on the server');
                      submit.value = 'publish';
                  }
                 // loadLogin();
              }  
              // Not done yet
            };
            
            // Make the request
            var title = document.getElementById('title').value;
            var head = document.getElementById('heading').value;
            var content = document.getElementById('article').value;
            request.open('POST', '/insert-article', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({title: title, head: head,content:content}));  
            submit.value = 'uploading article...';
    };
}

writeArticle();