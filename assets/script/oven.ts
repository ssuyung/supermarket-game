// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class oven extends cc.Component {

    @property(cc.Prefab)
    pizzaPrefab: cc.Prefab = null;
    @property({type:cc.AudioClip})
    finishSound: cc.AudioClip = null;

    private player: cc.Node = null;

    private isworking = false;
    private contagwithplayer = false;
    private anim = null;
    private flag_for_paused = 0;
    //When animation isn't playing, there are 2 possible cases. 1 means stop, 0 not play yet.

    start () {
        //this.player = cc.find("Canvas/Player");
        this.anim = this.getComponent(cc.Animation);
    }

    onBeginContact (contact, self, other) {
        if (other.node.name == "dough") {
            this.node.getChildByName("mask").active = true;
        }
    }

    onEndContact (contact, self, other) {
        if (other.node.name == "dough") {
            this.node.getChildByName("mask").active = false;
        }
    }

    update (dt) {
        if(this.anim.getAnimationState("oven").isPlaying == false && this.flag_for_paused == 1){
            this.isworking = false;
            var pizza = cc.instantiate(this.pizzaPrefab);
            pizza.setPosition(cc.v2(this.node.x-1.5, this.node.y-5));
            cc.find("Canvas").addChild(pizza);
            this.flag_for_paused = 0;
            cc.audioEngine.setVolume(cc.audioEngine.playEffect(this.finishSound, false), cc.find("Canvas").getComponent("World").getSfxVolume());
        }
        if(this.isworking == true){
            if(this.anim.getAnimationState("oven").isPlaying == false && this.flag_for_paused == 0){
                this.anim.play("oven");
                this.flag_for_paused = 1;
            }
        }
    }
}
