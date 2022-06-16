const {ccclass, property} = cc._decorator;

// this is Bouncer

@ccclass
export default class NewClass extends cc.Component {

    private idleFrame = null;
    private anim = null;
    private action1: cc.Action = null;
    private action2: cc.Action = null;
    private posX : number = 0;
    private posY : number = 0;

    private customerPath : number;

    @property(cc.SpriteFrame)
    idleSideFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    idleFrontFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    idleBackFrame: cc.SpriteFrame = null;

    // onLoad () {}

    start () {
        this.posX = this.node.x;
        this.posY = this.node.y;
        this.customerPath = Math.random();
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);

        if (this.customerPath < 0.25) this.customerMove();
        else if (this.customerPath >= 0.25 && this.customerPath < 0.5) this.customerMove_2();
        else if (this.customerPath >= 0.5 && this.customerPath < 0.75) this.customerMove_3();
        else if (this.customerPath >= 0.75) this.customerMove_4();

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
            if(!this.anim.getAnimationState("BouncerXWalk").isPlaying) {
                this.anim.play("BouncerXWalk");
            }
            this.idleFrame = this.idleSideFrame;
        } else if(deltaY != 0){
            if(deltaY > 0){
                if(!this.anim.getAnimationState("BouncerUpWalk").isPlaying) {
                    this.anim.play("BouncerUpWalk");
                }
                this.idleFrame = this.idleBackFrame;
            }
            else if(deltaY < 0){
                if(!this.anim.getAnimationState("BouncerDownWalk").isPlaying) {
                    this.anim.play("BouncerDownWalk");
                }
                this.idleFrame = this.idleFrontFrame;
            }
        }
        
    }

    // walk around (counter clockwise) near the fruit shelves
    customerMove()
    {
        var sequence1 = cc.sequence(cc.moveBy(4.4, 0, -220), cc.moveBy(0, 0, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(2, 0, -100), cc.moveBy(3, 0, 0), cc.moveBy(6, 300, 0), cc.moveBy(3, 0, 0), cc.moveBy(2, 0, 100),
         cc.moveBy(3, 0, 0), cc.moveBy(6, -300, 0), cc.moveBy(3, 0, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 4.5);
    }

    // walk back and forth near the ice cream stand
    customerMove_2()
    {
        var sequence1 = cc.sequence(cc.moveBy(4.4, 0, -220), cc.moveBy(6, 300, 0), cc.moveBy(0.6, 0, 30), cc.moveBy(3.4, 170, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(1, 50, 0), cc.moveBy(3, 0, 0), cc.moveBy(2, -100, 0), cc.moveBy(3, 0, 0), cc.moveBy(1, 50, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 14.5);
    }

    // walk back and forth near the bakery
    customerMove_3()
    {
        var sequence1 = cc.sequence(cc.moveBy(6.2, 0, -310), cc.moveBy(2, -150, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(1.4, -70, 0), cc.moveBy(3, 0, 0), cc.moveBy(2.8, 140, 0), cc.moveBy(3, 0, 0), cc.moveBy(1.4, -70, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 8.3);
    }

    // walk around (clockwise) near the shelves at bottom-right
    customerMove_4()
    {
        var sequence1 = cc.sequence(cc.moveBy(2, 0, -100), cc.moveBy(6, 300, 0), cc.moveBy(6, 0, -300), cc.moveBy(2, 100, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(2, 100, 0), cc.moveBy(3, 0, 0), cc.moveBy(2.6, 0, -130), cc.moveBy(3, 0, 0), cc.moveBy(2, -100, 0),
         cc.moveBy(3, 0, 0), cc.moveBy(2.6, 0, 130), cc.moveBy(3, 0, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 16.1);
    }
}
