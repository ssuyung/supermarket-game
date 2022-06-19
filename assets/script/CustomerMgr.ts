const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    customer1Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer2Prefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer3Prefabs : cc.Prefab = null;

    // time, customer type
    customerSpawn : number[][] = [ [  0,  1],
                                   [  3,  1],
                                   [  6,  1],
                                   [  9,  1],
                                   [ 12,  1],
                                   [ 15,  1],
                                   [ 18,  1],
                                   [ 21,  1],
                                   [ 24,  1],
                                   [ 27,  1],
                                   [ 30,  1],
                                   [ 33,  1],
                                   [ 36,  1], ];

    // onLoad () {}

    start () {
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
        }
    }

    update (dt) {
    }
}
