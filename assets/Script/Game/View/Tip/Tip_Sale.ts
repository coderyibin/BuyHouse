import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Tip_Sale extends LayerComponent {
    _id : number = 0;
    _saleCount : number = 0;
    // _ProductTotal : number = 0;

    onLoad () : void {
        super.onLoad();
        let self = this;
        // self._LabelData["label_Hint"].node.active = false;
    }

    initUi () : void {
        // cc.log(this._oData);
        this._LabelData["label_Hint"].string = "";
        this._id = this._oData.id;
        this._LabelData["ProductName"].string = this._oData.name;
    }

    _tap_OK () : void {
        let self = this;
        let count : number = self._saleCount;
        let ctrl = GameCtrl.getInstance();
        ctrl.fSale(this._id, count);
        Emitter.getInstance().emit("refresh");
        self.fRemoveSelf();
    }

    _editBox_change_edit_buynum (event) : void {
        let self = this;
        let edit : cc.EditBox = event.detail;
        let count = parseInt(edit.string);
        let regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
        if (regString.test(edit.string)) {
            self._LabelData["label_Hint"].string = "请输入数字"; 
            self._LabelData["label_Hint"].node.color = cc.Color.RED;
            edit.string = "";
            return;
        }
        if (count <= 0 || edit.string == "") {
            self._LabelData["label_Hint"].string = "";
            return;
        }
        let item = GameCtrl.getInstance().fGetProductItem(this._id);
        let myitem = GameCtrl.getInstance().getPlayerPackage(this._id);
        if (myitem.count < count) {
            self._LabelData["label_Hint"].string = "卖出数量超过背包数量"; 
            edit.string = edit.string.substr(0, edit.string.length - 1);            
            return;
        }
        let itemPrice = item.price;
        let myPrice = myitem.data.price
        cc.log("当前市场价", itemPrice, "背包价格", myPrice);
        if (itemPrice == myPrice) {
            self._LabelData["label_Hint"].string = "等价卖出无盈利";
            self._LabelData["label_Hint"].node.color = cc.Color.BLACK;
        } else {
            let storeTotal = itemPrice * count;
            let myTotal = myPrice * count;
            let disparity = Math.abs(storeTotal - myTotal);
            if (itemPrice < myPrice) {
                self._LabelData["label_Hint"].string = "卖出亏" + disparity; 
                self._LabelData["label_Hint"].node.color = cc.Color.RED;
            } else {
                self._LabelData["label_Hint"].string = "卖出盈利" + disparity;
                self._LabelData["label_Hint"].node.color = cc.Color.BLACK;
            }
        }
        self._saleCount = count;
    }
    
    _tap_Cancel () : void {
        this.fRemoveSelf();
    }
}
