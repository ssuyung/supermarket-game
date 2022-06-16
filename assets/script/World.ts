const {ccclass, property} = cc._decorator;
// import Player from "./Player";
@ccclass
export default class NewClass extends cc.Component {
    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    @property({type:cc.Prefab})
    pause: cc.Prefab = null;
    @property(cc.Node)
    PlayerNode: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    private timer: number = 180;

    private audioID: number;
    private Player = null;
    private escapeDown: boolean = false;
    private escapeCounter: number = 0;
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
            case cc.macro.KEY.escape:
                cc.log("Escape");
                this.escapeDown = true;
                this.escapeCounter++;
                break;
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

    getPauseState () {
        return this.escapeDown;
    }

    Pause() {
        cc.director.getScheduler().setTimeScale(0);
        cc.audioEngine.pauseMusic();
        var pause = cc.instantiate(this.pause);
        cc.find("Canvas").addChild(pause);
        pause.setPosition(0, 0);
        //pause.destroy();
        let handle = this;
        //this.scheduleOnce(function() {
            cc.log("Worked");
            handle.ContinueBtn();
            handle.QuitBtn();
        //}, 0.5);
        
        cc.log("Paused");
        this.escapeCounter++;
    }

    Continue() {
        
        cc.director.getScheduler().setTimeScale(1);
        cc.find("Canvas/Pause").destroy();
        cc.audioEngine.resumeMusic();
        this.escapeDown = false;
        this.escapeCounter = 0;
    }

    Quit() {
        cc.director.getScheduler().setTimeScale(1);
        var pause = cc.find("Canvas/Pause");
        pause.destroy();
        var seq = cc.sequence(cc.fadeOut(2.5), cc.callFunc(function () {
            cc.director.loadScene('Login');
        }));
        this.node.runAction(seq);
    }

    ContinueBtn() {
        cc.log("Hi");
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "World";
        eventHandler.handler = "Continue";
        cc.find("Canvas/Pause/Resume").getComponent(cc.Button).clickEvents.push(eventHandler);
    }

    QuitBtn() {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "World";
        eventHandler.handler = "Quit";
        cc.find("Canvas/Pause/Exit").getComponent(cc.Button).clickEvents.push(eventHandler);
    }

    playBGM() {
        this.audioID = cc.audioEngine.playMusic(this.bgm, true); //repeat
        cc.audioEngine.setVolume(this.audioID, 0.5);
    }

    start () {
        this.playBGM();
    }

    update (dt) {
        if(this.timer > 0 && !this.escapeDown) {
            this.timer -= dt;
        }

        if(this.escapeCounter == 1) {
            this.Pause();
        }

        cc.find("Canvas/Main Camera/Timer_bar/time").getComponent(cc.Label).string = String(Math.floor(this.timer));
    }
}
