import { SCENE_NAME } from "../../Frame/common/Common";
import { RES } from "../../Frame/common/resource";
import { GameCtrl } from "../Ctrl/GameCtrl";
import BaseLoading from "../../Frame/view/BaseLoading";
import { NetHttp } from "../../Frame/common/NetHttp";

const {ccclass, property} = cc._decorator;

@ccclass
export default class S_Loading extends BaseLoading {

    @property({
        tooltip : "",
        type : cc.ProgressBar
    })
    Loading : cc.ProgressBar = null;

    @property({
        tooltip : "加载进度的文本展示",
        type : cc.Label
    })
    ProgressLabel : cc.Label = null;

    @property({
        tooltip : "ri节点",
        type : cc.Node
    })
    Node_R1 : cc.Node = null;

    @property({
        tooltip : "r11节点",
        type : cc.Node
    })
    Node_R2 : cc.Node = null;

    onLoad () : void {
        let self = this;
        super.onLoad();
    }

    _fCheckUpdate () : void {
        //请求热更新地址
        RES.loadJson("NetConfig", (res)=>{
            let http = new NetHttp(res.HotUpdateUrl, (data)=>{
                cc.log(data);
                this._manifestUrl = JSON.parse(data);
                this._fCheck();
            });
            http.send("GET");
        });
    }

    private _fLoadRes () : void {
        let self = this;
        self.Loading.progress = 0.1;
        self._setProgressText(0.11);
        RES.loadJson("resources", (res : inter_Res)=>{
            let r = res.Common.concat(res.StartGame);
            RES.loadArrayToGlobal(r, self._onProgress.bind(self), self._onSucceed.bind(self));
        });

        this.Node_R1.active = false;
        this.Node_R2.active = false;
    }

    private _setProgressText (count : number) : void {
        let self = this;
        self.ProgressLabel.string = "正在加载资源..." + count + "%";
    }

    _onProgress (count, total, item) : void {
        let self = this;
        let d = count / total;
        self.Loading.progress = d;
        self._setProgressText(parseInt(d.toFixed(2).substr(2)));
    }

    _onSucceed () : void {
        let self = this;
        self.Loading.progress = 1;
        GameCtrl.getInstance().fCleanGameData();
        // cc.director.loadScene(SCENE_NAME.MENU_SCENE);
        let is = cc.sys.localStorage.getItem("Once");
        if (! is) {
            this.Node_R1.active = true;     
            cc.sys.localStorage.setItem("Once", true);               
        } else {
            cc.director.loadScene(SCENE_NAME.MENU_SCENE);                    
        }
    }

    _tap_JiXu () : void {
        this.Node_R1.active = false;        
        this.Node_R2.active = true;        
    }

    _tap_Start () : void {
        cc.director.loadScene(SCENE_NAME.MENU_SCENE);        
    }
}
