const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    account: cc.EditBox = null;

    @property(cc.EditBox)
    password: cc.EditBox = null;

    onLoad () {
        this.account.placeholder = "Account";
        this.password.placeholder = "Password";
    }

    start () {
        let loginbtn = new cc.Component.EventHandler();
        loginbtn.target = this.node;
        loginbtn.component = "Login";
        loginbtn.handler = "loginclick";
        cc.find("Canvas/Login").getComponent(cc.Button).clickEvents.push(loginbtn);

        let signupbtn = new cc.Component.EventHandler();
        signupbtn.target = this.node;
        signupbtn.component = "Login";
        signupbtn.handler = "signupclick";
        cc.find("Canvas/Signup").getComponent(cc.Button).clickEvents.push(signupbtn);
    }

    loginclick() {
        let email = cc.find("Canvas/Account").getComponent(cc.EditBox).string;
        let password = cc.find("Canvas/Password").getComponent(cc.EditBox).string;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Success!");
            cc.director.loadScene("Stage1");
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    signupclick(){
        let email = cc.find("Canvas/Account").getComponent(cc.EditBox).string;
        let password = cc.find("Canvas/Password").getComponent(cc.EditBox).string;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            const uid = firebase.auth().currentUser.uid;
            firebase.database().ref('leaderBoard/' + uid).set({
                teamName:"null",
                score: 0,
            });
            firebase.database().ref('leaderBoard2/' + uid).set({
                teamName:"null",
                score: 0,
            });
            firebase.database().ref("userData/" + uid).set({
                teamName:"null",
                numberOfPlayer: 0,
                score: 0,
            }).then(function () {
                alert("Success!");
                cc.director.loadScene("menu");
            }).catch(function (error) {
                alert(error.message);
            });
        }).catch(function (error) {
            alert(error.message);
        });
    }
}
