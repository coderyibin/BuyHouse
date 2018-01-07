import { RES } from "../../Frame/common/resource";
import BaseLoading from "../../Frame/view/BaseLoading";
import { SCENE_NAME } from "../../Frame/common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class S_Loading extends BaseLoading {
    @property({
        tooltip : "游戏资源加载进度条",
        type : cc.ProgressBar
    })
    LoadBar : cc.ProgressBar = null;

    onLoad () : void {
        super.onLoad();
        let self = this;
        self.LoadBar.progress = 0.2;
        self.LoadBar.totalLength = 100;
        self.scheduleOnce(()=>{
            let res = RES.ResConfig.Common.concat(RES.ResConfig.StartGame);
            RES.loadArrayToGlobal(res, self._fProgress.bind(self), self._fLoaded.bind(self));
        }, 1);
    }

    loadRes (file : any) : void {
        let self = this;       
     }

    private _fProgress (count, total, item) : void {
        let self = this;
        let d = count / total;
        self.LoadBar.progress = d;
    }

    private _fLoaded () : void {
        let self = this;
        self.LoadBar.progress = 1;
        self.scheduleOnce(()=>{
            self._runScene(SCENE_NAME.MENU_SCENE);
        }, 0.5);
    }
}