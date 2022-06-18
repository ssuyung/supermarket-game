const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    private selected : boolean = false;
    private pickedUpbyPlayer : boolean = false;
    private pickedUpbyCustomer : boolean = false;
    private touchShelf : boolean = false;
    private targetShelf : cc.Node = null;
    private customer: cc.Node = null;
    private indexOnShelf : number = -1;

    onKeyDown(event){
        switch(event.keyCode)
        {
            case cc.macro.KEY.enter:
                if (this.pickedUpbyCustomer) break;
                // put down on shelf
                if (this.pickedUpbyPlayer && this.touchShelf) {
                    // console.log(this.targetShelf.node.name);
                    let shelf = this.targetShelf.getComponent("Shelf_1");
                    if (!shelf.occupied) {
                        shelf.occupied = true;
                        // console.log(shelf.getItemPosition());
                        this.node.setPosition(shelf.getItemPosition());
                        this.pickedUpbyPlayer = false;
                        this.player.getComponent("Player").holding = false;
                    }
                } 
                // pick up from shelf
                else if (this.selected) {
                    if (!this.player.getComponent("Player").holding) {
                        this.pickedUpbyPlayer = true;
                        this.node.scale = 1;
                        this.node.opacity = 255;
                        let shelf = this.targetShelf.getComponent("Shelf_1");
                        shelf.occupied = false;
                        this.player.getComponent("Player").holding = true;
                    }
                }
                break;
        }
    }

    onBeginContact (contact, self, other) {
        if (other.node.getComponent(cc.Collider).tag == 1) { // tag1 : shelf
            this.touchShelf = true;
            this.targetShelf = other.node;
            //console.log("touchshelf");
            if (!this.targetShelf.getComponent("Shelf_1").occupied) this.targetShelf.getChildByName("mask").active = true;
        }
        if (other.node.name == "Player" && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            this.selected = true;
            this.node.opacity = 150;
        }
        // tag10 : customer wants apple
        if (this.node.name == "apple" && other.node.getComponent(cc.Collider).tag == 10 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
        }
        // tag11 : customer wants watermelon
        if (this.node.name == "watermelon" && other.node.getComponent(cc.Collider).tag == 11 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
        }
    }

    onEndContact (contact, self, other) {
        if (other.node.getComponent(cc.Collider).tag == 1) {
            this.touchShelf = false;
            this.targetShelf.getChildByName("mask").active = false;
            cc.log("mask set to inactive");
        }
        if (other.node.name == "Player") {
            this.selected = false;
            this.node.opacity = 255;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // console.log(this.player);
    }

    start () {
        this.player = cc.find("Canvas/Player");
    }

    update (dt) {
        if (this.pickedUpbyPlayer) {
            if (this.player) this.node.setPosition(cc.v2(this.player.x, this.player.y + 42));
        }
        else if (this.pickedUpbyCustomer) {
            if (this.customer) this.node.setPosition(cc.v2(this.customer.x, this.customer.y + 42));
        }
    }
}
