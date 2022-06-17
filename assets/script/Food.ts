const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    private selected = false;
    private pickedUp = false;
    private touchShelf = false;
    private targetShelf = null;
    private indexOnShelf = -1;
    onKeyDown(event){
        switch(event.keyCode)
        {
            case cc.macro.KEY.enter:
                //put down on shelf
                if(this.pickedUp && this.touchShelf){
                    // console.log(this.targetShelf.node.name);
                    let shelf = this.targetShelf.node.getComponent("Shelf");
                    if(shelf.curNumberOfItems<shelf.maxNumberOfItems){
                        shelf.curNumberOfItems++;
                        console.log(shelf.curNumberOfItems);
                        // console.log(shelf.getItemPosition());
                        this.indexOnShelf = shelf.getItemIndex();
                        console.log("index: "+this.indexOnShelf);
                        this.node.setPosition(shelf.getItemPosition(this.indexOnShelf));
                        this.pickedUp = false;
                        this.player.getComponent("Player").holding = false;
                    }
                    this.targetShelf.node.getComponent("Shelf")
                } 
                //pick up from shelf
                else if(this.selected) {
                    if(!this.player.getComponent("Player").holding){
                        this.pickedUp = true;
                        this.node.scale = 1;
                        this.node.opacity = 255;
                        let shelf = this.targetShelf.node.getComponent("Shelf");
                        shelf.curNumberOfItems -- ;
                        shelf.itemOnShelf[this.indexOnShelf-1] = false;
                        console.log(this.targetShelf.node.getComponent("Shelf").curNumberOfItems);
                        this.player.getComponent("Player").holding = true;
                    }
                }
                break;
        }
    }

    onBeginContact (contact, self, other) {
        if(other.node.getComponent(cc.Collider).tag == 1){ // tag1 = shelf
            this.touchShelf = true;
            this.targetShelf = other;
        }
        if(other.node.name == "Player" && !this.pickedUp) {
            this.selected = true;
            this.node.opacity = 150;
        } 
        
    }

    onEndContact (contact, self, other) {
        if(other.node.name == "Player"){
            this.selected = false;
            this.node.opacity = 255;
        } 
        if(other.node.getComponent(cc.Collider).tag == 1){
            this.touchShelf = false;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // console.log(this.player);
    }

    start () {

    }

    update (dt) {
        // console.log(this.touchShelf);
        if(!this.pickedUp){
            /*if(Math.abs(this.player.x - this.node.x) < 16 && Math.abs(this.player.y - this.node.y) < 48) {
                this.selected = true;
                this.node.opacity = 150;
            } else {
                this.selected = false;
                this.node.opacity = 255;
            }*/
        } else {
            // let player_node = this.player.getComponent("Player");
            // if(player_node.xMoveDir == 0){
            //     if(player_node.yMoveDir == 1){

            //     } else if(player_node)
            // }
            // this.node.setPosition(cc.v2(this.player.x+player_node.xMoveDir*16, this.player.y-8));
            // console.log(this.player);
            if(this.player)this.node.setPosition(cc.v2(this.player.x, this.player.y + 42));
        }
    }
}
