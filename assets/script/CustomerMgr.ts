const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    customerPrefabs : cc.Prefab = null;

    @property(cc.Prefab)
    customer2Prefabs : cc.Prefab = null;

    time : number = 0;

    // time, customer type
    customerSpawn : number[][] = [ [  0,  1],
                                   [  3,  2],
                                   [  6,  1],
                                   [ 12,  2],
                                   [ 18,  1],
                                   [ 24,  2],
                                   [ 36,  2] ];

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
        }
    }

    update (dt) {
        this.time += dt;
    }
}
