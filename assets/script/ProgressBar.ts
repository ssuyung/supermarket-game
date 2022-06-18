const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        this.node.getComponent(cc.ProgressBar).progress += dt;
        if(this.node.getComponent(cc.ProgressBar).progress >= 0.99) {
            this.scheduleOnce(() => {this.node.destroy();}, 0.2);
        }
    }
}
