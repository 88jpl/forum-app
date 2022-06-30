const URL = "https://forum2022.codeschool.cloud"
Vue.component("loginpage", {
    template: `
   
    `,
    props: [

    ],
    methods: {

    }
});


var app = new Vue({
    el: "#app",
    data: {
        page: "login",
        loginEmailInput: "",
        loginPasswordInput: "",

        newNameInput: "",
        newEmailInput: "",
        newPasswordInput: "",

    },
    methods: {
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
            } else if (response.status == 401) {
                //not logged in
                console.log("not logged in");
                let data = await response.json();
                console.log(data);
            } else {
                console.log("Some sort of error when GETTING /session:", response.status, response);
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
        }
        // POST /user - create new user
    },
    created: function () {
        this.getSession();
    }
})