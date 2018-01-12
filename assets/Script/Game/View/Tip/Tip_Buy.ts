import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Tip_Buy extends LayerComponent {
    @property({
        tooltip : "余额不足提示节点",
        type : cc.Node
    })
    NotMoney : cc.Node = null;

    @property({
        tooltip : "购买数量",
        type : cc.EditBox
    })
    BuyCount : cc.EditBox = null;

    onLoad () : void {
        super.onLoad();
        let self = this;
        self.NotMoney.active = false;
    }

    _tap_OK () : void {
        let self = this;
        let count : any = self.BuyCount.string;
        count = parseInt(count);
        let ctrl = GameCtrl.getInstance();
        let buy = ctrl.fIsDepositToBuy(count, 1);
        if (buy) {
            ctrl.fBuy(1);
            this.fRemoveSelf();
            Emitter.getInstance().emit("refresh");
        } else {
            self.NotMoney.active = true;
        }
    }
    
    _tap_Cancel () : void {
        this.fRemoveSelf();
    }
}
