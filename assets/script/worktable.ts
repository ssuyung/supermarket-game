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
    private contactWithPlayer1 = false;
    private contactWithPlayer2 = false;
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
            console.log("worktable touched flour");
            this.node.getChildByName("mask").active = false;
        }
        if(other.tag == 6){
            if(other.node.name == "Player1") this.contactWithPlayer1 = true;
            else if(other.node.name == "Player2") this.contactWithPlayer2 = true;
        }
        if (other.node.name == "Player" && !this.contagwithplayer) {
            this.contagwithplayer = true;
        }
    }

    // onEndContact(contact, self, other){
    //     if(other.tag == 6){
    //         if(other.node.name == "Player1") this.contactWithPlayer1 = false;
    //         else if(other.node.name == "Player2") this.contactWithPlayer2 = false;
    //     }
    //     if (other.node.name == "Player" && this.contagwithplayer) {
    //         this.contagwithplayer = false;
            
    //     }
    // }

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
                cc.log("worktable working");
                this.anim.play("time_icon");
                this.flag_for_paused = 1;
            }
        }
    }
}
