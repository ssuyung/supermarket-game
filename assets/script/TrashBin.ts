// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // @property(cc.Node)
    // player: cc.Node = null;

    private targetPlayer = null;
    private targetItem = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start () {
        // console.log("trash start");
    }

    // onKeyDown(event){
    //     console.log(event.keyCode);
    //     console.log("trash keydown");
    // }
    onKeyDown(event){
        // console.log("trash onkeydown");
        switch(event.keyCode)
        {
            case cc.macro.KEY.enter:
                // console.log("Trash hit enter");
                if(this.targetItem!=null){
                    // console.log("trash destroy node");
                    this.targetItem.node.getComponent("Food").putInTrash();
                    // this.targetItem.node.destroy();
                }
                break;
        }
    }

    onBeginContact (contact, self, other) {
        // console.log("trash bin touched "+other.node.name);
        // console.log(other.node.name);
        // console.log(other.tag);
        // console.log(other.node.getComponent(cc.Collider).tag);
        if(other.node.getComponent(cc.Collider).tag == 2){ // tag2 = items
            // console.log("touched item");
            this.targetItem = other;
            other.node.opacity = 150;
            this.node.getChildByName("mask").active = true;
        } 
        if(other.tag == 6){// tag6 : player
            this.targetPlayer = other;
        } 
        
    }

    onEndContact (contact, self, other) {
        if(other.node.getComponent(cc.Collider).tag == 2){ // tag2 = items
            // console.log("left item");
            this.targetItem = null;
            other.node.opacity = 255;
            this.node.getChildByName("mask").active = false;
        }
    }
    // update (dt) {}
}
