import SceneComponent from "./SceneComponent";
import { RES } from "../common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLoading extends SceneComponent {

    @property({
        tooltip : "更新的面板弹窗",
        type : cc.Node,
    })
    Panel_Update : cc.Node = null;

    onLoad () : void {
        let self = this;
        super.onLoad();
        cc.director.setDisplayStats(false);
        if (! self._isNative()) {//直接进行网页h5

            self.Panel_Update.active = false;
            self._fLoadRes();  

        } else {//检查更新

            self.Panel_Update.active = true;
            self._fCheckUpdate();

        }
    }

    _tap_Update () : void {
        
    }

    protected _fLoadRes () : void {
    }
    protected _fCheckUpdate () : void {
    }
}