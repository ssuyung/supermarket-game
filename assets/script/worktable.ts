// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class worktable extends cc.Component {

    private isworking = false;
    private contagwithplayer = false;
    private anim = null;
    private flag_for_paused = 0;
    //When animation isn't playing, there are 3 possible cases. 2 means stop, 1 means paused, 0 not play yet.

    start () {
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
            if(this.anim.getAnimationState("time_icon").isPlaying == false && this.flag_for_paused == 2){
                this.isworking = false;
                this.flag_for_paused = 0;
            }
        }
    }

    update (dt) {
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
