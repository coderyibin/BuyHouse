import { UnitComponent } from "../../Frame/view/UnitComponent";
import { RES } from "../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export class Unit_Product extends UnitComponent {
    @property({
        tooltip : "商品名称图片",
        type : cc.Sprite
    })
    ProductName : cc.Sprite = null;
    @property ({
        tooltip : "商品价格",
        type : cc.Node
    })
    ProductPrice : cc.Node = null;

    onLoad () : void {
        super.onLoad();
    }

    start () : void {
        this.fRefresh();
    }

    protected fRefresh () : void {
        let self = this;
        self.ProductName.spriteFrame = RES.fGetRes(self._oData["path"]);
        let price : any = self._oData["price"] + "";
        self.ProductPrice.removeAllChildren();
        for (let i = price.length; i >= 0; i --) {
            let node = new cc.Node();
            let sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = RES.fGetRes(price[i]);
            node.parent = self.ProductPrice;
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