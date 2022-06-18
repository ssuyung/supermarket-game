const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    item: cc.Prefab = null;

    private available: boolean = false;

    onEndContact (contact, self, other) {
        if(other.tag == 0) { // Food
            this.scheduleOnce(() => {this.restock();}, 0.5);
            //this.restock();
        }
    }

    restock() {
        var item = cc.instantiate(this.item);
        this.node.addChild(item);
        item.setPosition(0, 0);
        item.opacity = 0;
        item.runAction(cc.fadeIn(1));
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var item = cc.instantiate(this.item);
        this.node.addChild(item);
        item.setPosition(0, 0);
    }

    // update (dt) {}
}
