const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

@ccclass
export default class NewClass extends cc.Component {

    private customer : cc.Node = null;

    private PlayeratCounter : boolean = false;
    private CustomeratCounter : boolean = false;
    private CustomerPaid : boolean = false;
    private enterDown : boolean = false;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }

    // update (dt) {}

    getPrice(chargeMoney) {
        cc.log(chargeMoney);
        if (this.PlayeratCounter && this.CustomeratCounter && !this.CustomerPaid) {
            let curMoney = parseInt(cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string);
            cc.log("this customer paid " + this.customer.getComponent("Customer").getCustomerPrice(chargeMoney).toString());
            curMoney += this.customer.getComponent("Customer").getCustomerPrice(chargeMoney);
            cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string = curMoney.toString();
            let money = Number(cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string);
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    const uid = firebase.auth().currentUser.uid;
                    firebase.database().ref('userData/' + uid).update({
                        score: money
                    })
                }
            });
            this.CustomerPaid = true;
            this.customer.getComponent(cc.Collider).tag = 21;
        }
    }

    onKeyDown(event) {
        if (event.keyCode == cc.macro.KEY.enter && !this.enterDown) {
            this.enterDown = true;
            /*if (this.PlayeratCounter && this.CustomeratCounter && !this.CustomerPaid) {
                let curMoney = parseInt(cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string);
                curMoney += 20;
                cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string = curMoney.toString();
                this.CustomerPaid = true;
                this.customer.getComponent(cc.Collider).tag = 21;
            }*/
        }
    }

    onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.enter) {
            this.enterDown = false;
        }
    }

    onBeginContact (contact, self, other) {
        if (other.node.name == "Player1" || other.node.name == "Player2") {
            //console.log("player at counter");
            this.PlayeratCounter = true;
            this.node.getChildByName("mask").active = true;
            this.node.getChildByName("Calculator").active = true;
        }
        // tag 20 : customers that get what they want
        if (other.tag == 20 || other.tag == 21) {
            console.log("customer at counter");
            this.CustomeratCounter = true;
            this.customer = other.node;
        }
    }

    onEndContact (contact, self, other) {
        if (other.node.name == "Player1" || other.node.name == "Player2") {
            //console.log("player leaves counter");
            this.PlayeratCounter = false;
            this.node.getChildByName("mask").active = false;
            this.node.getChildByName("Calculator").active = false;
        }
        // tag 20 : customers that get what they want
        if (other.tag == 20 || other.tag == 21) {
            console.log("customer leaves counter");
            this.CustomeratCounter = false;
            this.CustomerPaid = false;
        }
    }
}
