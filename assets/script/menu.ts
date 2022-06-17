// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    easy: cc.Toggle = null;

    @property(cc.Toggle)
    medium: cc.Toggle = null;

    @property(cc.Toggle)
    hard: cc.Toggle = null;

    @property(cc.Toggle)
    player1: cc.Toggle = null;

    @property(cc.Toggle)
    player2: cc.Toggle = null;

    private mode=0;//easy: 0, medium: 1, hard: 2
    private player=1;//number of players.

    start () {
        let btn = new cc.Component.EventHandler();
        btn.target = this.node;
        btn.component = "menu";
        btn.handler = "loadScene";
        cc.find("Canvas/Start Button").getComponent(cc.Button).clickEvents.push(btn);
    }

    loadScene(){
        this.controller();
        console.log(this.mode, this.player);
        if(this.mode==0 && this.player==1){
            //cc.director.loadScene("Stage1 - 109062129");
        }else if(this.mode==0 && this.player==2){
            //cc.director.loadScene("Stage1 - 109062129");
        }else if(this.mode==1 && this.player==1){
            //cc.director.loadScene("Stage1 - 109062129");
        }else if(this.mode==1 && this.player==2){
            //cc.director.loadScene("Stage1 - 109062129");
        }else if(this.mode==2 && this.player==1){
            //cc.director.loadScene("Stage1 - 109062129");
        }else if(this.mode==2 && this.player==2){
            //cc.director.loadScene("Stage1 - 109062129");
        }
    }

    controller(){
        if(this.easy.isChecked) this.mode=0;
        else if(this.medium.isChecked) this.mode=1;
        else if(this.hard.isChecked) this.mode=2;

        if(this.player1.isChecked) this.player=1;
        else if(this.player2.isChecked) this.player=2;
    }
}
