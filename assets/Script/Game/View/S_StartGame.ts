import { GameCtrl } from "../Ctrl/GameCtrl";
import { RES } from "../../Frame/common/resource";
import SceneComponent from "../../Frame/view/SceneComponent";
import { MODULE } from "../../Frame/common/Common";
import { Emitter } from "../../Frame/ctrl/Emitter";
import { Unit_Product } from "./Unit_Product";


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
    Scroll_Package : cc.ScrollView = null;

    onLoad () : void {
        super.onLoad();
        _gameCtrl = GameCtrl.getInstance();
    }

    start () : void {
        let self = this;
        Emitter.getInstance().on("refresh", self._refresh_package.bind(self), self);
        self._startGame();
    }

    private _startGame () : void {
        let self = this;
        let list = _gameCtrl.fGetProductList();
        for (let i in list) {
            list[i]["cb"] = self.BuyShop.bind(self);
            let node = Unit_Product.show(MODULE.SHOP_UNIT, list[i]);
            self.Marketplace.content.addChild(node);
        }
    }

    //刷新市场
    _refresh_Shop () : void {
        let self = this;
        self.Marketplace.content.removeAllChildren();
        self._startGame();
    }

    //刷新背包
    _refresh_package () : void {
        let self = this;
        let list = _gameCtrl.getPlayerPackage();
        for (let i in list) {
            let node = Unit_Product.show(MODULE.SHOP_UNIT, list[i]);
            self.Scroll_Package.content.addChild(node);
        }
    }

    _tap_Compute () : void{
        let self = this;
        self._refresh_Shop();
    }

    BuyShop (event, data) : void {
        // cc.log(data)
        this.showLayer(MODULE.BUY, data);
    }
}
