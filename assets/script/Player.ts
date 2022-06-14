// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property()
    playerXSpeed: number = 0;

    private moveDir = 0;
    private idleFrame = null;
    private anim = null;
    // private playerXSpeed = 300;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        // console.log(this.idleFrame);
        // this.anim  = this.getComponent(cc.Animation);
    }

    update (dt) {
        let velocity = this.node.getComponent(cc.RigidBody).linearVelocity 
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerXSpeed*this.moveDir, velocity.y);
        switch(this.moveDir){
            case 1:
            case -1:
                this.node.scaleX = this.moveDir;
                break;
        }
        // if(this.node.scaleX == 0){

        // }
        // this.node.scaleX = this.moveDir;
        console.log("speed: " + this.node.getComponent(cc.RigidBody).linearVelocity);
    }
    playerMove(dir:number){
        this.moveDir = dir;
    }
}
