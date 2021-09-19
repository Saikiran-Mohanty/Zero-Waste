class User{
    constructor(email, pass, uid, points = 0, name = "Guest"){
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.uid = uid;
        this.points = points;
        this.status = 0; // logout
    } 
    addPoints(pts){
        this.points += pts;
    }
    login(pass){
        // if(this.status) return true;
        if(pass === this.pass) {
            // this.status = 1;
            return true;
        }
        else return false;
    }
    logout(){
        this.status = false;
    }
    show(){
        console.log("==> ", this.name, " ", this.pass, " ", this.uid, " ", this.points);
    }
}

const handleLogin = (email, pass, db) => {
    if(db.has(email)){
        let usr = db.get(email);
        return usr.login(pass);
    }
    else return false;
}

const handleSignin = (email, pass, db) => {
    if(db.has(email)) {
        return "Email already exists";
    }
    else{
        db.set(email, new User(email, pass, 0));
        return "ok";
    }
}

const handleLogout = (email, db) => {
    if(db.has(email)){
        db.get(email).logout();
    }
}

const msg = (yes) => {
    if(yes) return { msg : "ok" };
    else return {msg : "Opps"}
}
const msgwd = (yes, payload) => {
    if(yes) return { msg : "ok", data : payload };
    else return {msg : "Opps", data : payload}
}
module.exports = {User, handleLogin, handleLogout, handleSignin, msg, msgwd}