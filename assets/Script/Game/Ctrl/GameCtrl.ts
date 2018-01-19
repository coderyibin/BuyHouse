import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { Common, BANK, OVER_TYPE } from "../../Frame/common/Common";
import { ClientData } from "../../Frame/module/ClientData";
import PlayerData from "../Moudle/PlayerData";
import { Emitter } from "../../Frame/ctrl/Emitter";

/**
 * 游戏控制器
 */

 export class GameCtrl extends BaseCtrl {
    private _oProduct : any;//商品数量
    private _refreshList : boolean;//是否刷新背包列表
    private _nCurTime : number;//游戏时间
    private _nDefault : number;//默认选择的房子

     constructor () {
         super();
         let self = this;
         self._nCurTime = 0;
         self._nDefault = 1;
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

    //获取当前的房价
    fGetTargetHousePrice () : string {
        let house : number = Common.fGetRandom(6, 18) / 1000;
        // let house : number = Common.fGetRandom(4000, 30000);
        let arrPrice = this.fGetHouseList();
        for (let i in arrPrice) {
            arrPrice[i].nPrice += house * arrPrice[i].nPrice;
        }
        let hprice = this._clientData.fGetBuyTarget(this._nDefault);//选择的房子的房价
        // hprice *= 0.2;
        return Common.UnitConversion(hprice);
    }

    //获取房价列表
    fGetHouseList () : any {
        return this._clientData.fGetHousePriceData();        
    }

    //购买房子
    fBuyHouse (id : number) : any {
        let price = this._clientData.fGetBuyTarget(id);
        let Money = PlayerData.getInstance().fGetPlayerMeans();
        if (price > Money) {
            return false;
        } else {
            
        }
    }

    /**
     * 计算商品价格的浮动
     */
    private _fGetFloatPrice (Products : Array<any>) : any {
        let isevent = false;
        for (let i in Products) {
            let dis = null;
            dis = Common.fGetRandom(Products[i].minP, Products[i].maxP);                          
            if (! isevent) {
                let d = this.fGetEvent(Products[i].id);  
                isevent = true;
                if (d) {
                    dis = d;
                }    
            } 
            Products[i].price = dis;
        }
        return Products;
    }

    //获取游戏剧情事件
    fGetEvent (id) : any {
        let index = Common.fGetRandom(1, 200);
        let event : inter_Event = this._clientData.fGetGamePlot(index);
        if (event) {
            if (event.nProductID && event.nProductID > 0 && event.nProductID == id) {//产品事件
                Emitter.getInstance().emit("news", {text : event.sDetails});
                return event.nPrice;
            } else if (event.nHealth) {//健康事件
                let health = PlayerData.getInstance().getPlayerData().PlayerCurHealth + event.nHealth;                
                PlayerData.getInstance().getPlayerData().PlayerCurHealth = health;
                Emitter.getInstance().emit("ADiary", {text : event.sDetails});
            } else if (event.nDeposit) {//存款事件
                if (event.nDeposit > 0 && event.nDeposit < 1) {
                    let d = PlayerData.getInstance().getPlayerData().PlayerDeposit * event.nDeposit;
                    PlayerData.getInstance().getPlayerData().PlayerDeposit += d;
                } else {
                    PlayerData.getInstance().getPlayerData().PlayerDeposit += event.nDeposit;      
                }
                Emitter.getInstance().emit("ADiary", {text : event.sDetails});
            } else if (event.nMoney) {//现金事件
                let d = 0;
                if (event.nMoney > 0 && event.nMoney < 1) {
                    d = PlayerData.getInstance().getPlayerData().PlayerMoney * event.nMoney;
                } else {
                    d = event.nMoney;
                }
                let money = PlayerData.getInstance().getPlayerData().PlayerMoney + d;
                PlayerData.getInstance().getPlayerData().PlayerMoney = money;
                Emitter.getInstance().emit("ADiary", {text : event.sDetails});
            } else if (event.nHuose) {//房价事件
                Emitter.getInstance().emit("news", {text : event.sDetails});
            }
            Emitter.getInstance().emit("update");
        }
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
        // cc.log("购买数量", count, "单价", money, "总价", total)
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
        if (this._nCurTime >= this._clientData.fGetGameConfig().GameTime) {//超时
            cb(OVER_TYPE.TIMEOUT);
        } else if (PlayerData.getInstance().getPlayerData().PlayerCurHealth <= this._clientData.fGetGameConfig().MinHealth) {//健康消耗结束
            cb(OVER_TYPE.DIE);
        } else {
            // cb(OVER_TYPE.BUY);
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