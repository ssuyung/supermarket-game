const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property()
    characterName : string = "";

    private idleFrame = null;
    private anim = null;
    private action1: cc.Action = null;
    private action2: cc.Action = null;
    private posX : number = 0;
    private posY : number = 0;

    private customerDemand : number;
    private toCheckOut : boolean = false;

    private counter : cc.Node = null;
    private getIndex : boolean = false;
    private Index : number;
    private atWaitingPoint : boolean = false;
    private availCounter : number = 0;
    private toCounter : boolean = false;
    private toExit : boolean = false;

    private satisfaction : number = 1;
    private timeSatisfaction : number = 1;
    private waitingTime : number = 0;
    private normalThreshold : number = 40;
    private angryThreshold : number = 60;
    private acceptablePrice : number = 0;
    private finalPrice : number = 0;

    @property(cc.SpriteFrame)
    idleSideFrame : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    idleFrontFrame : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    idleBackFrame : cc.SpriteFrame = null;

    @property(cc.Prefab)
    pizzaDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    iceCreamDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    appleDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    bananaDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    pineappleDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    watermelonDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    chipsDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    snackDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    angryDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    normalDialogPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    happyDialogPrefabs : cc.Prefab = null;

    // onLoad () {}

    start () {
        this.posX = this.node.x;
        this.posY = this.node.y;
        this.customerDemand = Math.random();
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim  = this.getComponent(cc.Animation);
        this.counter = cc.find("Canvas/Counter");

        if (this.customerDemand < 0.4) this.customerMove1();
        else if (this.customerDemand >= 0.4 && this.customerDemand < 0.6) this.customerMove2();
        else if (this.customerDemand >= 0.6 && this.customerDemand < 0.8) this.customerMove3();
        else if (this.customerDemand >= 0.8) this.customerMove4();
    }

    update (dt) {
        if (this.node.x - this.posX > 0) this.node.scaleX = 1;
        else if (this.node.x - this.posX < 0) this.node.scaleX = -1;

        this.playAnimation();

        if (this.customerDemand < 0.4) this.customerMove1Update();
        else if (this.customerDemand >= 0.4 && this.customerDemand < 0.6) this.customerMove2Update();
        else if (this.customerDemand >= 0.6 && this.customerDemand < 0.8) this.customerMove3Update();
        else if (this.customerDemand >= 0.8) this.customerMove4Update();

        this.checkOutUpdate();

        this.satisfactionUpdate(dt);
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
            if(!this.anim.getAnimationState(this.characterName + "XWalk").isPlaying) {
                this.anim.play(this.characterName + "XWalk");
            }
            this.idleFrame = this.idleSideFrame;
        } else if(deltaY != 0){
            if(deltaY > 0){
                if(!this.anim.getAnimationState(this.characterName + "UpWalk").isPlaying) {
                    this.anim.play(this.characterName + "UpWalk");
                }
                this.idleFrame = this.idleBackFrame;
            }
            else if(deltaY < 0){
                if(!this.anim.getAnimationState(this.characterName + "DownWalk").isPlaying) {
                    this.anim.play(this.characterName + "DownWalk");
                }
                this.idleFrame = this.idleFrontFrame;
            }
        } 
    }

    // set collider tag to 10, 11, 12 or 13 and instantiate a dialog according to what this customer wants
    // customer might want apple, banana, pineapple or watermelon
    // walk around the fruit shelves
    customerMove1()
    {
        let randomFruit = Math.random();
        if (randomFruit < 0.25) { // apple
            this.node.getComponent(cc.Collider).tag = 10;
            this.scheduleOnce(() => {
                var appleDialog = cc.instantiate(this.appleDialogPrefabs);
                this.node.addChild(appleDialog);
                this.scheduleOnce(() => {
                    appleDialog.destroy();
                }, 8);
            }, 0);
        }
        else if (randomFruit >= 0.25 && randomFruit < 0.5) { // banana
            this.node.getComponent(cc.Collider).tag = 11;
            this.scheduleOnce(() => {
                var bananaDialog = cc.instantiate(this.bananaDialogPrefabs);
                this.node.addChild(bananaDialog);
                this.scheduleOnce(() => {
                    bananaDialog.destroy();
                }, 8);
            }, 0);
        }
        else if (randomFruit >= 0.5 && randomFruit < 0.75) { // pineapple
            this.node.getComponent(cc.Collider).tag = 12;
            this.scheduleOnce(() => {
                var pineappleDialog = cc.instantiate(this.pineappleDialogPrefabs);
                this.node.addChild(pineappleDialog);
                this.scheduleOnce(() => {
                    pineappleDialog.destroy();
                }, 8);
            }, 0);
        }
        else if (randomFruit >= 0.75) { // watermelon
            this.node.getComponent(cc.Collider).tag = 13;
            this.scheduleOnce(() => {
                var watermelonDialog = cc.instantiate(this.watermelonDialogPrefabs);
                this.node.addChild(watermelonDialog);
                this.scheduleOnce(() => {
                    watermelonDialog.destroy();
                }, 8);
            }, 0);
        }

        var sequence1 = cc.sequence(cc.moveBy(6.2, 0, -310), cc.moveBy(0.6, 30, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(5, 250, 0), cc.moveBy(0, 0, 0), cc.moveBy(1.8, 0, -90), cc.moveBy(0, 0, 0), cc.moveBy(5, -250, 0),
        cc.moveBy(0, 0, 0), cc.moveBy(1.8, 0, 90), cc.moveBy(0, 0, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 6.9);
    }

    // when this customer wants apple, banana, pineapple or watermelon and their demand is met (tag set to 20)
    // they will go to the checkout and leave
    customerMove1Update() {
        if (this.node.getComponent(cc.Collider).tag == 20 && !this.toCheckOut && this.node.position.y < -136) {
            this.node.stopAllActions();
            let moveTime = Math.sqrt(Math.pow(this.node.position.x - (-26), 2) + Math.pow(this.node.position.y - (-212), 2)) * 0.02;
            var sequence = cc.sequence(cc.moveBy(1, 0, -50), cc.moveTo(moveTime, -26, -212), cc.moveBy(0.02, 0, -1), 
            cc.callFunc(() => {this.atWaitingPoint = true}, this));
            let action = cc.repeat(sequence, 1);
            this.scheduleOnce(() => {
                this.node.runAction(action);
            }, 0);
            this.toCheckOut = true;
        }
    }

    // set collider tag to 14 and instantiate a dialog
    // walk near the ice cream stand
    customerMove2()
    {
        this.node.getComponent(cc.Collider).tag = 14;
        this.scheduleOnce(() => {
            var iceCreamDialog = cc.instantiate(this.iceCreamDialogPrefabs);
            this.node.addChild(iceCreamDialog);
            this.scheduleOnce(() => {
                iceCreamDialog.destroy();
            }, 8);
        }, 0);

        var sequence1 = cc.sequence(cc.moveBy(4.4, 0, -220), cc.moveBy(6, 300, 0), cc.moveBy(0.6, 0, 30), cc.moveBy(2, 100, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(0.6, 0, 30), cc.moveBy(0.4, 20, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(4, 0, 0), cc.moveBy(0.02, 0, -1), 
        cc.moveBy(2, 100, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(2, 0, 0), cc.moveBy(0.02, 0, -1), cc.moveBy(1, 50, 0), cc.moveBy(0.8, 0, -40), 
        cc.moveBy(0.02, 1, 0), cc.moveBy(2, 0, 0), cc.moveBy(0.02, -1, 0), cc.moveBy(3.4, -170, 0), cc.moveBy(0.2, 0, 10));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 13);
    }

    // when this customer wants ice cream and their demand is met (tag set to 20)
    // they will go to the checkout and leave
    customerMove2Update() {
        if (this.node.getComponent(cc.Collider).tag == 20 && !this.toCheckOut && this.node.position.x < 310 && this.node.position.y < 60) {
            this.node.stopAllActions();
            var sequence = cc.sequence(cc.moveBy(2.6, -130, 0), cc.moveBy(5, 0, -250), cc.moveBy(4, -200, 0), cc.moveTo(0.5, -26, -212), 
            cc.moveBy(0.02, 0, -1), cc.callFunc(() => {this.atWaitingPoint = true}, this));
            let action = cc.repeat(sequence, 1);
            this.scheduleOnce(() => {
                this.node.runAction(action);
            }, 0);
            this.toCheckOut = true;
        }
    }

    // set collider tag to 15 instantiate a dialog
    // walk back and forth in front of the bakery
    customerMove3()
    {
        this.node.getComponent(cc.Collider).tag = 15;
        this.scheduleOnce(() => {
            var pizzaDialog = cc.instantiate(this.pizzaDialogPrefabs);
            this.node.addChild(pizzaDialog);
            this.scheduleOnce(() => {
                pizzaDialog.destroy();
            }, 8);
        }, 0);

        var sequence1 = cc.sequence(cc.moveBy(6.2, 0, -310), cc.moveBy(3.8, -190, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(1.8, -90, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(1, 0, 0), cc.moveBy(0.02, 0, -1), 
        cc.moveBy(3.8, 180, 0), cc.moveBy(0.02, 0, 1), cc.moveBy(1, 0, 0), cc.moveBy(0.02, 0, -1), cc.moveBy(1.8, -90, 0));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 10);
    }

    // when this customer wants pizza and their demand is met (tag set to 20)
    // they will go to the checkout and leave
    customerMove3Update() {
        if (this.node.getComponent(cc.Collider).tag == 20 && !this.toCheckOut && this.node.position.x > -240) {
            this.node.stopAllActions();
            var sequence = cc.sequence(cc.moveBy(2, 100, 0), cc.moveBy(2.6, 0, -130), cc.moveBy(1, 50, 0),cc.moveTo(1.5, -26, -212), cc.moveBy(0.02, 0, -1), 
            cc.callFunc(() => {this.atWaitingPoint = true}, this));
            let action = cc.repeat(sequence, 1);
            this.scheduleOnce(() => {
                this.node.runAction(action);
            }, 0);
            this.toCheckOut = true;
        }
    }

    // set collider tag to 17 or 18 and instantiate a dialog according to what this customer wants
    // customer might want chips or snack
    customerMove4()
    {
        let randomGood = Math.random();
        if (randomGood < 0.5) { // chips
            this.node.getComponent(cc.Collider).tag = 17;
            this.scheduleOnce(() => {
                var chipsDialog = cc.instantiate(this.chipsDialogPrefabs);
                this.node.addChild(chipsDialog);
                this.scheduleOnce(() => {
                    chipsDialog.destroy();
                }, 8);
            }, 0);
        }
        else if (randomGood >= 0.5) { // snack
            this.node.getComponent(cc.Collider).tag = 18;
            this.scheduleOnce(() => {
                var snackDialog = cc.instantiate(this.snackDialogPrefabs);
                this.node.addChild(snackDialog);
                this.scheduleOnce(() => {
                    snackDialog.destroy();
                }, 8);
            }, 0);
        }

        var sequence1 = cc.sequence(cc.moveBy(1.4, 0, -70), cc.moveBy(1.6, 80, 0));
        this.action1 = cc.repeat(sequence1, 1);

        var sequence2 = cc.sequence(cc.moveBy(3.4, 170, 0), cc.moveBy(2.6, 0, -130), cc.moveBy(4, -200, 0), cc.moveBy(2, 0, 0), 
        cc.moveBy(5, 250, 0), cc.moveBy(4, 0, -200), cc.moveBy(5.4, 270, 0), cc.moveBy(2, 0, -100), cc.moveBy(5, -250, 0), cc.moveBy(7.8, 0, 390),
        cc.moveBy(4.8, -240, 0), cc.moveBy(0.8, 0, 40));
        this.action2 = cc.repeatForever(sequence2);

        this.scheduleOnce(() => {
            this.node.runAction(this.action1);
        }, 0);
        this.scheduleOnce(() => {
            this.node.runAction(this.action2);
        }, 3);
    }

    // when this customer wants chips or snack and their demand is met (tag set to 20)
    // they will go to the checkout and leave
    customerMove4Update() {
        let atPoint1 = false, atPoint2 = false;
        if (this.node.x < -40 && this.node.y < 100) atPoint1 = true;
        if (this.node.x < 210 && this.node.y < -200) atPoint2 = true;
        if (this.node.getComponent(cc.Collider).tag == 20 && !this.toCheckOut && atPoint1) {
            this.node.stopAllActions();
            var sequence = cc.sequence(cc.moveBy(1, -50, 0), cc.moveBy(5, 0, -250), cc.moveTo(1.5, -26, -212), cc.moveBy(0.02, 0, -1),
            cc.callFunc(() => {this.atWaitingPoint = true}, this));
            let action = cc.repeat(sequence, 1);
            this.scheduleOnce(() => {
                this.node.runAction(action);
            }, 0);
            this.toCheckOut = true;
        }
        else if (this.node.getComponent(cc.Collider).tag == 20 && !this.toCheckOut && atPoint2) {
            this.node.stopAllActions();
            var sequence = cc.sequence(cc.moveBy(1.6, -80, 0), cc.moveBy(1, 0, 50), cc.moveBy(2.4, -120, 0), cc.moveTo(1.5, -26, -212), cc.moveBy(0.02, 0, -1), 
            cc.callFunc(() => {this.atWaitingPoint = true}, this));
            let action = cc.repeat(sequence, 1);
            this.scheduleOnce(() => {
                this.node.runAction(action);
            }, 0);
            this.toCheckOut = true;
        }
    }

    checkOutUpdate() {
        if (this.atWaitingPoint) {
            if (!this.getIndex) {
                this.Index = this.counter.getComponent("CounterMgr").getCustomerIndex();
                this.getIndex = true;
            }

            if (!this.toCounter) this.availCounter = this.counter.getComponent("CounterMgr").checkAvailablebyIndex(this.Index);
            if (this.availCounter == 1 && !this.toCounter) {
                this.toCounter = true;
                var sequence = cc.sequence(cc.moveBy(1.6, 0, -80), cc.moveBy(1.2, -50, 0));
                let action = cc.repeat(sequence, 1);
                this.node.runAction(action);
            }
            else if (this.availCounter == 2 && !this.toCounter) {
                this.toCounter = true;
                var sequence = cc.sequence(cc.moveBy(1.6, 0, -80), cc.moveBy(0.8, 40, 0));
                let action = cc.repeat(sequence, 1);
                this.node.runAction(action);
            }
        }
        // tag 21 : customer paid
        if (this.node.getComponent(cc.Collider).tag == 21 && !this.toExit) {
            this.toExit = true;
            if (this.availCounter == 1) {
                //this.counter.getComponent("CounterMgr").counter_1_occupied = false;
                var sequence = cc.sequence(cc.moveBy(3, 0, 0),
                cc.callFunc(() => {this.counter.getComponent("CounterMgr").counter_1_occupied = false;}, this),
                cc.moveBy(0.6, 30, 0), cc.moveBy(4, 0, -200), cc.callFunc(() => {this.node.destroy();}, this));
            }
            else if (this.availCounter == 2) {
                //this.counter.getComponent("CounterMgr").counter_2_occupied = false;
                var sequence = cc.sequence(cc.moveBy(3, 0, 0),
                cc.callFunc(() => {this.counter.getComponent("CounterMgr").counter_2_occupied = false;}, this),
                cc.moveBy(0.6, -30, 0), cc.moveBy(4, 0, -200), cc.callFunc(() => {this.node.destroy()}, this));
            }
            let action = cc.repeat(sequence, 1);
            this.node.runAction(action);
        }
    }

    satisfactionUpdate(dt) {
        this.waitingTime += dt;

        if (this.waitingTime < this.normalThreshold) this.timeSatisfaction  = 2;
        else if (this.waitingTime >= this.normalThreshold && this.waitingTime < this.angryThreshold) this.timeSatisfaction  = 1;
        else if (this.waitingTime >= this.angryThreshold) this.timeSatisfaction  = 0;
    }

    getCustomerTimeSatisfaction() {
        return this.timeSatisfaction;
    }

    showDialog() {
        // customer happy
        if (this.timeSatisfaction == 2) {
            var Dialog = cc.instantiate(this.happyDialogPrefabs);
            cc.find('Canvas').addChild(Dialog);
            Dialog.setPosition(this.node.x, this.node.y + 40);
            this.scheduleOnce(() => {
                Dialog.destroy();
            }, 3);
        }
        // customer feels nothing
        else if (this.timeSatisfaction == 1) {
            var Dialog = cc.instantiate(this.normalDialogPrefabs);
            cc.find('Canvas').addChild(Dialog);
            Dialog.setPosition(this.node.x, this.node.y + 40);
            this.scheduleOnce(() => {
                Dialog.destroy();
            }, 3);
        }
        // customer displeased
        else if (this.timeSatisfaction == 0) {
            var Dialog = cc.instantiate(this.angryDialogPrefabs);
            cc.find('Canvas').addChild(Dialog);
            Dialog.setPosition(this.node.x, this.node.y + 40);
            this.scheduleOnce(() => {
                Dialog.destroy();
            }, 3);
        }
    }

    getCustomerPrice(listedPrice) {
        if (this.timeSatisfaction == 2) this.acceptablePrice = 60;
        else if (this.timeSatisfaction == 1) this.acceptablePrice = 40;
        else if (this.timeSatisfaction == 0) this.acceptablePrice = 30;

        if (listedPrice > this.acceptablePrice) this.satisfaction = 0; // customer displeased
        else this.satisfaction = 1; // customer happy

        if (this.satisfaction == 0) {
            this.finalPrice = Math.floor(this.acceptablePrice * Math.max(0.5, (1 - ((listedPrice - this.acceptablePrice) / this.acceptablePrice))));
            var Dialog = cc.instantiate(this.angryDialogPrefabs);
            cc.find('Canvas').addChild(Dialog);
            Dialog.setPosition(this.node.x, this.node.y + 40);
            this.scheduleOnce(() => {
                Dialog.destroy();
            }, 3);
        }
        else if (this.satisfaction == 1) {
            this.finalPrice = listedPrice;
            var Dialog = cc.instantiate(this.happyDialogPrefabs);
            cc.find('Canvas').addChild(Dialog);
            Dialog.setPosition(this.node.x, this.node.y + 40);
            this.scheduleOnce(() => {
                Dialog.destroy();
            }, 3);
        }

        return this.finalPrice;
    }
}
