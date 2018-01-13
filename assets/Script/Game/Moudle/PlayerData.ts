import Hero from "../../Frame/module/Hero";
import { ClientData } from "../../Frame/module/ClientData";


export default class PlayerData extends Hero {

    init () : void {
        this.Gold = cc["RES"]["Res"]["global"]["Config"].PlayerMoney;
    }

    fAddProduct (id : number) : void {
        let _package = this.Package || {};
        if (_package[id]) {//背包里有存在id相同的商品

        } else {
            _package[id] = ClientData.getInstance().fGetProductData(id);
        }
        this.Package = _package;
    }

    fGetProduct (id ?: number) : any {
        if (id) {

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