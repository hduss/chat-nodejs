

class User {

    constructor(login, password) {

        this.login = login;
        this.password = password;

    }

    initSession() {

        req.session.username = req.body.login;
        req.session.password = req.body.password;

        let login = req.session.username;
        let password = req.session.password;
    }





    getLogin() {

        reutn this.login;
    }

    setLogin(login) {

        this.login = login;
        return this.login;
    }


    getPAssword() {

        reutn this.password;
    }

    setPassword(password) {

        this.login = password;
        return this.password;
    }

}

exports.module = Connected;