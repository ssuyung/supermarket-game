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

    @property(cc.Node)
    progressBar: cc.Node = null;

    @property(cc.Node)
    icecreamParticle: cc.Node = null;

    // @property(cc.ParticleSystem)
    // icecreamParticle: cc.ParticleSystem = null;

    // @property(cc.Prefab)
    // progressBar: cc.Prefab = null;
    

    private player1Beside: boolean = false;
    private player2Beside: boolean = false;
    private enterDown: boolean = false;
    private eDown: boolean = false;
    private progressTime: number = 0;
    private requiredTime: number = 5;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.icecreamParticle.getComponent(cc.ParticleSystem).stopSystem();
    }

    start () {

    }

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.enter:
                // console.log("space down");
                this.enterDown = true;
                break;
            case cc.macro.KEY.e:
                this.eDown = true;
                break;
        }
    }

    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
                // console.log("space up");
                this.enterDown = false;
                break;
            case cc.macro.KEY.e:
                this.eDown = false;
                break;
        }
    }

    onBeginContact(contact, self, other){
        // console.log("icecream machine touched something");
        //tag6 : player
        if(other.tag == 6){
            // console.log("icecream machine touched player");
            // this.playerBeside = true;
            if(other.node.name == "Player1") this.player1Beside = true;
            else if(other.node.name == "Player2") this.player2Beside = true;
        }
    }

    onEndContact(contact, self, other){
        if(other.tag == 6){
            // console.log("player left icecream machine");
            if(other.node.name == "Player1") this.player1Beside = false;
            else if(other.node.name == "Player2") this.player2Beside = false;
        }
    }
    update (dt) {
        let shelf1Node = this.shelf1.getComponent("Shelf");
        let shelf2Node = this.shelf2.getComponent("Shelf");
        if(((this.player1Beside && this.eDown) || (this.player2Beside && this.enterDown))&& (!shelf1Node.occupied || !shelf2Node.occupied)){
            // console.log("doing icecream");
            // console.log(dt);
            this.progressTime += dt;
            this.progressBar.getComponent(cc.ProgressBar).progress += dt / this.requiredTime;
            if(this.progressTime >= this.requiredTime){
                this.progressBar.getComponent(cc.ProgressBar).progress = 0;
                this.progressTime = 0;
                let newItem = cc.instantiate(this.icecream);
                let pos = cc.v2(0,0);
                if(!shelf1Node.occupied){
                    shelf1Node.occupied = true;
                    // console.log(shelf.getItemPosition());
                    pos = shelf1Node.getItemPosition();
                    // pos.y += 15;
                    newItem.setPosition(pos);
                    // newItem.getComponent("Food").pickedUpbyPlayer = false;
                } else {
                    shelf2Node.occupied = true;
                    // console.log(shelf.getItemPosition());
                    pos = shelf2Node.getItemPosition();
                    // pos.y += 15;
                    newItem.setPosition(pos);
                    // newItem.getComponent("Food").pickedUpbyPlayer = false;
                }
                this.icecreamParticle.setPosition(pos);
                // console.log(this.icecreamParticle.x, this.icecreamParticle.y);
                // console.log(this.icecreamParticle);
                // console.log(this.icecreamParticle.getComponent())
                this.icecreamParticle.getComponent(cc.ParticleSystem).resetSystem();
                this.scheduleOnce(()=>{
                    this.icecreamParticle.getComponent(cc.ParticleSystem).stopSystem();
                }, 1);
                // newItem.setPosition(cc.v2());
                // newItem.setPosition(cc.v2(this.node.x-100, this.node.y));
                cc.find("Canvas/Food").addChild(newItem);
                // console.log("icecream done");
            }
        }
    }
}
