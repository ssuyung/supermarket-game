const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    add_0() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 0;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_1() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 1;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_2() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 2;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_3() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 3;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_4() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 4;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_5() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 5;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_6() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 6;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_7() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 7;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_8() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 8;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    add_9() {
        let num = Number(this.node.getChildByName("Amount").getComponent(cc.Label).string);
        num *= 10;
        num += 9;
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(num);
    }
    clear(){
        this.node.getChildByName("Amount").getComponent(cc.Label).string = String(0);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName("Amount").getComponent(cc.Label).string = "0";
    }

    start () {
        let btn_0 = new cc.Component.EventHandler();
        btn_0.target = this.node;
        btn_0.component = "Calculator";
        btn_0.handler = "add_0";
        this.node.getChildByName("0").getComponent(cc.Button).clickEvents.push(btn_0);
        let btn_1 = new cc.Component.EventHandler();
        btn_1.target = this.node;
        btn_1.component = "Calculator";
        btn_1.handler = "add_1";
        this.node.getChildByName("1").getComponent(cc.Button).clickEvents.push(btn_1);
        let btn_2 = new cc.Component.EventHandler();
        btn_2.target = this.node;
        btn_2.component = "Calculator";
        btn_2.handler = "add_2";
        this.node.getChildByName("2").getComponent(cc.Button).clickEvents.push(btn_2);
        let btn_3 = new cc.Component.EventHandler();
        btn_3.target = this.node;
        btn_3.component = "Calculator";
        btn_3.handler = "add_3";
        this.node.getChildByName("3").getComponent(cc.Button).clickEvents.push(btn_3);
        let btn_4 = new cc.Component.EventHandler();
        btn_4.target = this.node;
        btn_4.component = "Calculator";
        btn_4.handler = "add_4";
        this.node.getChildByName("4").getComponent(cc.Button).clickEvents.push(btn_4);
        let btn_5 = new cc.Component.EventHandler();
        btn_5.target = this.node;
        btn_5.component = "Calculator";
        btn_5.handler = "add_5";
        this.node.getChildByName("5").getComponent(cc.Button).clickEvents.push(btn_5);
        let btn_6 = new cc.Component.EventHandler();
        btn_6.target = this.node;
        btn_6.component = "Calculator";
        btn_6.handler = "add_6";
        this.node.getChildByName("6").getComponent(cc.Button).clickEvents.push(btn_6);
        let btn_7 = new cc.Component.EventHandler();
        btn_7.target = this.node;
        btn_7.component = "Calculator";
        btn_7.handler = "add_7";
        this.node.getChildByName("7").getComponent(cc.Button).clickEvents.push(btn_7);
        let btn_8 = new cc.Component.EventHandler();
        btn_8.target = this.node;
        btn_8.component = "Calculator";
        btn_8.handler = "add_8";
        this.node.getChildByName("8").getComponent(cc.Button).clickEvents.push(btn_8);
        let btn_9 = new cc.Component.EventHandler();
        btn_9.target = this.node;
        btn_9.component = "Calculator";
        btn_9.handler = "add_9";
        this.node.getChildByName("9").getComponent(cc.Button).clickEvents.push(btn_9);
        let btn_clear = new cc.Component.EventHandler();
        btn_clear.target = this.node;
        btn_clear.component = "Calculator";
        btn_clear.handler = "clear";
        this.node.getChildByName("C").getComponent(cc.Button).clickEvents.push(btn_clear);
    }

    // update (dt) {}
}
