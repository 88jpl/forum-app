# forum-app

1. Create Repository

2. Create files

3. Get Vue hooked up.

4. Get some inputs and buttons

5. implement fetch requests
    Login Steps:
        GET session (200,401)
        POST session (201, 401)
        POST user (201, 4--)

    Add Pages for Login/Registration/HomePage if logged in/Errors show if users logging in.
        Bad login
        bad new email
        empty fields

Resources:

    /thread     GET/thread
                GET/thread/_id
                POST/thread
                DELETE/thread

    /post       POST/post
                DELETE/post

    
Schema's:

    thread: {
        name: String,
        description: String,
        category: String
    }

    post: {
        thread_id: String,
        body: String
    }

    user: {
        username: String,
        fullname: String,
        password: String
    }
        
