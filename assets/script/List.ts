// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    list: cc.Node = null;

    start () {
        let btn = new cc.Component.EventHandler();
        btn.target = this.node;
        btn.component = "List";
        btn.handler = "onClick";
        cc.find("Canvas/List").getComponent(cc.Button).clickEvents.push(btn);

        let btn2 = new cc.Component.EventHandler();
        btn2.target = this.node;
        btn2.component = "List";
        btn2.handler = "onClick";
        cc.find("Canvas/List/Todo List/Cancel Button").getComponent(cc.Button).clickEvents.push(btn2);
    }

    onClick() {
        this.list.active = !this.list.active;
    }

    // update (dt) {}
}
