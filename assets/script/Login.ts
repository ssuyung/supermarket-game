const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    account: cc.EditBox = null;

    @property(cc.EditBox)
    password: cc.EditBox = null;

    private email:string;
    private pwd:string;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.account.placeholder = "Account";
        this.password.placeholder = "Password";
    }

    start () {
        this.handleWithEditBox("Account");
        this.handleWithEditBox("Password");

        let loginbtn = new cc.Component.EventHandler();
        loginbtn.target = this.node;
        loginbtn.component = "login";
        loginbtn.handler = "login_click";
        cc.find("Canvas/Login").getComponent(cc.Button).clickEvents.push(loginbtn);

        let signupbtn = new cc.Component.EventHandler();
        signupbtn.target = this.node;
        signupbtn.component = "signup";
        signupbtn.handler = "signup_click";
        cc.find("Canvas/Signup").getComponent(cc.Button).clickEvents.push(signupbtn);
    }

    handleWithEditBox(mode:string){
        let box = new cc.Component.EventHandler();
        box.target = this.node;
        box.component = "login_signup";
        box.handler = "onEditDidEnd";
        cc.find("Canvas/" + mode).getComponent(cc.EditBox).editingDidEnded.push(box);
    }

    login_click() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.pwd)
        .then((userCredential) => {
            this.LoadScene();
        })
        .catch((error) => {
            var errorMessage = error.message;
        });
    }

    onEditDidEnd(box:cc.EditBox){
        if(box.placeholder == "Account"){
            this.email = box.string;
        }else if(box.placeholder == "Password"){
            this.pwd = box.string;
        }
    }

    signup_click(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.pwd)
        .then((userCredential) => {
            this.LoadScene();
        })
        .catch((error) => {
            var errorMessage = error.message;
        });
    }

    LoadScene(){
        cc.director.loadScene("stage");
    }
}
