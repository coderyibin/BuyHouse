import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Tip_Sale extends LayerComponent {
    _id : number = 0;
    _canBuy : boolean = false;
    _buyCount : number = 0;
    // _ProductTotal : number = 0;

    onLoad () : void {
        super.onLoad();
        let self = this;
        // self._LabelData["label_Hint"].node.active = false;
    }

    initUi () : void {
        cc.log(this._oData);
        this._LabelData["label_Hint"].string = "";
        this._id = this._oData.id;
        this._LabelData["ProductName"].string = this._oData.name;
    }

    _tap_OK () : void {
        let self = this;
        if (! self._canBuy) return;
        let count : number = self._buyCount;
        let ctrl = GameCtrl.getInstance();
        ctrl.fBuy(self._id, count);
        Emitter.getInstance().emit("refresh");
        self.fRemoveSelf();
    }

    _editBox_change_edit_buynum (event) : void {
        let self = this;
        let edit : cc.EditBox = event.detail;
        let count = parseInt(edit.string);
        if (count <= 0) {
            return;
        }
        let bool = GameCtrl.getInstance().fIsDepositToBuy(count, this._id);
        if (! bool) {
            self._canBuy = false;
            self._LabelData["label_Hint"].string = "您的余额不足以购买！";
            self._LabelData["label_Hint"].node.color = cc.Color.RED;
        } else {
            self._canBuy = true;
            self._buyCount = count;
            self._LabelData["label_Hint"].string = "需要花费" + bool;            
            self._LabelData["label_Hint"].node.color = cc.Color.BLACK;
            // self._ProductTotal = bool;
        }

    }
    
    _tap_Cancel () : void {
        this.fRemoveSelf();
    }
}
