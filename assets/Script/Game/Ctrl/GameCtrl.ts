import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { Common } from "../../Frame/common/Common";

/**
 * 游戏控制器
 */

 export class GameCtrl extends BaseCtrl {
    private _oProduct : any;//商品数量

     constructor () {
         super();
         let self = this;
         self._oProduct = self._clientData.fGetProductData();
     }

     //获取商品数据
     fGetProductList () : any {
        let self = this;
        let Product = [];
        //获取商品总数
        let len = Common.fGetJsonLength(self._oProduct);
        if (len == 0) {
            cc.warn("商品数据为空");
            return;
        }
        let canRand : Array<any> = [];
        for (let i in self._oProduct) {
            canRand.push(self._oProduct[i]);
        }
        Product = canRand.sort(function() {
             return (0.5-Math.random());
        }).slice(0, 5);
        return Product;
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