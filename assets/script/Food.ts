const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    private selected = false;
    private pickedUp = false;
    onKeyDown(event){
        switch(event.keyCode)
        {
            case cc.macro.KEY.enter:
                if(this.selected) {
                    this.pickedUp = true;
                    this.node.scale = 1;
                    this.node.opacity = 255;
                    // this.node.destroy();
                }
                break;
        }
    }

    onBeginContact (contact, self, other) {
        if(other.node.name == "Player" && !this.pickedUp) {
            this.selected = true;
            this.node.opacity = 150;
        }
    }

    onEndContact (contact, self, other) {
        this.selected = false;
        this.node.opacity = 255;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start () {

    }

    update (dt) {
        if(!this.pickedUp){
            /*if(Math.abs(this.player.x - this.node.x) < 16 && Math.abs(this.player.y - this.node.y) < 48) {
                this.selected = true;
                this.node.opacity = 150;
            } else {
                this.selected = false;
                this.node.opacity = 255;
            }*/
        } else {
            let player_node = this.player.getComponent("Player");
            // if(player_node.xMoveDir == 0){
            //     if(player_node.yMoveDir == 1){

            //     } else if(player_node)
            // }
            // this.node.setPosition(cc.v2(this.player.x+player_node.xMoveDir*16, this.player.y-8));
            this.node.setPosition(cc.v2(this.player.x, this.player.y+32));
        }
    }
}
