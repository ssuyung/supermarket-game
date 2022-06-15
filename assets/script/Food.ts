const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    private selected = false;

    onKeyDown(event){
        switch(event.keyCode)
        {
            case cc.macro.KEY.enter:
                if(this.selected) {
                    this.node.destroy();
                }
                break;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start () {

    }

    update (dt) {
        if(Math.abs(this.player.x - this.node.x) < 8 && Math.abs(this.player.y - this.node.y) < 32) {
            this.selected = true;
            this.node.opacity = 150;
        } else {
            this.selected = false;
            this.node.opacity = 255;
        }
    }
}
