// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.SpriteFrame)
    idle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    idle_up: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    idle_down: cc.SpriteFrame = null;

    @property
    text: string = 'Adam';
    // @property
    // name: string = "name";
    @property()
    playerXSpeed: number = 0;
    @property()
    playerYSpeed: number = 0;
    private xMoveDir = 0;
    private yMoveDir = 0;
    private idleFrame = null;
    private anim = null;
    private holding = false; //whether the player is holding object
    private touchGangster: boolean = false;
    // private playerXSpeed = 300;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        // console.log(this.idleFrame);
        this.anim  = this.getComponent(cc.Animation);
    }

    update (dt) {
        // if(this.node.parent.getComponent("World").getPauseState()) {
        //     return;
        // }

        let velocity = this.node.getComponent(cc.RigidBody).linearVelocity 
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerXSpeed*this.xMoveDir, this.playerYSpeed*this.yMoveDir);

        switch(this.xMoveDir){
            case 1:
            case -1:
                this.node.scaleX = this.xMoveDir;
                break;
        }
        this.playAnimation();
    }
    playAnimation(){
        if(this.xMoveDir == 0 && this.yMoveDir == 0){
            this.anim.stop();
            this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
        } else if(this.xMoveDir != 0){
            if(!this.anim.getAnimationState(this.text+"XWalk").isPlaying) {
                this.anim.play(this.text+"XWalk");
            }
            this.idleFrame = this.idle;
        } else if(this.yMoveDir != 0){
            if(this.yMoveDir==1){
                // console.log("up");
                if(!this.anim.getAnimationState(this.text+"UpWalk").isPlaying) {
                    this.anim.play(this.text+"UpWalk");
                }
                this.idleFrame = this.idle_up;
            }
            else if(this.yMoveDir == -1){
                // console.log("down");
                if(!this.anim.getAnimationState(this.text+"DownWalk").isPlaying) {
                    this.anim.play(this.text+"DownWalk");
                }
                this.idleFrame = this.idle_down;
            }
        }
        
    }
    playerXMove(dir:number){
        this.xMoveDir = dir;
    }
    playerYMove(dir:number){
        // console.log(dir);
        this.yMoveDir = dir;
    }
    playerDropItem(){
        this.holding = false;
    }
}
