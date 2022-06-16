// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
// import Player from "./Player";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    PlayerNode: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    private timer: number = 180;

    private Player = null;
    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private upDown: boolean = false;
    private downDown: boolean = false; // whether the down key is pressed
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.Player = this.PlayerNode.getComponent("Player");
    }

    onKeyDown(event){
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.Player.playerXMove(-1);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.Player.playerXMove(1);
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.upDown = true;
                this.Player.playerYMove(1);
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.downDown = true;
                this.Player.playerYMove(-1);
                break;
            // case cc.macro.KEY.d:
            //     this.gameOver();
            //     break;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.leftDown = false;
                if(this.rightDown)
                    this.Player.playerXMove(1);
                else
                    this.Player.playerXMove(0);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.rightDown = false;
                if(this.leftDown)
                    this.Player.playerXMove(-1);
                else
                    this.Player.playerXMove(0);
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.upDown = false;
                if(this.downDown)
                    this.Player.playerYMove(-1);
                else 
                    this.Player.playerYMove(0);
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.downDown = false;
                if(this.upDown)
                    this.Player.playerYMove(1);
                else 
                    this.Player.playerYMove(0);
                break;
        }
    }

    start () {

    }

    update (dt) {
        if(this.timer > 0) {
            this.timer -= dt;
        }

        cc.find("Canvas/Main Camera/Timer_bar/time").getComponent(cc.Label).string = String(Math.floor(this.timer));
    }
}
