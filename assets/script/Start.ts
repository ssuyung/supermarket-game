const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    onKeyDown(event){
        if(event.keyCode == cc.macro.KEY.enter) {
            cc.audioEngine.stopAll();
            cc.director.loadScene("menu");
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start () {
        cc.audioEngine.setVolume(cc.audioEngine.playMusic(this.bgm, true), 0.6);
    }

    // update (dt) {}
}
