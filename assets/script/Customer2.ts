const {ccclass, property} = cc._decorator;


// this is OldWoman

@ccclass
export default class NewClass extends cc.Component {

    private idleFrame = null;
    private anim = null;
    private action1: cc.Action = null;
    private action2: cc.Action = null;
    private posX : number = 0;
    private posY : number = 0;

    private customerPath : number;

    // onLoad () {}

    start () {
        this.posX = this.node.x;
        this.posY = this.node.y;
        this.customerPath = Math.random();
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);

        /*if (this.customerPath < 0.5)*/ this.customerMove();
        //else if (this.customerPath >= 0.5) this.customerMove_2();

        this.scheduleOnce(() => {
            this.node.getChildByName("dialog").active = false;
        }, 4);
    }

    update (dt) {
        if (this.node.x - this.posX > 0) this.node.scaleX = 1;
        else if (this.node.x - this.posX < 0) this.node.scaleX = -1;

        this.playAnimation();
    }

    playAnimation(){
        let deltaX = this.node.x - this.posX;
        let deltaY = this.node.y - this.posY;
        this.posX = this.node.x;
        this.posY = this.node.y;

        if(deltaX == 0 && deltaY == 0){
            this.anim.stop();
            this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
        } else if(deltaX != 0){
            if(!this.anim.getAnimationState("OldWomanXWalk").isPlaying) {
                this.anim.play("OldWomanXWalk");
            }
        } else if(deltaY != 0){
            if(deltaY > 0){
                if(!this.anim.getAnimationState("OldWomanUpWalk").isPlaying) {
                    console.log("Up");
                    this.anim.play("OldWomanUpWalk");
                }
            }
            else if(deltaY < 0){
                if(!this.anim.getAnimationState("OldWomanDownWalk").isPlaying) {
                    console.log("down");
                    this.anim.play("OldWomanDownWalk");
                }
            }
        }
        
    }

    // walk to shelves and then to the counter
    customerMove()
    {
        var sequence1 = cc.sequence(cc.moveBy(5.2, 0, -260), cc.moveBy(1, 50, 0), cc.moveBy(3, 0, 0), cc.moveBy(0.4, -20, 0), 
        cc.moveBy(3.6, 0, -180), cc.moveBy(0.8, 40, 0), cc.moveBy(1, 0, -50), cc.moveBy(0.4, -20, 0), cc.moveBy(3, 0, 0), cc.moveBy(0.4, 20, 0), cc.moveBy(6, 0, -300));
        this.action1 = cc.repeat(sequence1, 1);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
    }

    // walk back and forth near the bakery
    customerMove_2()
    {
        var sequence1 = cc.sequence(cc.moveBy(6.2, 0, -310), cc.moveBy(2, -150, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(1.4, -70, 0), cc.moveBy(4, 0, 0), cc.moveBy(2.8, 140, 0), cc.moveBy(4, 0, 0), cc.moveBy(1.4, -70, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 8.3);
    }
}
