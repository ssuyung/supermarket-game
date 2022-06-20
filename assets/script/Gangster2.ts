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
    text: string = 'hello';
    @property()
    playerXSpeed: number = 0;
    @property()
    playerYSpeed: number = 0;
    private xMoveDir = 0;
    private yMoveDir = 0;
    private idleFrame = null;
    private anim = null;
    private holding = false; //whether the player is holding object
    private entranceX = 380;
    private state = 0;
    private targetPlayer = null;
    private eDown = false;
    private enterDown = false;
    // private playerXSpeed = 300;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        // console.log(this.idleFrame);
        this.anim  = this.getComponent(cc.Animation);
    }
    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.e:
                this.eDown = true;
                break;
            case cc.macro.KEY.enter:
                // console.log("enter down");
                this.enterDown = true;
                break;
        }
    }
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.e:
                this.eDown = false;
                break;
            case cc.macro.KEY.enter:
                this.enterDown = false;
                break;
        }
    }

    update (dt) {
        // if(this.node.parent.getComponent("World").getPauseState()) {
        //     return;
        // }
        // console.log("gangster update");
        let pos = this.node.getPosition();
        // if(pos.y <= 250) this.yMoveDir = 1;
        // else if(pos.y >= 550) this.yMoveDir = -1;
        // this.xMoveDir = 0;
        if(this.state == 0){
            if(pos.y<=250) this.state = 1;
        } else if(this.state == 1){
            if(pos.y >= 540) this.state = 2;
        } else if(this.state == 2){
            if(pos.x >= 750){
               this.state = 4;
               this.scheduleOnce(()=>{
                    this.state = 3;
               }, 4)
            }
        } else if(this.state == 3){
            if(pos.x <= 390) this.state = 0;
        }

        // let newVelocity = cc.v2(100,100);
        // let newXDir = 1, newYDir = 1;
        switch(this.state){
            case 0:
                this.yMoveDir = -1;
                this.xMoveDir = 0;
                break;
            case 1:
                this.xMoveDir = 0;
                this.yMoveDir = 1;
                break;
            case 2:
                this.xMoveDir = 1;
                this.yMoveDir = 0;
                break;
            case 3:
                this.yMoveDir = 0;
                this.xMoveDir = -1;
                break;
            case 4:
                this.xMoveDir = 0;
                this.yMoveDir = 0;
                break;
        }
        // console.log(this.)
        // let velocity = this.node.getComponent(cc.RigidBody).linearVelocity;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerXSpeed *this.xMoveDir, this.playerYSpeed * this.yMoveDir);
        // console.log(this.node.getComponent(cc.RigidBody).linearVelocity);
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
            if(!this.anim.getAnimationState("GangsterXWalk").isPlaying) {
                this.anim.play("GangsterXWalk");
            }
            this.idleFrame = this.idle;
        } else if(this.yMoveDir != 0){
            if(this.yMoveDir==1){
                // console.log("up");
                if(!this.anim.getAnimationState("GangsterUpWalk").isPlaying) {
                    this.anim.play("GangsterUpWalk");
                }
                this.idleFrame = this.idle_up;
            }
            else if(this.yMoveDir == -1){
                // console.log("down");
                if(!this.anim.getAnimationState("GangsterDownWalk").isPlaying) {
                    this.anim.play("GangsterDownWalk");
                }
                this.idleFrame = this.idle_down;
            }
        }
        
    }
    onBeginContact(contact, self, other){
        //player
        // if(other.node.name == "Customer" || other.node.name == "")
        if(other.tag == 6){
            this.targetPlayer = other.node;
            // console.log(this.node.getComponent(cc.RigidBody).type);
            // this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
            // console.log(this.node.getComponent(cc.RigidBody).type);
            // console.log("hi");
        }
    }
    onPreSolve(contact, self, other){
        // console.log("gangster touched something");
        if(other.tag == 6){
            // console.log("gangster touched player");
            // console.log(this.targetPlayer.name);
            if((this.targetPlayer.name == "Player1" && this.eDown) || (this.targetPlayer.name == "Player2" && this.enterDown)){
                console.log("pushed by player");
                let normal = contact.getWorldManifold().normal;
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-normal.x*100, -normal.y*100);
            }
        }
    }
    // playerXMove(dir:number){
    //     this.xMoveDir = dir;
    // }
    // playerYMove(dir:number){
    //     // console.log(dir);
    //     this.yMoveDir = dir;
    // }
    // playerDropItem(){
    //     this.holding = false;
    // }
}
