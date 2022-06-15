const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private idleFrame = null;
    private anim = null;
    private action1: cc.Action = null;
    private action2: cc.Action = null;
    private posX : number = 0;
    private posY : number = 0;

    // onLoad () {}

    start () {
        this.posX = this.node.x;
        this.posY = this.node.y;

        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);

        var sequence1 = cc.sequence(cc.moveBy(4.4, 0, -220), cc.moveBy(3, 150, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(3, 150, 0), cc.moveBy(4, 0, 0), cc.moveBy(6, -300, 0), cc.moveBy(4, 0, 0), cc.moveBy(3, 150, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.customerMove();
    }

    update (dt) {
        if (this.node.x - this.posX >= 0) this.node.scaleX = 1;
        else this.node.scaleX = -1;

        this.playAnimation();
    }

    playAnimation(){
        //let velocity = this.node.getComponent(cc.RigidBody).linearVelocity;
        //console.log("x : " + velocity.x.toString() + ", y : " + velocity.y.toString());
        let deltaX = this.node.x - this.posX;
        let deltaY = this.node.y - this.posY;
        this.posX = this.node.x;
        this.posY = this.node.y;

        if(deltaX == 0 && deltaY == 0){
            this.anim.stop();
            this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
        } else if(deltaX != 0){
            if(!this.anim.getAnimationState("BobXWalk").isPlaying) {
                this.anim.play("BobXWalk");
            }
        } else if(deltaY != 0){
            if(deltaY > 0){
                if(!this.anim.getAnimationState("BobUpWalk").isPlaying) {
                    console.log("Up");
                    this.anim.play("BobUpWalk");
                }
            }
            else if(deltaY < 0){
                if(!this.anim.getAnimationState("BobDownWalk").isPlaying) {
                    console.log("down");
                    this.anim.play("BobDownWalk");
                }
            }
        }
        
    }

    customerMove()
    {
        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 7.5);
    }
}
