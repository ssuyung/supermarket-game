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

    @property(cc.Prefab)
    icecream: cc.Prefab = null;

    @property(cc.Node)
    shelf1: cc.Node = null;

    @property(cc.Node)
    shelf2: cc.Node = null;

    

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
        let shelf1Node = this.shelf1.getComponent("Shelf_1");
        let shelf2Node = this.shelf2.getComponent("Shelf_1");
        if(this.playerBeside && this.spaceDown && (!shelf1Node.occupied || !shelf2Node.occupied)){
            console.log("doing icecream");
            // console.log(dt);
            this.progressTime += dt;
            if(this.progressTime >= this.requiredTime){
                this.progressTime = 0;
                let newItem = cc.instantiate(this.icecream);
                if(!shelf1Node.occupied){
                    shelf1Node.occupied = true;
                    // console.log(shelf.getItemPosition());
                    let pos = shelf1Node.getItemPosition();
                    pos.y += 15;
                    newItem.setPosition(pos);
                    // newItem.getComponent("Food").pickedUpbyPlayer = false;
                } else {
                    shelf2Node.occupied = true;
                    // console.log(shelf.getItemPosition());
                    let pos = shelf2Node.getItemPosition();
                    pos.y += 15;
                    newItem.setPosition(pos);
                    // newItem.getComponent("Food").pickedUpbyPlayer = false;
                }
                // newItem.setPosition(cc.v2());
                // newItem.setPosition(cc.v2(this.node.x-100, this.node.y));
                cc.find("Canvas/Food").addChild(newItem);
                console.log("icecream done");
            }
        }
    }
}
