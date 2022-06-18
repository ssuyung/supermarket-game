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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onBeginContact (contact, self, other) {
        console.log("touched something");
        console.log(other.node.name);
        if(other.node.getComponent(cc.Collider).tag == 2){ // tag2 = items
            console.log("touched item");
        }
        
    }

    onEndContact (contact, self, other) {
        
    }
    // update (dt) {}
}
