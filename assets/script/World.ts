const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

// import Player from "./Player";
@ccclass
export default class NewClass extends cc.Component {
    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    @property({type:cc.Prefab})
    pause: cc.Prefab = null;
    @property({type:cc.Prefab})
    settingsPanel: cc.Prefab = null;
    @property({type:cc.Prefab})
    Gameover: cc.Prefab = null;
    @property(cc.Node)
    Player1Node: cc.Node = null;
    @property(cc.Node)
    Player2Node: cc.Node = null;
    @property
    playerNumber: number = 1;
    // LIFE-CYCLE CALLBACKS:

    private timer: number = 180;

    private audioID: number;
    private volume: number = 0.5;
    private Player1 = null;
    private Player2 = null;
    private sfx_volume: number = 0.5;
    private Player = null;
    private music_toggle: boolean = true;
    private sfx_toggle: boolean = true;
    private gameOver: boolean = false;
    private escapeDown: boolean = false;
    private escapeCounter: number = 0;
    private wDown: boolean = false;
    private aDown: boolean = false;
    private sDown: boolean = false;
    private dDown: boolean = false;
    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private upDown: boolean = false;
    private downDown: boolean = false; // whether the down key is pressed
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.Player1 = this.Player1Node.getComponent("Player");
        this.Player2 = this.Player2Node.getComponent("Player");
        let user = firebase.auth().currentUser;
        let handle = this;
        firebase.database().ref('userData/'+user.uid.toString()).once('value')
        .then((snapshot)=>{
            console.log(snapshot.val().numberOfPlayers, snapshot.val().teamName);
            handle.playerNumber = snapshot.val().numberOfPlayers;
            if(handle.playerNumber == 1) handle.Player2Node.setPosition(cc.v2(-20000,-20000));
        })
        // if(this.number == 1) this.Player2Node.setPosition(cc.v2(-20000,-20000));
    }

    getPlayerNumber() {
        return this.playerNumber;
    }

    onKeyDown(event){
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
                this.aDown = true;
                this.Player1.playerXMove(-1);
                break;
            case cc.macro.KEY.d:
                this.dDown = true;
                this.Player1.playerXMove(1);
                break;
            case cc.macro.KEY.w:
                this.wDown = true;
                this.Player1.playerYMove(1);
                break;
            case cc.macro.KEY.s:
                this.sDown = true;
                this.Player1.playerYMove(-1);
                break;
            case cc.macro.KEY.left:
                this.leftDown = true;
                this.Player2.playerXMove(-1);
                break;
            case cc.macro.KEY.right:
                this.rightDown = true;
                this.Player2.playerXMove(1);
                break;
            case cc.macro.KEY.up:
                this.upDown = true;
                this.Player2.playerYMove(1);
                break;
            case cc.macro.KEY.down:
                this.downDown = true;
                this.Player2.playerYMove(-1);
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
            case cc.macro.KEY.a:
                this.aDown = false;
                if(this.dDown)
                    this.Player1.playerXMove(1);
                else
                    this.Player1.playerXMove(0);
                break;
            case cc.macro.KEY.d:
                this.dDown = false;
                if(this.aDown)
                    this.Player1.playerXMove(-1);
                else
                    this.Player1.playerXMove(0);
                break;
            case cc.macro.KEY.w:
                this.wDown = false;
                if(this.sDown)
                    this.Player1.playerYMove(-1);
                else 
                    this.Player1.playerYMove(0);
                break;
            case cc.macro.KEY.s:
                this.sDown = false;
                if(this.wDown)
                    this.Player1.playerYMove(1);
                else 
                    this.Player1.playerYMove(0);
                break;
            case cc.macro.KEY.left:
                this.leftDown = false;
                if(this.rightDown)
                    this.Player2.playerXMove(1);
                else
                    this.Player2.playerXMove(0);
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if(this.leftDown)
                    this.Player2.playerXMove(-1);
                else
                    this.Player2.playerXMove(0);
                break;
            case cc.macro.KEY.up:
                this.upDown = false;
                if(this.downDown)
                    this.Player2.playerYMove(-1);
                else 
                    this.Player2.playerYMove(0);
                break;
            case cc.macro.KEY.down:
                this.downDown = false;
                if(this.upDown)
                    this.Player2.playerYMove(1);
                else 
                    this.Player2.playerYMove(0);
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
            cc.director.loadScene('menu');
        }));
        this.node.runAction(seq);
    }

    SettingsBtn() {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "World";
        eventHandler.handler = "Settings";
        cc.find("Canvas/Main Camera/Settings").getComponent(cc.Button).clickEvents.push(eventHandler);
    }

    Settings() {
        this.escapeDown = true;
        cc.director.getScheduler().setTimeScale(0);
        //cc.audioEngine.pauseMusic();
        var panel = cc.instantiate(this.settingsPanel);
        cc.find("Canvas").addChild(panel);
        panel.setPosition(0, 0);
        cc.find("Canvas/Panel/Music").getComponent(cc.Toggle).isChecked = this.music_toggle;
        cc.find("Canvas/Panel/SFX").getComponent(cc.Toggle).isChecked = this.sfx_toggle;
        //pause.destroy();
        let handle = this;
        //this.scheduleOnce(function() {
            cc.log("Worked");
            handle.CloseBtn();
        //}, 0.5);
        cc.log("Paused");
        this.escapeCounter = 3;

    }

    CloseBtn() {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "World";
        eventHandler.handler = "Close";
        cc.find("Canvas/Panel/Close").getComponent(cc.Button).clickEvents.push(eventHandler);
    }

    Close() {
        cc.director.getScheduler().setTimeScale(1);
        cc.find("Canvas/Panel").destroy();
        //cc.audioEngine.resumeMusic();
        this.escapeDown = false;
        this.escapeCounter = 0;
    }

    playBGM() {
        this.audioID = cc.audioEngine.playMusic(this.bgm, true); //repeat
        cc.audioEngine.setVolume(this.audioID, 0.5);
    }

    getSfxVolume() {
        if(this.sfx_toggle) return this.sfx_volume;
        else return 0;
    }

    start () {
        this.playBGM();
        this.SettingsBtn();
    }

    timeOut() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = firebase.auth().currentUser.uid;
                let money = Number(cc.find("Canvas/Main Camera/Money_bar/money").getComponent(cc.Label).string);
                
                

                firebase.database().ref('userData/' + uid).once('value').then(snapshot => {  
                    let AmountOfPlayers = snapshot.val().numberOfPlayers;
                    let TeamName = snapshot.val().teamName;
                    if(AmountOfPlayers == 1) {
                        firebase.database().ref('leaderBoard/' + TeamName).once('value').then(snapshot => {
                            if(!snapshot.exists() || money > snapshot.val().score) {
                                firebase.database().ref('leaderBoard/' + TeamName).update({
                                    teamName:TeamName,
                                    score: money
                                })
                            }
                        })
                    }else if(AmountOfPlayers == 2){
                        firebase.database().ref('leaderBoard2/' + TeamName).once('value').then(snapshot => {
                            if(!snapshot.exists() || money > snapshot.val().score) {
                                firebase.database().ref('leaderBoard2/' + TeamName).update({
                                    teamName:TeamName,
                                    score: money
                                })
                            }
                        })
                    }
                });

                /*let playerNumber = 0;
                let teamName = "";
                firebase.database().ref('userData/' + uid).once('value').then(snapshot => {  
                    playerNumber = snapshot.val().numberOfPlayers;
                    teamName = snapshot.val().teamName;
                    cc.log(playerNumber);
                    cc.log(teamName);
                    if(playerNumber == 1) {
                        firebase.database().ref('leaderBoard/' + uid).once('value').then(snapshot1 => {
                            if(money > snapshot1.val().score) {
                                firebase.database().ref('leaderBoard/' + uid).update({
                                    teamName:teamName,
                                    score: money
                                })
                            }
                        });
                    } else if(playerNumber == 2) {
                        firebase.database().ref('leaderBoard2/' + uid).once('value').then(snapshot2 => {
                            if(money > snapshot2.val().score) {
                                firebase.database().ref('leaderBoard/' + uid).update({
                                    teamName:teamName,
                                    score: money
                                })
                            }
                        });
                    }
                });*/
            }
        });
        var over = cc.instantiate(this.Gameover);
            cc.find("Canvas").addChild(over);
            var seq = cc.sequence(cc.fadeOut(1.5), cc.callFunc(function () {
                cc.audioEngine.stopAll();
                cc.director.loadScene('menu');
            }));
            this.scheduleOnce(() => {this.node.runAction(seq);}, 2);
    }

    update (dt) {
        if(this.timer > 1 && !this.escapeDown) {
            this.timer -= dt;
        } else if(this.timer < 1 && !this.gameOver) {
            this.timeOut();
            this.gameOver = true;
        }   

        if(this.escapeCounter == 1) {
            this.Pause();
        } else if(this.escapeCounter == 3) {
            
            if (!cc.find("Canvas/Panel/Music").getComponent(cc.Toggle).isChecked) {
                this.music_toggle = false;
            } else {
                this.music_toggle = true;
            }
            this.music_toggle == true ? cc.audioEngine.resumeMusic() : cc.audioEngine.pauseMusic();

            if (!cc.find("Canvas/Panel/SFX").getComponent(cc.Toggle).isChecked) {
                this.sfx_toggle = false;
            } else {
                this.sfx_toggle = true;
            }

            if (cc.find("Canvas/Panel/Volume").getComponent(cc.Slider).progress == 0.5) {
                cc.find("Canvas/Panel/Volume").getComponent(cc.Slider).progress = this.volume;
            }
            if (cc.find("Canvas/Panel/SFX_Volume").getComponent(cc.Slider).progress == 0.5) {
                cc.find("Canvas/Panel/SFX_Volume").getComponent(cc.Slider).progress = this.sfx_volume;
            }
            
            this.sfx_volume = cc.find("Canvas/Panel/SFX_Volume").getComponent(cc.Slider).progress;
            this.volume = cc.find("Canvas/Panel/Volume").getComponent(cc.Slider).progress;
            cc.audioEngine.setVolume(this.audioID, this.volume);
        }

        cc.find("Canvas/Main Camera/Timer_bar/time").getComponent(cc.Label).string = String(Math.floor(this.timer));
    }
}
