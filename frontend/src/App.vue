<template>
    <div id="app">
        <div class="container">
            <h1>{{title}}</h1>
            <div style="margin-bottom: 5px;" id="form" v-if="page=='signin-page'">
                <h3>Name (First and Last):</h3>
                <input class="text-input" v-model="user" type="text">
                <h3>Student ID:</h3>
                <input class="text-input" v-model="id" type="text">
                <h3>Grade:</h3>
                <input class="text-input" v-model="grade" type="text">
                <!-- < -->
                <!-- <div class="SaveLogin">
                    <div class="center inline">
                        <h3>Save Login?</h3>
                    </div>
                    <input class="inline" v-model="saveLogin" type="checkbox">
                </div> -->
            </div>
            <div id="signed-in-page" v-if="page=='signed-in-page'">
                <!-- <h2>Success!</h2> -->
                <h3 style="margin-bottom: 10px;">You signed in successfully!<br> Please sign out when you leave!</h3>
            </div>
            <button class="submit-button" @click="login()" v-if="page=='signin-page'">Sign in</button>
            <button class="submit-button" @click="logout()" v-if="page=='signed-in-page'">Sign out</button>
        </div>
    </div>
</template>

<script>
export default {
    user: 'app',
    data() {
        return {
            user: '',
            id: '',
            grade: '',
            date: '',
            page: 'signin-page',
            title: 'Sign in',
        }
    },

    created() {
        if (document.cookie == "") return
        var cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        for (const key of Object.keys(cookies)) {
            if (key == 'user') {
                this.$data.user = cookies[key]
            }
            else if (key == 'id') {
                this.$data.id = cookies[key]
            }
            else if (key == 'grade') {
                this.$data.grade = cookies[key]
            }
        }
    },

    methods: {
        dblogin(user, id, grade){
            let response
            const reqOpt = {
                method: "POST",
                headers: {"Access-Control-Allow-Origin": "http://http://68.101.183.85:25560/"}
            }
            fetch("http://68.101.183.85:25560/entry/?name=" + user + "&id=" + id + "&grade=" + grade, reqOpt)
                .then(async response => response.json())
                .then(json =>{
                    response = json.data
            })
        
            return(response)
        },

        dblogout(user, id, grade){
            let response
            const reqOpt = {
                method: "POST",
                headers: {"Access-Control-Allow-Origin": "http://68.101.183.85:25560"}
            }
            fetch("http://68.101.183.85:25560/exit/?name=" + user + "&id=" + id + "&grade=" + grade, reqOpt)
            .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      else{
        console.log(response)
      }

      this.totalVuePackages = data.total;
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
            //     .then(async response => response.json())
            //     .then(json =>{
            //         response = json.data
            //         console.log(response)
            //         return response
            // })
        },

        /* page meaning:
        view-idle = nothing is happening, default page (currently just the login view)
        login-success = login is completed, showing success popup/page/whatever
        logout-success = logout is completed, showing success popup/page/whatever
        */
        // formToggle(page){
        //     this.$data.page = page
        //     console.log(page)
        //     if (page == 'login')
        //         {
        //             this.updateCookies()
        //             this.$data.title = "Logout";
        //         }
        //     else if (page == 'login-page') 
        //         {this.$data.title = 'Login'}
        //     else 
        //         {this.$data.page = 'error'}
        // },

        login() {
            this.$data.page = 'signed-in-page'
            this.updateCookies()
            this.$data.title = "Welcome " + this.user;
            console.log(this.dblogin(this.user, this.id, this.grade))
        },

        logout() {
            this.$data.page = 'signin-page'
            this.$data.saveLogin = this.saveLogin
            this.$data.title = "Sign in";
            this.updateCookies()
                console.log(this.dblogout(this.user, this.id, this.grade))
        },

        updateCookies() {
            document.cookie = 'user=' + this.user + ';Secure;SameSite=Strict;'
            document.cookie = 'id=' + this.id + ';Secure;SameSite=Strict;'
            document.cookie = 'grade=' + this.grade + ';Secure;SameSite=Strict;'
        }
    }
}
</script>

<style>

</style>
