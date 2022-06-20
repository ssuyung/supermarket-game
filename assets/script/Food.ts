const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({type:cc.AudioClip})
    dropSound: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    pickSound: cc.AudioClip = null;
    private audioID: number;

    private player1: cc.Node = null;
    private player2: cc.Node = null;
    private indexOfPlayerHolding: number = 0;

    private targetPlayer: cc.Node = null;
    private selected : boolean = false;
    private pickedUpbyPlayer : boolean = false;
    private pickedUpbyCustomer : boolean = false;
    private touchShelf : boolean = false;
    private targetShelf : cc.Node = null;
    private customer: cc.Node = null;
    private keyDown : boolean = false;
    private touchStorage: boolean = false;

    /* Modify-1 ycchu */
    private touchWorkTable = false;
    private targetWorkTable = null;
    private touchOven = false;
    private targetOven = null;
    /* Modify end */

    onKeyDown(event){
        // console.log("food keydown");
        if((event.keyCode == cc.macro.KEY.enter && this.targetPlayer==this.player2) || (event.keyCode == cc.macro.KEY.e && this.targetPlayer==this.player1)){
            console.log("food in ");
            console.log(this.selected);
            // if (this.keyDown) return;
            if (this.pickedUpbyCustomer) return;
            // put down on shelf
            if (this.pickedUpbyPlayer && this.touchShelf) {
                let shelf = this.targetShelf.getComponent("Shelf");
                if (!shelf.occupied) {
                    shelf.occupied = true;
                    this.node.setPosition(shelf.getItemPosition());
                    this.pickedUpbyPlayer = false;
                    // this.indexOfPlayerHolding = 0;
                    this.targetPlayer.getComponent("Player").holding = false;
                    this.targetPlayer = null;
                }
            } 
            // pick up from shelf
            else if (this.selected) {
                console.log("food picked up from shelf");
                console.log(this.targetPlayer.getComponent("Player").holding);
                if (!this.targetPlayer.getComponent("Player").holding) {
                    this.pickedUpbyPlayer = true;
                    // if(this.targetPlayer == this.player1) this.indexOfPlayerHolding = 1;
                    // else if(this.targetPlayer == this.player2) this.indexOfPlayerHolding = 2;
                    this.node.scale = 1;
                    this.node.opacity = 255;
                    if(!this.touchStorage) {
                        let shelf = this.targetShelf.getComponent("Shelf");
                        shelf.occupied = false;
                    }
                    this.targetPlayer.getComponent("Player").holding = true;
                }
            }
            /* Modify-2 ycchu */
            else if(this.pickedUpbyPlayer && this.touchWorkTable){
                let worktable = this.targetWorkTable.node.getComponent("worktable");
                if(worktable.isworking == false){
                    worktable.isworking = true;
                    setTimeout(function () {
                        this.targetPlayer.getComponent("Player").holding = false;
                        this.pickedUpbyPlayer = false;
                        this.player.getComponent("Player").holding = false;
                    }
                    cc.audioEngine.setVolume(cc.audioEngine.playEffect(this.dropSound, false), cc.find("Canvas").getComponent("World").getSfxVolume());
                    
                } 
                // pick up from shelf
                else if (this.selected) {
                    console.log("food picked up from shelf");
                    if (!this.targetPlayer.getComponent("Player").holding) {
                        this.pickedUpbyPlayer = true;
                        this.node.scale = 1;
                        this.node.opacity = 255;
                        if(!this.touchStorage) {
                            if (this.targetShelf) {
                                var shelf = this.targetShelf.getComponent("Shelf");
                                shelf.occupied = false;
                            }
                        }
                        this.targetPlayer.getComponent("Player").holding = true;
                        // cc.audioEngine.setVolume(cc.audioEngine.playEffect(this.pickSound, false), 0.5);
                        // this.player.getComponent("Player").holding = true;
                        cc.audioEngine.setVolume(cc.audioEngine.playEffect(this.pickSound, false), cc.find("Canvas").getComponent("World").getSfxVolume());
                    }
                }
                // this.targetShelf.getComponent("Shelf")
            }else if(this.pickedUpbyPlayer && this.touchOven){
                let oven = this.targetOven.node.getComponent("oven");
                if(oven.isworking == false){
                    oven.isworking = true;
                    setTimeout(function () {
                        this.targetPlayer.getComponent("Player").holding = false;
                        this.pickedUpbyPlayer = false;
                        this.node.destroy();
                    }.bind(this), 100); 
                }
                // this.targetShelf.getComponent("Shelf")
            }

            /* Modify end */
            this.keyDown = true;
        }
        // switch(event.keyCode)
        // {
        //     case cc.macro.KEY.enter:
        //         if (this.keyDown) break;
        //         if (this.pickedUpbyCustomer) break;
        //         // put down on shelf
        //         if (this.pickedUpbyPlayer && this.touchShelf) {
        //             let shelf = this.targetShelf.getComponent("Shelf");
        //             if (!shelf.occupied) {
        //                 shelf.occupied = true;
        //                 this.node.setPosition(shelf.getItemPosition());
        //                 this.pickedUpbyPlayer = false;
        //                 this.targetPlayer.getComponent("Player").holding = false;
        //                 this.targetPlayer = null;
        //             }
        //         } 
        //         // pick up from shelf
        //         else if (this.selected) {
        //             console.log("food picked up from shelf");
        //             if (!this.targetPlayer.getComponent("Player").holding) {
        //                 this.pickedUpbyPlayer = true;
        //                 this.node.scale = 1;
        //                 this.node.opacity = 255;
        //                 if(!this.touchStorage) {
        //                     let shelf = this.targetShelf.getComponent("Shelf");
        //                     shelf.occupied = false;
        //                 }
        //                 this.targetPlayer.getComponent("Player").holding = true;
        //             }
        //         }
        //         /* Modify-2 ycchu */
        //         else if(this.pickedUpbyPlayer && this.touchWorkTable){
        //             let worktable = this.targetWorkTable.node.getComponent("worktable");
        //             if(worktable.isworking == false){
        //                 worktable.isworking = true;
        //                 setTimeout(function () {
        //                     this.targetPlayer.getComponent("Player").holding = false;
        //                     this.pickedUpbyPlayer = false;
        //                     this.node.destroy();
        //                 }.bind(this), 100); 
        //             }
        //             // this.targetShelf.getComponent("Shelf")
        //         }else if(this.pickedUpbyPlayer && this.touchOven){
        //             let oven = this.targetOven.node.getComponent("oven");
        //             if(oven.isworking == false){
        //                 oven.isworking = true;
        //                 setTimeout(function () {
        //                     this.targetPlayer.getComponent("Player").holding = false;
        //                     this.pickedUpbyPlayer = false;
        //                     this.node.destroy();
        //                 }.bind(this), 100); 
        //             }
        //             // this.targetShelf.getComponent("Shelf")
        //         }

        //         /* Modify end */
        //         this.keyDown = true;
        //         break;
        // }
    }
    playerHolding(){
        if(this.targetPlayer == this.player1) return 1;
        else if(this.targetPlayer == this.player2) return 2;
        else return 0;
    }

    putInTrash(){
        this.targetPlayer.getComponent("Player").holding = false;
        this.node.destroy();
    }
    onKeyUp(event) {
        switch(event.keyCode)
        {
            case cc.macro.KEY.enter:
                this.keyDown = false;
                break;
            case cc.macro.KEY.e:
        }
    }
    
    onBeginContact (contact, self, other) {
        console.log(this.node.name + " touches "+other.node.name);
        if (other.tag == 1) { // tag1 : shelf
            this.touchShelf = true;
            this.targetShelf = other.node;
            // cc.log("food touches shelf");
        }
        if (other.tag == 6 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            if(other.node.name == "Player1"){
                console.log(this.node.name + " is touched by player1");
                this.targetPlayer = this.player1;
            } else if(other.node.name == "Player2"){
                console.log(this.node.name + " is touched by player2");
                this.targetPlayer = this.player2;
            }
            
            // this.targetPlayer = other.node;
            this.selected = true;
            this.node.opacity = 150;
        }
        // tag10 : customer wants apple
        if (this.node.name == "apple" && other.tag == 10 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag11 : customer wants banana
        if (this.node.name == "banana" && other.tag == 11 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag12 : customer wants pineapple
        if (this.node.name == "pineapple" && other.tag == 12 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag13 : customer wants watermelon
        if (this.node.name == "watermelon" && other.tag == 13 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag14 : customer wants ice cream
        if (this.node.name == "Icecream" && other.tag == 14 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            if (this.targetShelf) this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag15 : customer wants pizza
        if (this.node.name == "pizza" && other.tag == 15 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag17 : customer wants chips
        if (this.node.name == "chips" && other.tag == 17 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        // tag18 : customer wants snacks
        if (this.node.name == "snacks" && other.tag == 18 && !this.pickedUpbyPlayer && !this.pickedUpbyCustomer) {
            other.tag = 20;
            this.customer = other.node;
            this.pickedUpbyCustomer = true;
            this.targetShelf.getComponent("Shelf").occupied = false;
        }
        /* Modify-3 ycchu */
        if(other.node.getComponent(cc.Collider).tag == 4){//tag4 = worktable 
            if(other.node.name == "worktable" && this.node.name == "Flour"){
                this.touchWorkTable = true;
                this.targetWorkTable = other;
            }else if(other.node.name == "oven" && this.node.name == "dough"){
                this.touchOven = true;
                this.targetOven = other;
            }
        }
        /* Modify end */
        if(other.node.name == "Storage") {
            // cc.log("Storage touched");
            this.touchStorage = true;
        }
    }

    onEndContact (contact, self, other) {
        if (other.tag == 1) {
            this.touchShelf = false;
            // cc.log("food leaves shelf");
        }
        if (other.tag == 6) {
            console.log(this.node.name + " left player");
            // this.targetPlayer = null;
            this.selected = false;
            this.node.opacity = 255;
        }
        /* Modify-4 ycchu */
        if(other.node.getComponent(cc.Collider).tag == 4){//tag4 = worktable 
            if(other.node.name == "worktable"){
                this.touchWorkTable = false;
                this.targetWorkTable = other;
            }else if(other.node.name == "oven"){
                this.touchOven = false;
                this.targetOven = other;
            }
        }
        /* Modify end */
        if(other.node.name == "Storage") {
            this.touchStorage = false;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // console.log(this.player);
        // console.log(this.node.name);
    }

    start () {
        this.player1 = cc.find("Canvas/Player1");
        this.player2 = cc.find("Canvas/Player2");

        // console.log(this.node.name + "'s tag is "+this.node.getComponent(cc.Collider).tag);
    }

    update (dt) {
        if (this.pickedUpbyPlayer) {
            // console.log("check");
            if (this.targetPlayer) {
                // console.log(this.targetPlayer);
                // console.log("targetPlayer pos: "+this.targetPlayer.getPosition());
                this.node.setPosition(cc.v2(this.targetPlayer.x, this.targetPlayer.y + 42));
            }
        }
        else if (this.pickedUpbyCustomer) {
            if (this.customer) this.node.setPosition(cc.v2(this.customer.x, this.customer.y + 42));
        }
        if (this.node.y < -400) {
            this.node.destroy();
        }
    }
}
