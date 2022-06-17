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

    // update (dt) {}

    // onKeyDown(event){
    //     switch(event.keyCode)
    //     {
    //         case cc.macro.KEY.enter:
    //             if(this.selected) {
    //                 this.pickedUp = true;
    //                 this.node.scale = 1;
    //                 this.node.opacity = 255;
    //                 // this.node.destroy();
    //             }
    //             break;
    //     }
    // }
    // onBeginContact (contact, self, other) {
    //     if(other.node.tag == 1 && other.node.getComponent("Food").pickedUp) {
    //         this.selected = true;
    //         this.node.opacity = 150;
    //     }
    // }

    // onEndContact (contact, self, other) {
    //     this.selected = false;
    //     this.node.opacity = 255;
    // }
}
