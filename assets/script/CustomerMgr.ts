const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    customerPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer2Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer3Prefabs : cc.Prefab = null;

    time : number = 0;

    // time, customer type
    customerSpawn : number[][] = [ [  0,  1],
                                   [  3,  2],
                                   [  6,  3],
                                   [  9,  1],
                                   [ 12,  2],
                                   [ 15,  3],
                                   [ 18,  1],
                                   [ 21,  3],
                                   [ 24,  2],
                                   [ 27,  3],
                                   [ 30,  1],
                                   [ 33,  1],
                                   [ 36,  2],
                                   [ 48,  2],
                                   [ 60,  2],
                                   [ 72,  2],
                                   [ 84,  2], ];

    // onLoad () {}

    start () {
        for (let i = 0; i < this.customerSpawn.length; i++) {
            if (this.customerSpawn[i][1] == 1) {
                this.scheduleOnce(() => {
                    var customer = cc.instantiate(this.customerPrefabs);
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
        }
    }

    update (dt) {
        this.time += dt;
    }
}
