import { GameCtrl } from "../Ctrl/GameCtrl";
import { RES } from "../../Frame/common/resource";
import SceneComponent from "../../Frame/view/SceneComponent";


const {ccclass, property} = cc._decorator;

let _gameCtrl : GameCtrl;

@ccclass
export default class S_StartGame extends SceneComponent {
    @property({
        tooltip : "市场商品列表",
        type : cc.ScrollView
    })
    Marketplace : cc.ScrollView = null;

    @property({
        tooltip : "背包商品列表",
        type : cc.ScrollView
    })
    Package : cc.ScrollView = null;

    onLoad () : void {
        super.onLoad();
        _gameCtrl = GameCtrl.getInstance();
    }

    start () : void {
        let self = this;
        self._startGame();
    }

    private _startGame () : void {
        let self = this;
        let list = _gameCtrl.fGetProductList();
        for (let i in list) {
            let item : cc.Node = RES.fGetRes("Unit_Product");
            let node = item.getComponent(item.name).CreateItem(list[i]);
            self.Marketplace.content.addChild(node);
        }
    }

    _tap_Compute () : void{
        let self = this;
        self.Marketplace.content.removeAllChildren();
        self._startGame();
    }
}
