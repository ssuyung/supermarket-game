const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    account: cc.EditBox = null;

    @property(cc.EditBox)
    password: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.account.placeholder = "Account";
        this.password.placeholder = "Password";
    }

    start () {

    }

    // update (dt) {}
}
