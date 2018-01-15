import { GameCtrl } from "../Ctrl/GameCtrl";
import { RES } from "../../Frame/common/resource";
import SceneComponent from "../../Frame/view/SceneComponent";
import { MODULE } from "../../Frame/common/Common";
import { Emitter } from "../../Frame/ctrl/Emitter";
import { Unit_Product } from "./Unit_Product";
import Tip_Buy from "./Tip/Tip_Buy";


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
        Emitter.getInstance().on("update", self.updateUserData.bind(self), self);
        self._startGame();
        self.updateUserData();
    }

    //更新玩家数据
    updateUserData () : void {
        let data = GameCtrl.getInstance().fGetPlayerData();
        this._LabelData["label_deposit"].string = data.PlayerDeposit;
        this._LabelData["label_cash"].string = data.PlayerMoney;
        this._LabelData["label_health"].string = data.PlayerHealth;
        this._LabelData["label_reputation"].string = data.PlayerReputation;
        this._LabelData["label_Repository"].string = data.nCurPackageCount + "/" + data.nAllPackageCount;
        this._LabelData["Label_Medati"].string = _gameCtrl.fGetTime();
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
        self.Scroll_Package.content.removeAllChildren();
        let list = _gameCtrl.getPlayerPackage();
        for (let i in list) {
            let data = {
                name : list[i].data.name,
                price : list[i].data.price,
                count : list[i].count,
                id : list[i].data.id,
                cb : self.SaleShop.bind(self),
            }
            let node = Unit_Product.show(MODULE.SHOP_UNIT, data);
            self.Scroll_Package.content.addChild(node);
        }
    }

    _tap_Compute () : void{
        let self = this;
        self._refresh_Shop();
        self.updateUserData();
    }

    _tap_RepositoryExpand (event, data) : void {
        this.showLayer(MODULE.EXPAND);        
    }

    _tap_Bank () : void {
        this.showLayer(MODULE.BANK);        

    }

    _tap_Help () : void {

    }

    _tap_Again () : void {

    }

    _tap_BuyHouse () : void {

    }

    _tap_HosPital () : void {
        this.showLayer(MODULE.HOSPITAL);        

    }

    BuyShop (event, data) : void {
        this.showLayer(MODULE.BUY, data);
        // Tip_Buy.show(MODULE.BUY, data);
    }

    SaleShop (event, data) : void {
        this.showLayer(MODULE.SALE, data);
        
    }
}
