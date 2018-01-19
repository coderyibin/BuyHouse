import Hero from "../../Frame/module/Hero";
import { ClientData } from "../../Frame/module/ClientData";
import { Emitter } from "../../Frame/ctrl/Emitter";
import { BANK } from "../../Frame/common/Common";

export default class PlayerData extends Hero {
    _oData : inter_Player;

    init () : void {
        this._oData = this._oData || {};
        this._oData.PlayerMoney = cc["RES"]["Res"]["global"]["Config"].PlayerMoney;
        this._oData.PlayerCurHealth = this._oData.PlayerHealth = cc["RES"]["Res"]["global"]["Config"].PlayerHealth;
        this._oData.PlayerReputation = cc["RES"]["Res"]["global"]["Config"].PlayerReputation;
        this._oData.nAllPackageCount = cc["RES"]["Res"]["global"]["Config"].Repository;
        this._oData.nCurPackageCount = cc["RES"]["Res"]["global"]["Config"].Repository;
        this._oData.PlayerDeposit = cc["RES"]["Res"]["global"]["Config"].PlayerDeposit || 0;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerMoney;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerHealth;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerReputation;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerDeposit;
        delete cc["RES"]["Res"]["global"]["Config"].Repository;
    }

    //存取款
    fTheDeposit (type : BANK) : void {
        if (type == BANK.DEPOSIT) {
            this._oData.PlayerDeposit += this._oData.PlayerMoney;
            this._oData.PlayerMoney = 0;
        } else {
            this._oData.PlayerMoney += this._oData.PlayerDeposit;
            this._oData.PlayerDeposit = 0;
        }
        Emitter.getInstance().emit("update");
    }

    getPlayerData () : inter_Player {
        return this._oData;
    }

    //获取玩家资产
    fGetPlayerMeans () : number {
        return this._oData.PlayerMoney + this._oData.PlayerDeposit;
    }

    fAddProduct (id : number, count : number) : void {
        let _package = this.Package || {};
        let product = JSON.parse(JSON.stringify(ClientData.getInstance().fGetProductData(id)));
        if (_package[id]) {//背包里有存在id相同的商品
            _package[id].count += count; 
        } else {
            _package[id] = {
                count : count,
                data : product,
            }
        }
        this.Package = _package;
        let total = product.price * count;
        this._packageSpace(count);
        this._buySettle(total);
    }

    fSaleProduct (id : number, count : number) : void {
        let _package = this.Package || {};
        let product = JSON.parse(JSON.stringify(ClientData.getInstance().fGetProductData(id)));
        if (_package[id]) {
            _package[id].count -= count;
            if (_package[id].count == 0) {
                delete _package[id];
            }
            let price = product.price * count;
            this._packageSpace(-count);
            this._saleSettle(price);
        } else {
            cc.warn("没有该类型产品", id);
        }
    }

    //卖出单笔结算
    private _saleSettle (total : number) : void {
        this._oData.PlayerMoney += total;
        Emitter.getInstance().emit("update");        
    }

    //购买单笔结算
    private _buySettle (total : number) : void {
        if (this._oData.PlayerMoney >= total) {
            this._oData.PlayerMoney -= total;
        } else {
            this._oData.PlayerDeposit -= total;
        }
        Emitter.getInstance().emit("update");
    }

    /**
     * 金钱结算
     * @param 金额 负数-减去
     */
    private _moneySettle (count : number) {
        let num = Math.abs(count);
        if (this._oData.PlayerMoney >= num) {
            this._oData.PlayerMoney += count;
        } else {
            this._oData.PlayerDeposit += count;
        }
    }

    MoneySettle (count : number) : void {
        this._moneySettle(count);
    }

    private _packageSpace (count : number) : void {
        this._oData.nCurPackageCount -= count;
    }

    fGetProduct (id ?: number) : any {
        if (id) {
            return this.Package[id];
        } else {
            return this.Package;
        }
    }

    static _data : PlayerData;
    static getInstance () : PlayerData {
        if (! this._data) {
            this._data = new PlayerData();
        }return this._data;
    }
}
cc["Player"] = PlayerData.getInstance();