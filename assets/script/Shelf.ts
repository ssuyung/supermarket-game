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

    private maxNumberOfItems = 6;
    private curNumberOfItems = 0;
    private width = 32;
    private height = 16;
    private itemOnShelf:boolean[] = [false, false, false, false, false, false];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    getItemIndex(){
        for(let i=0; i<=6;i++){
            if(this.itemOnShelf[i] == false){
                this.itemOnShelf[i] = true;
                return i+1;
            }
        }
    }
    getItemPosition(idx){
        let pos = this.node.getPosition();
        if(idx>3) pos.y += this.height;
        let seq = idx%3;
        if(seq == 1) pos.x = pos.x - this.width;
        else if(seq == 3) pos.x = pos.x + this.width;
        return pos;
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
