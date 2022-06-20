const {ccclass, property} = cc._decorator;

declare const firebase: any;//Make IntelliSense happy.(optional)

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    customer1Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer2Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer3Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer4Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer5Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    gangster1Prefabs : cc.Prefab = null;

    private playerNumber: number = 1;

    // 1p
    // time, customer type
    customerSpawn1 : number[][] = [ [  0,  1],
                                    [  5,  2],
                                    [ 10,  3],
                                    [ 20,  4],
                                    [ 30,  5],
                                    [ 40,  1],
                                    [ 55,  2],
                                    [ 70,  3],
                                    [ 85,  4],
                                    [100,  5],
                                    [110,  1],
                                    [120,  2], ];

    // 2p
    customerSpawn2 : number[][] = [ [  0,  2],
                                    [  5,  1],
                                    [ 10,  3],
                                    [ 14,  4],
                                    [ 20,  5],
                                    [ 28,  1],
                                    [ 32,  2],
                                    [ 40,  3],
                                    [ 47,  4],
                                    [ 54,  5],
                                    [ 60,  1],
                                    [ 65,  2],
                                    [ 70,  3],
                                    [ 75,  4],
                                    [ 81,  5],
                                    [ 86,  1],
                                    [ 92,  2],
                                    [ 98,  3],
                                    [105,  4],
                                    [108,  5],
                                    [110,  1],
                                    [113,  2],
                                    [114,  3],
                                    [118,  4],
                                    [120,  5], ];

    customerSpawn : number[][];

    // onLoad () {}

    start () {
        let user = firebase.auth().currentUser;
        let handle = this;
        firebase.database().ref('userData/'+user.uid.toString()).once('value')
        .then((snapshot)=>{
            //console.log(snapshot.val().numberOfPlayers, snapshot.val().teamName);
            handle.playerNumber = snapshot.val().numberOfPlayers;
            handle.customerSpawn = (handle.playerNumber == 1) ? handle.customerSpawn1 : handle.customerSpawn2;
            for (let i = 0; i < handle.customerSpawn.length; i++) {
                if (handle.customerSpawn[i][1] == 1) {
                    handle.scheduleOnce(() => {
                        var customer = cc.instantiate(handle.customer1Prefabs);
                        cc.find("Canvas/Customer").addChild(customer);
                    }, handle.customerSpawn[i][0]);
                }
                else if (handle.customerSpawn[i][1] == 2) {
                    handle.scheduleOnce(() => {
                        var customer2 = cc.instantiate(handle.customer2Prefabs);
                        cc.find("Canvas/Customer").addChild(customer2);
                    }, handle.customerSpawn[i][0]);
                }
                else if (handle.customerSpawn[i][1] == 3) {
                    handle.scheduleOnce(() => {
                        var customer3 = cc.instantiate(handle.customer3Prefabs);
                        cc.find("Canvas/Customer").addChild(customer3);
                    }, handle.customerSpawn[i][0]);
                }
                else if (handle.customerSpawn[i][1] == 4) {
                    handle.scheduleOnce(() => {
                        var customer4 = cc.instantiate(handle.customer4Prefabs);
                        cc.find("Canvas/Customer").addChild(customer4);
                    }, handle.customerSpawn[i][0]);
                }
                else if (handle.customerSpawn[i][1] == 5) {
                    handle.scheduleOnce(() => {
                        var customer5 = cc.instantiate(handle.customer5Prefabs);
                        cc.find("Canvas/Customer").addChild(customer5);
                    }, handle.customerSpawn[i][0]);
                }
                else if (handle.customerSpawn[i][1] == 6) {
                    handle.scheduleOnce(() => {
                        var gangster1 = cc.instantiate(handle.gangster1Prefabs);
                        cc.find("Canvas/Customer").addChild(gangster1);
                    }, handle.customerSpawn[i][0]);
                }
            }
        })
        /*this.customerSpawn = (cc.find("Canvas").getComponent("World").getPlayerNumber() == 1) ? this.customerSpawn1 : this.customerSpawn2;
        for (let i = 0; i < this.customerSpawn.length; i++) {
            if (this.customerSpawn[i][1] == 1) {
                this.scheduleOnce(() => {
                    var customer = cc.instantiate(this.customer1Prefabs);
                    cc.find("Canvas/Customer").addChild(customer);
                }, this.customerSpawn[i][0]);
            }
            else if (this.customerSpawn[i][1] == 2) {
                this.scheduleOnce(() => {
                    var customer2 = cc.instantiate(this.customer2Prefabs);
                    cc.find("Canvas/Customer").addChild(customer2);
                }, this.customerSpawn[i][0]);
            }
            else if (this.customerSpawn[i][1] == 3) {
                this.scheduleOnce(() => {
                    var customer3 = cc.instantiate(this.customer3Prefabs);
                    cc.find("Canvas/Customer").addChild(customer3);
                }, this.customerSpawn[i][0]);
            }
            else if (this.customerSpawn[i][1] == 4) {
                this.scheduleOnce(() => {
                    var customer4 = cc.instantiate(this.customer4Prefabs);
                    cc.find("Canvas/Customer").addChild(customer4);
                }, this.customerSpawn[i][0]);
            }
            else if (this.customerSpawn[i][1] == 5) {
                this.scheduleOnce(() => {
                    var customer5 = cc.instantiate(this.customer5Prefabs);
                    cc.find("Canvas/Customer").addChild(customer5);
                }, this.customerSpawn[i][0]);
            }
            else if (this.customerSpawn[i][1] == 6) {
                this.scheduleOnce(() => {
                    var gangster1 = cc.instantiate(this.gangster1Prefabs);
                    cc.find("Canvas/Customer").addChild(gangster1);
                }, this.customerSpawn[i][0]);
            }
        }*/
    }

    update (dt) {
    }
}
