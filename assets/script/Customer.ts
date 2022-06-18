const {ccclass, property} = cc._decorator;

// this is Bob

@ccclass
export default class NewClass extends cc.Component {

    private idleFrame = null;
    private anim = null;
    private action1: cc.Action = null;
    private action2: cc.Action = null;
    private posX : number = 0;
    private posY : number = 0;

    private customerDemand : number;

    @property(cc.SpriteFrame)
    idleSideFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    idleFrontFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    idleBackFrame: cc.SpriteFrame = null;

    @property(cc.Prefab)
    pizzaDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    iceCreamDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    appleDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    watermelonDialogPrefabs : cc.Prefab = null;

    // onLoad () {}

    start () {
        this.posX = this.node.x;
        this.posY = this.node.y;
        this.customerDemand = Math.random();
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);

        if (this.customerDemand < 0.25) this.customerMove();
        else if (this.customerDemand >= 0.25 && this.customerDemand < 0.5) this.customerMove_2();
        else if (this.customerDemand >= 0.5 && this.customerDemand < 0.75) this.customerMove_3();
        else if (this.customerDemand >= 0.75) this.customerMove_4();

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
            if(!this.anim.getAnimationState("BobXWalk").isPlaying) {
                this.anim.play("BobXWalk");
            }
            this.idleFrame = this.idleSideFrame;
        } else if(deltaY != 0){
            if(deltaY > 0){
                if(!this.anim.getAnimationState("BobUpWalk").isPlaying) {
                    this.anim.play("BobUpWalk");
                }
                this.idleFrame = this.idleBackFrame;
            }
            else if(deltaY < 0){
                if(!this.anim.getAnimationState("BobDownWalk").isPlaying) {
                    this.anim.play("BobDownWalk");
                }
                this.idleFrame = this.idleFrontFrame;
            }
        }
        
    }

    // set collider tag to 10 
    // and instantiate an apple dialog
    // walk around (clockwise) near the fruit shelves
    customerMove()
    {
        let randomFruit = Math.random();
        if (randomFruit < 0.5) { // apple
            this.node.getComponent(cc.Collider).tag = 10;
            this.scheduleOnce(() => {
                var appleDialog = cc.instantiate(this.appleDialogPrefabs);
                this.node.addChild(appleDialog);
                this.scheduleOnce(() => {
                    appleDialog.destroy();
                }, 5);
            }, 0);
        }
        else if (randomFruit >= 0.5 && randomFruit <= 1) { // watermelon
            this.node.getComponent(cc.Collider).tag = 11;
            this.scheduleOnce(() => {
                var watermelonDialog = cc.instantiate(this.watermelonDialogPrefabs);
                this.node.addChild(watermelonDialog);
                this.scheduleOnce(() => {
                    watermelonDialog.destroy();
                }, 5);
            }, 0);
        }

        var sequence1 = cc.sequence(cc.moveBy(4.4, 0, -220), cc.moveBy(1, 50, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(5, 250, 0), cc.moveBy(4, 0, 0), cc.moveBy(1.8, 0, -90), cc.moveBy(4, 0, 0), cc.moveBy(5, -250, 0),
         cc.moveBy(4, 0, 0), cc.moveBy(1.8, 0, 90), cc.moveBy(4, 0, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 5.5);
    }

    // instantiate an ice cream dialog
    // walk back and forth near the ice cream stand
    customerMove_2()
    {
        this.scheduleOnce(() => {
            var iceCreamDialog = cc.instantiate(this.iceCreamDialogPrefabs);
            this.node.addChild(iceCreamDialog);
            this.scheduleOnce(() => {
                iceCreamDialog.destroy();
            }, 5);
        }, 0);

        var sequence1 = cc.sequence(cc.moveBy(4.4, 0, -220), cc.moveBy(6, 300, 0), cc.moveBy(0.6, 0, 30), cc.moveBy(3.4, 170, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(1, 50, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(4, 0, 0), cc.moveBy(0.02, 0, -1), 
        cc.moveBy(2, -100, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(4, 0, 0), cc.moveBy(0.02, 0, -1), cc.moveBy(1, 50, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 14.5);
    }

    // instantiate a pizza dialog
    // walk back and forth near the bakery
    customerMove_3()
    {
        this.scheduleOnce(() => {
            var pizzaDialog = cc.instantiate(this.pizzaDialogPrefabs);
            this.node.addChild(pizzaDialog);
            this.scheduleOnce(() => {
                pizzaDialog.destroy();
            }, 5);
        }, 0);

        var sequence1 = cc.sequence(cc.moveBy(6.2, 0, -310), cc.moveBy(3, -150, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(1.4, -70, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(4, 0, 0), cc.moveBy(0.02, 0, -1), 
        cc.moveBy(2.8, 140, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(4, 0, 0), cc.moveBy(0.02, 0, -1), cc.moveBy(1.4, -70, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 9.3);
    }

    // walk around (clockwise) near the shelves at bottom-right
    customerMove_4()
    {
        var sequence1 = cc.sequence(cc.moveBy(2, 0, -100), cc.moveBy(6, 300, 0), cc.moveBy(6, 0, -300), cc.moveBy(2, 100, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(2, 100, 0), cc.moveBy(4, 0, 0), cc.moveBy(2.6, 0, -130), cc.moveBy(4, 0, 0), cc.moveBy(2, -100, 0),
         cc.moveBy(4, 0, 0), cc.moveBy(2.6, 0, 130), cc.moveBy(4, 0, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 16.1);
    }
}
