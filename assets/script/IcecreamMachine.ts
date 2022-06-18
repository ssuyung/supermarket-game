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

    private playerBeside: boolean = false;
    private spaceDown: boolean = false;
    private progressTime: number = 0;
    private requiredTime: number = 5;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }
    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
                // console.log("space down");
                this.spaceDown = true;
                break;
        }
    }

    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
                // console.log("space up");
                this.spaceDown = false;
                break;
        }
    }

    onBeginContact(contact, self, other){
        // console.log("icecream machine touched something");
        if(other.node.name == "Player"){
            // console.log("icecream machine touched player");
            this.playerBeside = true;
        }
    }

    onEndContact(contact, self, other){
        if(other.node.name == "Player"){
            // console.log("player left icecream machine");
            this.playerBeside = false;
        }
    }
    update (dt) {
        if(this.playerBeside && this.spaceDown){
            console.log("doing icecream");
            // console.log(dt);
            this.progressTime += dt;
            if(this.progressTime >= this.requiredTime){
                this.progressTime = 0;
                console.log("icecream done");
            }
        }
    }
}
