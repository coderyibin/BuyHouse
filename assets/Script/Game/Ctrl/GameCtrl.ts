import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { Common } from "../../Frame/common/Common";
import { ClientData } from "../../Frame/module/ClientData";
import PlayerData from "../Moudle/PlayerData";

/**
 * 游戏控制器
 */

 export class GameCtrl extends BaseCtrl {
    private _oProduct : any;//商品数量
    private _refreshList : boolean;//是否刷新背包列表

     constructor () {
         super();
         let self = this;
     }

    /**
     * 获取玩家背包数据 
    */
    getPlayerPackage (id ?: number) : any {
        if (id) {

        } else {
            return PlayerData.getInstance().fGetProduct();
        }
    }

     //获取商品数据
     fGetProductList () : any {
        let self = this;
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
        return Product;
     }

     /**
      * 判断当前存款是否足够购买
      * @param 购买的数量
      * @param 购买的id
      */
      fIsDepositToBuy (count : number, id : number) : any {
        let self = this;
        let player = PlayerData.getInstance().Gold;
        let money = ClientData.getInstance().fGetProductData(id).price;
        let total = count * money;
        if (player >= total) {
            return true;
        } else {
            return false;
        }
      }

      /**
       * 购买商品
       * @param 商品id
       */
    fBuy (id : number) : void {
        let data = ClientData.getInstance().fGetProductData(id);
        PlayerData.getInstance().fAddProduct(data.id);
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