import { GameCtrl } from "../Ctrl/GameCtrl";
import { RES } from "../../Frame/common/resource";
import SceneComponent from "../../Frame/view/SceneComponent";
import { MODULE, OVER_TYPE, SCENE_NAME } from "../../Frame/common/Common";
import { Emitter } from "../../Frame/ctrl/Emitter";
import { Unit_Product } from "./Unit_Product";
import Tip_Buy from "./Tip/Tip_Buy";
import Tip_ADiary from "./Tip/Tip_ADiary";


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
        Emitter.getInstance().on("adiary", self.updateAdiary.bind(self), self);
        Emitter.getInstance().on("news", self.updateNews.bind(self), self);
        self._startGame();
        self.updateUserData();
    }

    //更新日记
    updateAdiary (name, data) : void {
        this.showLayer(MODULE.ADIARY, data);
    }

    //更新新闻
    updateNews (name, data) : void {
        this.showLayer(MODULE.NEWS, data);
    }

    //更新玩家数据
    updateUserData () : void {
        let data = GameCtrl.getInstance().fGetPlayerData();
        let house = GameCtrl.getInstance().fGetTargetHousePrice();
        this._LabelData["label_HousePrice"].string = house;
        this._LabelData["label_deposit"].string = data.PlayerDeposit;
        this._LabelData["label_cash"].string = data.PlayerMoney;
        this._LabelData["label_health"].string = data.PlayerCurHealth;
        this._LabelData["label_reputation"].string = data.PlayerReputation;
        this._LabelData["label_Repository"].string = (data.nAllPackageCount - data.nCurPackageCount) + "/" + data.nAllPackageCount;
        this._LabelData["Label_Time"].string = _gameCtrl.fGetTime();
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
        GameCtrl.getInstance().fGameOver((type : OVER_TYPE, data ?: any)=>{
            if (type == OVER_TYPE.NONE) return; 
            self._gameOver(type, data);
        });
        self._refresh_Shop();
        self.updateUserData();
        let color = GameCtrl.getInstance().fTimeOut();
        self._LabelData["Label_Time"].node.color = color;
    }

    //游戏结束
    private _gameOver (type : OVER_TYPE, data) : void {
        this.showLayer(MODULE.MSG, {
            Title : data.Title,
            Content : data.Content,
            cb : this._fOver.bind(this)
        });
    }

    private _fOver () : void {
        GameCtrl.getInstance().fCleanGameData()
        this._runScene(SCENE_NAME.MENU_SCENE);
    }

    _tap_RepositoryExpand (event, data) : void {
        this.showLayer(MODULE.EXPAND);        
    }

    _tap_Bank () : void {
        this.showLayer(MODULE.BANK);        
    }

    _tap_Help () : void {
        this.showLayer(MODULE.HELP);        
    }

    _tap_Again () : void {
        this.showLayer(MODULE.AGAIN);        
    }

    _tap_BuyHouse () : void {
        this.showLayer(MODULE.BUYHOUSE, {cb : this._tap_Compute.bind(this)});        
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
