const {ccclass, property} = cc._decorator;

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

    // time, customer type
    customerSpawn : number[][] = [ [  0,  6],
                                   [  3,  2],
                                   [  6,  3],
                                   [  9,  4],
                                   [ 12,  5],
                                   [ 15,  1],
                                   [ 18,  2],
                                   [ 21,  3],
                                   [ 24,  4],
                                   [ 27,  5],
                                   [ 30,  1],
                                   [ 33,  2],
                                   [ 36,  3], ];

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
        }
    }

    update (dt) {
    }
}
