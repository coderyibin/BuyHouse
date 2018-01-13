import Hero from "../../Frame/module/Hero";
import { ClientData } from "../../Frame/module/ClientData";
import { Emitter } from "../../Frame/ctrl/Emitter";

export default class PlayerData extends Hero {
    _oData : inter_Player;

    init () : void {
        this._oData = this._oData || {};
        this._oData.PlayerMoney = cc["RES"]["Res"]["global"]["Config"].PlayerMoney;
        this._oData.PlayerHealth = cc["RES"]["Res"]["global"]["Config"].PlayerHealth;
        this._oData.PlayerReputation = cc["RES"]["Res"]["global"]["Config"].PlayerReputation;
        this._oData.PlayerDeposit = cc["RES"]["Res"]["global"]["Config"].PlayerDeposit || 0;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerMoney;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerHealth;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerReputation;
        delete cc["RES"]["Res"]["global"]["Config"].PlayerDeposit;
    }

    getPlayerData () : inter_Player {
        return this._oData;
    }

    fAddProduct (id : number, count : number) : void {
        let _package = this.Package || {};
        let product = ClientData.getInstance().fGetProductData(id);
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
        this._settle(total);
    }

    //单笔结算
    private _settle (total : number) : void {
        if (this._oData.PlayerMoney >= total) {
            this._oData.PlayerMoney -= total;
        } else {
            this._oData.PlayerDeposit -= total;
        }
        Emitter.getInstance().emit("update");
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
cc["package"] = PlayerData.getInstance().Package;