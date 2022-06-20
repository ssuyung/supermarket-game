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
        this.readInfo();
        let btn = new cc.Component.EventHandler();
        btn.target = this.node;
        btn.component = "leaderboard"
        btn.handler = "handler";
        cc.find("Canvas/leaderBoard/return").getComponent(cc.Button).clickEvents.push(btn);
    }

    readInfo() {
        firebase.database().ref('leaderBoard/').orderByChild("score").once("value", function (snapshot) {
            var name = []
            var score = []
            console.log(snapshot);
            snapshot.forEach(function (key) {
                name.push(key.val().name);
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

    handler(){
        cc.find("Canvas/leaderBoard").active = false;
        cc.director.loadScene("menu");
    }


    // update (dt) {}
}
