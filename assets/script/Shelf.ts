const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private occupied : boolean = false;

    // onLoad () {}

    start () {
        
    }

    getItemPosition(idx){
        let pos = this.node.getPosition();
        pos.y -= 0;
        return pos;
    }

    update (dt) {
        if (this.occupied) this.node.getChildByName("mask").active = false;
    }

    onBeginContact (contact, self, other) {
        if (!this.occupied && other.tag == 2 && !other.node.getComponent("Food").pickedUpbyCustomer) {
            this.node.getChildByName("mask").active = true;
        }
    }

    onEndContact (contact, self, other) {
        if (other.tag == 2) {
            this.node.getChildByName("mask").active = false;
        }
    }
}