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
    //When animation isn't playing, there are 3 possible cases. 2 means stop, 1 means paused, 0 not play yet.

    start () {
        this.player = cc.find("Canvas/Player");
        this.anim = this.getComponentInChildren(cc.Animation)
        console.log(this.anim.name);
    }

    onBeginContact (contact, self, other) {
        if (other.node.name == "Player" && !this.contagwithplayer) {
            this.contagwithplayer = true;
        }
    }

    onEndContact(contact, self, other){
        if (other.node.name == "Player" && this.contagwithplayer) {
            this.contagwithplayer = false;
            
        }
    }

    update (dt) {
        console.log(this.isworking,this.contagwithplayer);
        if(this.anim.getAnimationState("time_icon").isPlaying == false && this.flag_for_paused == 2){
            this.isworking = false;
            this.flag_for_paused = 0;
            var dough = cc.instantiate(this.doughprefab);
            dough.setPosition(cc.v2(this.node.x, this.node.y+10));
            cc.find("Canvas").addChild(dough);
        }
        if(this.isworking == true && this.contagwithplayer){
            if(this.anim.getAnimationState("time_icon").isPaused){
                this.anim.resume("time_icon");
                this.flag_for_paused = 2;
            }
            else if(this.anim.getAnimationState("time_icon").isPlaying == false && this.flag_for_paused == 0){
                this.anim.play("time_icon");
                this.flag_for_paused = 2;
            }
        }else if(this.isworking == true && !this.contagwithplayer){
            if(this.anim.getAnimationState("time_icon").isPlaying){
                this.anim.pause("time_icon");
                this.flag_for_paused = 1;
            }
        }
    }
}
