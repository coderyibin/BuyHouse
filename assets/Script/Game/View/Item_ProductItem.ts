import { UnitComponent } from "../../Frame/view/UnitComponent";
import { RES } from "../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export class Item_ProductItem extends UnitComponent {
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
    }

    protected fRefresh () : void {
        let self = this;
        cc.log(self._oData);
        self.ProductName.spriteFrame = RES.fGetRes(self._oData["path"]);
        let price : any = self._oData["price"] + "";
        for (let i in price) {
            let node = new cc.Node();
            let sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = RES.fGetRes(price[i]);
            node.parent = self.ProductPrice;
        }
        self.node.parent = self._parent;
    }

}