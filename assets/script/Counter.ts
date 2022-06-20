const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

@ccclass
export default class NewClass extends cc.Component {

    private customer : cc.Node = null;

    @property(cc.Prefab)
    incomePrefab : cc.Prefab = null;
    @property({type:cc.AudioClip})
    coinSound: cc.AudioClip = null;

    private PlayeratCounter : boolean = false;
    private CustomeratCounter : boolean = false;
    private CustomerPaid : boolean = false;
    private dialogShown : boolean = false;
    private enterDown : boolean = false;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }

    update (dt) {
        if (this.PlayeratCounter && this.CustomeratCounter && !this.dialogShown) {
            this.dialogShown = true;
            this.customer.getComponent("Customer").showDialog();
        }
        if (!this.CustomeratCounter) {
            this.dialogShown = false;
        }
    }

    getPrice(chargeMoney) {
        cc.log(chargeMoney);
        if (this.PlayeratCounter && this.CustomeratCounter && !this.CustomerPaid) {
            let curMoney = parseInt(cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string);
            let finalPrice = this.customer.getComponent("Customer").getCustomerPrice(chargeMoney);
            //cc.log("this customer paid " + this.customer.getComponent("Customer").getCustomerPrice(chargeMoney).toString());
            //curMoney += this.customer.getComponent("Customer").getCustomerPrice(chargeMoney);
            this.CustomerPaid = true;
            this.customer.getComponent(cc.Collider).tag = 21;
            cc.audioEngine.setVolume(cc.audioEngine.playEffect(this.coinSound, false), cc.find("Canvas").getComponent("World").getSfxVolume());
            var income = cc.instantiate(this.incomePrefab);
            income.getComponent(cc.Label).string = "+" + finalPrice.toString();
            cc.find("Canvas").addChild(income);
            this.scheduleOnce(() => {
                income.destroy();
                curMoney += finalPrice;
                cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string = curMoney.toString();
            }, 1);
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
