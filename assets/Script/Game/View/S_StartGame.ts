import { GameCtrl } from "../Ctrl/GameCtrl";
import { RES } from "../../Frame/common/resource";
import SceneComponent from "../../Frame/view/SceneComponent";
import { MODULE } from "../../Frame/common/Common";
import { Emitter } from "../../Frame/ctrl/Emitter";


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
        Emitter.getInstance().on("refresh", self._refreshList.bind(self), self);
        self._startGame();
    }

    private _startGame () : void {
        let self = this;
        let list = _gameCtrl.fGetProductList();
        for (let i in list) {
            let item : cc.Node = RES.fGetRes("Unit_Product");
            list[i]["cb"] = self.BuyShop.bind(self);
            let node = item.getComponent(item.name).CreateItem(list[i]);
            self.Marketplace.content.addChild(item);
        }
    }

    _refreshList () : void {
        cc.log("刷新")
        let self = this;
        let list = _gameCtrl.getPlayerPackage();
        debugger
        for (let i in list) {
            let item : cc.Node = RES.fGetRes("Unit_Product");
            // list[i]["cb"] = self.BuyShop.bind(self);
            let node = item.getComponent(item.name).CreateItem(list[i]);
            self.Package.content.addChild(item);
        }
    }

    _tap_Compute () : void{
        let self = this;
        self.Marketplace.content.removeAllChildren();
        self._startGame();
    }

    BuyShop (event, data) : void {
        // cc.log(data)
        this.showLayer(MODULE.BUY);
    }
}
