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

    @property(cc.Node)
    player: cc.Node = null;

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
                    this.targetItem.node.destroy();
                    this.player.getComponent("Player").playerDropItem();
                }
                break;
        }
    }

    onBeginContact (contact, self, other) {
        // console.log("trash bin touched "+other.node.name);
        // console.log(other.node.name);
        if(other.node.getComponent(cc.Collider).tag == 2){ // tag2 = items
            // console.log("touched item");
            this.targetItem = other;
            other.node.getComponent("Food").opacity = 150;
        }
        
    }

    onEndContact (contact, self, other) {
        if(other.node.getComponent(cc.Collider).tag == 2){ // tag2 = items
            // console.log("left item");
            this.targetItem = null;
            other.node.getComponent("Food").opacity = 255;

        }
    }
    // update (dt) {}
}
