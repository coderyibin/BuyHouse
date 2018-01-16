import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { Common, BANK, OVER_TYPE } from "../../Frame/common/Common";
import { ClientData } from "../../Frame/module/ClientData";
import PlayerData from "../Moudle/PlayerData";

/**
 * 游戏控制器
 */

 export class GameCtrl extends BaseCtrl {
    private _oProduct : any;//商品数量
    private _refreshList : boolean;//是否刷新背包列表
    private _nCurTime : number;//游戏时间

     constructor () {
         super();
         let self = this;
         self._nCurTime = 0;
    }

    /**
     * 玩家存取款
     */
    fThedeposit (type : BANK) : void {
        PlayerData.getInstance().fTheDeposit(type);
    }

    /**
     * 判断是否需要医院
     */
    fIsGotoHospistal () : any {
        let player : inter_Player = this.fGetPlayerData();
        let health = player.PlayerCurHealth;
        let allHealth = player.PlayerHealth;
        let money = player.PlayerMoney;//现金
        let Deposit = player.PlayerDeposit;//存款
        let Health = this._clientData.fGetGameConfig().BaseHealth;//健康基数
        let disp : number = (allHealth - health) * Health;
        let is : boolean = true;
        if (disp > money + Deposit) {//治疗不起
            return { money : disp, is : true};
        } else if (disp == 0) {//不用治疗
            return;
        } else {
            return disp;
        }
    }

    /**
     * 治疗
     * @param 需要花费的费用
     */
    fGoTreatment (disp : number) : void {
        let player : inter_Player = this.fGetPlayerData();
        let money = player.PlayerMoney;//现金
        let Deposit = player.PlayerDeposit;//存款
        PlayerData.getInstance().MoneySettle(disp);
    }

    /**
     * 获取玩家数据
    */
    fGetPlayerData () : inter_Player {
        return PlayerData.getInstance().getPlayerData();
    }

    /**
     * 获取玩家背包数据 
    */
    getPlayerPackage (id ?: number) : any {
        if (id) {
            return PlayerData.getInstance().fGetProduct(id);
        } else {
            return PlayerData.getInstance().fGetProduct();
        }
    }

    //获取时间
    fGetTime () : string {
        return this._nCurTime + "/" + this._clientData.fGetGameConfig().GameTime;
    }

    //获取商品数据
    fGetProductList () : any {
        let self = this;
        self._nCurTime ++;
        self._oProduct = self._clientData.fGetProductData(); //self._clientData.fGetProductData();
        let Product = [];
        //获取商品总数
        let len = Common.fGetJsonLength(self._oProduct);
        if (len == 0) {
            cc.warn("商品数据为空");
            debugger
            return;
        }
        let canRand : Array<any> = [];
        for (let i in self._oProduct) {
            canRand.push(self._oProduct[i]);
        }
        Product = canRand.sort(function() {
                return (0.5-Math.random());
        }).slice(0, 5);
        if (Product.length == 0) debugger
        Product = self._fGetFloatPrice(Product);
        return Product;
    }

    /**
     * 计算商品价格的浮动
     */
    private _fGetFloatPrice (Products : Array<any>) : any {
        for (let i in Products) {
            let dis = Common.fGetRandom(Products[i].minP, Products[i].maxP);
            Products[i].price = dis;
        }
        return Products;
    }

    fGetProductItem (id : number) : any {
        return this._oProduct[id] || {};
    }

    /**
     * 判断当前存款是否足够购买
    * @param 购买的数量
    * @param 购买的id
    */
    fIsDepositToBuy (count : number, id : number) : any {
        let self = this;
        let Money = PlayerData.getInstance().getPlayerData().PlayerMoney;
        let Deposit = PlayerData.getInstance().getPlayerData().PlayerDeposit;
        let money = ClientData.getInstance().fGetProductData(id).price;
        let total = count * money;
        cc.log("购买数量", count, "单价", money, "总价", total)
        if (Money >= total || Deposit >= total) {//足够购买
            return total;
        } else {
            return false;
        }
    }

    /**
     * 购买商品
     * @param 商品id
     * @param 购买数量
     */
    fBuy (id : number, count : number) : void {
        let data = ClientData.getInstance().fGetProductData(id);
        PlayerData.getInstance().fAddProduct(data.id, count);
    }

    /**
     * 卖出商品呢
     */
    fSale (id : number, count : number) : void {
        let data = ClientData.getInstance().fGetProductData(id);
        PlayerData.getInstance().fSaleProduct(data.id, count);
    }

    /**
     * 游戏结束
     */
    fGameOver (cb : Function) : void {
        if (this._nCurTime >= this._clientData.fGetGameConfig().GameTime) {
            cb(OVER_TYPE.TIMEOUT);
        } else if (PlayerData.getInstance().getPlayerData().PlayerCurHealth <= this._clientData.fGetGameConfig().MinHealth) {
            cb(OVER_TYPE.DIE);
        } else {
            cb(OVER_TYPE.BUY);
        }
    }

    static _cCtrl : GameCtrl;
    static getInstance () : GameCtrl {
        let self = this;
        if (! self._cCtrl) {
            self._cCtrl = new GameCtrl();
        }
        return self._cCtrl;
    }
 }