// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

@ccclass
export default class NewClass extends cc.Component {
    
    start () {
        cc.find("Canvas/leaderBoard").active = true;
        cc.find("Canvas/leaderBoard2").active = false;
        let btn1 = new cc.Component.EventHandler();
        btn1.target = this.node;
        btn1.component = "leaderboard"
        btn1.handler = "show1";
        cc.find("Canvas/show1").getComponent(cc.Button).clickEvents.push(btn1);

        let btn2 = new cc.Component.EventHandler();
        btn2.target = this.node;
        btn2.component = "leaderboard"
        btn2.handler = "show2";
        cc.find("Canvas/show2").getComponent(cc.Button).clickEvents.push(btn2);

        let btn = new cc.Component.EventHandler();
        btn.target = this.node;
        btn.component = "leaderboard"
        btn.handler = "handler";
        cc.find("Canvas/leaderBoard/return").getComponent(cc.Button).clickEvents.push(btn);

        let btn3 = new cc.Component.EventHandler();
        btn3.target = this.node;
        btn3.component = "leaderboard"
        btn3.handler = "handler";
        cc.find("Canvas/leaderBoard2/return").getComponent(cc.Button).clickEvents.push(btn3);
    }

    readInfo() {
        firebase.database().ref('leaderBoard/').orderByChild("score").once("value", function (snapshot) {
            var name = []
            var score = []
            console.log(snapshot);
            snapshot.forEach(function (key) {
                name.push(key.val().teamName);
                score.push(key.val().score);
            })
            score.reverse();
            name.reverse();
            for (let i = 1; i <= score.length; i++) {
                cc.find("Canvas/leaderBoard/No." + String(i)).active = true;
                cc.find("Canvas/leaderBoard/No." + String(i) + "/name").getComponent(cc.Label).string = name[i - 1];
                cc.find("Canvas/leaderBoard/No." + String(i) + "/score").getComponent(cc.Label).string = score[i - 1];
            }
        }).catch(function (error) {
            alert(error.message);
        });
        cc.find("Canvas/leaderBoard").active = true;
    }

    readInfo2() {
        firebase.database().ref('leaderBoard2/').orderByChild("score").once("value", function (snapshot) {
            var name = []
            var score = []
            console.log(snapshot);
            snapshot.forEach(function (key) {
                name.push(key.val().teamName);
                score.push(key.val().score);
            })
            score.reverse();
            name.reverse();
            for (let i = 1; i <= score.length; i++) {
                cc.find("Canvas/leaderBoard2/No." + String(i)).active = true;
                cc.find("Canvas/leaderBoard2/No." + String(i) + "/name").getComponent(cc.Label).string = name[i - 1];
                cc.find("Canvas/leaderBoard2/No." + String(i) + "/score").getComponent(cc.Label).string = score[i - 1];
            }
        }).catch(function (error) {
            alert(error.message);
        });
        cc.find("Canvas/leaderBoard2").active = true;
    }

    handler(){
        cc.find("Canvas/leaderBoard").active = false;
        cc.find("Canvas/leaderBoard2").active = false;
        cc.director.loadScene("menu");
    }

    show1(){
        cc.find("Canvas/leaderBoard2").active = false;
        this.readInfo();
    }

    show2(){
        cc.find("Canvas/leaderBoard").active = false;
        this.readInfo2();
    }


    // update (dt) {}
}
