import { SCENE_NAME } from "../../Frame/common/Common";
import { RES } from "../../Frame/common/resource";
// import PlayerData from "../Moudle/PlayerData";
// import { ClientData } from "../../Frame/module/ClientData";
import SceneComponent from "../../Frame/view/SceneComponent";
import { GameCtrl } from "../Ctrl/GameCtrl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class S_Loading extends SceneComponent {

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
        cc.director.setDisplayStats(false);
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
