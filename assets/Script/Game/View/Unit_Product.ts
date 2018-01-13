import { UnitComponent } from "../../Frame/view/UnitComponent";
import { RES } from "../../Frame/common/resource";
import { GameCtrl } from "../Ctrl/GameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export class Unit_Product extends UnitComponent {
    @property({
        tooltip : "商品名称",
        type : cc.Label
    })
    ProductName : cc.Label = null;

    @property ({
        tooltip : "商品价格",
        type : cc.Label
    })
    ProductPrice : cc.Label = null;

    @property ({
        tooltip : "商品数量",
        type : cc.Label
    })
    ProductNum : cc.Label = null;

    onLoad () : void {
        super.onLoad();
    }

    start () : void {
        this.fRefresh();
    }

    protected fRefresh () : void {
        let self = this;
        let price : any = self._oData["price"] + "";
        self.ProductName.string = self._oData["name"];
        self.ProductPrice.string = price;
        if (self._oData["count"]) {
            self.ProductNum.string = self._oData["count"];
        }
    }
    
    _tap_Unit_Product (event, data) : void {
        let d = JSON.parse(JSON.stringify(this._oData));
        if (this._oData.cb) {
            delete d["cb"];
            this._oData.cb(event, d); 
        }
    }

}