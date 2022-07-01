const URL = "https://forum2022.codeschool.cloud"
Vue.component("homepage", {
    template: `
        <div>
            <h2 v-on:click="getThread($event.target.value)">{{title}}</h2>
            <p>{{description}}</p>
        </div>
   
        
    `,
    props: [
        "title",
        "description",
        "index",
        "idofthread",
        "page"
    ],
    methods: {
         // GET selected thread by index from threads Array
         getThread: async function(index) {
            let threadID = this.idofthread;
            let response = await fetch(`${URL}/thread/${threadID}`,{
                method: "GET",
                credentials: "include"
            });
            let data = await response.json();
            // this.page = "thread"
            console.log(data);
            this.page = "thread";
            
        },
        updatePage: function (page) {
            this.$emit('')
        }

    }
});
Vue.component("thread", {
    template: `
        <div>
            <h2>{{title}}</h2>
            <p>{{description}}</p>
        </div>
   
        
    `,
    props: [
        "title",
        "description",
        "index",
        "idofthread"
    ],
    methods: {
        
         
            
    },
});


var app = new Vue({
    el: "#app",
    data: {
        page: "login",
        loggedIn: false,
        registration: false,
        loginEmailInput: "",
        loginPasswordInput: "",
        threadsArray: [],
        newNameInput: "",
        newEmailInput: "",
        newPasswordInput: "",

    },
    methods: {

        createUserPage: function() {
            this.registration = true;
        },
        logStatus: function () {
            if (this.loggedIn == true) {
                console.log("here")
                this.page = "homepage";
            } else {
                console.log("else")
                
            }
        },
        logOut: function () {
            this.loggedIn = false
        },
       
        // Get /session - Ask the server if we are logged in
        getSession: async function () {
            let response = await fetch(`${URL}/session`,{
                method: "GET",
                credentials: "include"
            });
            //Are we logged in?
            if (response.status == 200) {
                //logged in 
                console.log("logged in");
                let data = await response.json();
                console.log(data);
                this.loggedIn = true;
            } else if (response.status == 401) {
                //not logged in
                console.log("not logged in");
                let data = await response.json();
                console.log(data);
                this.loggedIn = false;
            } else {
                console.log("Some sort of error when GETTING /session:", response.status, response);
                this.loggedIn = false;
            }
        },
        // POST /session - Attempt to login
        postSession: async function () {
            let loginCredentials = {
                username: this.loginEmailInput, 
                password: this.loginPasswordInput};

            let response = await fetch(URL + "/session", {
                method: "POST",
                body: JSON.stringify(loginCredentials),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            // parse the body
            let body = response.json();
            console.log(body);
            // was the login sucessful
            if (response.status == 201) {
                console.log("Successful Login Attempt");

                //clear inputs
                this.loginEmailInput = "";
                this.loginPasswordInput = "";
                this.loggedIn = false;
            } else if (response.status == 401) {
                console.log("Unsuccessful Login Attempt");

                //let user know it was unsuccessful
                alert("Unsuccessful login");


                
                //clear password input
                this.loginPasswordInput = "";
            } else {
                console.log("Some sort of error when POSTING /session:", response.status, response);
            }

            

        },
        postUser: async function () {
            let userCredentials = {
                username: this.newEmailInput, 
                fullname: this.newNameInput,
                password: this.newPasswordInput};
            let response = await fetch(URL + "/user", {
                method: "POST",
                body: JSON.stringify(userCredentials),
                headers: {
                    "Content-Type": "application/json"
                },
                
            });
            // parse the body
            let body = response.json();
            console.log(body);
            // was the new user was created

            //Success
            if (response.status == 201) {
                console.log("User Created");

                //clear inputs
                this.newEmailInput = "";
                this.newPasswordInput = "";
                this.newNameInput = "";
            } else if (response.status == 401) {
                console.log("Unsuccessful Creation");                
            } else {
                console.log("Some sort of error when creating", response.status, response);
            }
            this.registration = false;
        },
        //GET /thread's
        getThreads: async function() {
            let response = await fetch(`${URL}/thread`,{
                method: "GET",
                credentials: "include"
            });
            let data = await response.json();
            // console.log(data)
            this.threadsArray = data;

        }

        // POST /user - create new user
    },
    created: function () {
        this.getSession();
        // this.logStatus();
        this.getThreads();
        
        
    },
    updated: function () {
        this.logStatus();
    },
    
})