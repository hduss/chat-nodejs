

class User {

    constructor(login, password) {

        this.login = req.body.login;
        this.password = req.body.password;

    }
/*
    initSession() {

        req.session.username = 
        req.session.password = 

        let login = req.session.username;
        let password = req.session.password;
    }

*/
    getLogin() {

        return this.login;
    }

    setLogin(login) {

        this.login = login;
        return this.login;
    }


    getPAssword() {

        return this.password;
    }

    setPassword(password) {

        this.login = password;
        return this.password;
    }

}

exports.module = User;