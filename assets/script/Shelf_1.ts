const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private occupied : boolean = false;

    // onLoad () {}

    start () {
        
    }

    getItemPosition(idx){
        let pos = this.node.getPosition();
        pos.y -= 4;
        return pos;
    }

}