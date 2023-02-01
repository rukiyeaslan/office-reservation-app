# How Tokens Work?
* You request a token from the server
* Server signs it for you
* Everytime you make a request to a server in the protected route, you're gonna have to pass a log that token is inside your authorization header on your post request
