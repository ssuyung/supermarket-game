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

    private player: cc.Node = null;

    private isworking = false;
    private contagwithplayer = false;
    private anim = null;
    private anim2 = null;
    private flag_for_paused = 0;
    //When animation isn't playing, there are 3 possible cases. 1 means stop, 0 not play yet.

    start () {
        this.player = cc.find("Canvas/Player");
        this.anim = this.getComponent(cc.Animation);
        this.anim2 = this.getComponentInChildren(cc.Animation);
    }

    update (dt) {
        if(this.anim.getAnimationState("oven").isPlaying == false && this.flag_for_paused == 1){
            this.anim.getAnimationState("oven").isPlaying == false
            this.isworking = false;
            var pizza = cc.instantiate(this.pizzaPrefab);
            pizza.setPosition(cc.v2(this.node.x-1.5, this.node.y-5));
            cc.find("Canvas").addChild(pizza);
        }
        if(this.isworking == true){
            if(this.anim.getAnimationState("oven").isPlaying == false && this.flag_for_paused == 0){
                this.anim.play("oven");
                this.flag_for_paused = 1;
            }
        }
    }
}
