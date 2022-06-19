// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class worktable extends cc.Component {

    @property(cc.Prefab)
    doughprefab: cc.Prefab = null;

    private player: cc.Node = null;

    private isworking = false;
    private contagwithplayer = false;
    private anim = null;
    private flag_for_paused = 0;
    //When animation isn't playing, there are 2 possible cases. 1 means stop, 0 not play yet.

    start () {
        this.player = cc.find("Canvas/Player");
        this.anim = this.getComponentInChildren(cc.Animation);
    }

    onBeginContact (contact, self, other) {
        if (other.node.name == "Flour") {
            this.node.getChildByName("mask").active = true;
        }
    }

    onEndContact (contact, self, other) {
        if (other.node.name == "Flour") {
            this.node.getChildByName("mask").active = false;
        }
    }

    update (dt) {
        if(this.anim.getAnimationState("time_icon").isPlaying == false && this.flag_for_paused == 1){
            this.isworking = false;
            var dough = cc.instantiate(this.doughprefab);
            dough.setPosition(cc.v2(this.node.x, this.node.y+10));
            cc.find("Canvas").addChild(dough);
            this.flag_for_paused = 0;
        }
        if(this.isworking == true){
            if(this.anim.getAnimationState("time_icon").isPlaying == false && this.flag_for_paused == 0){
                this.anim.play("time_icon");
                this.flag_for_paused = 1;
            }
        }
    }
}
