import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";
import { BANK } from "../../../Frame/common/Common";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Tip_Sale extends LayerComponent {
    _id : number = 0;
    _saleCount : number = 0;

    onLoad () : void {
        super.onLoad();
        let self = this;
    }

    initUi () : void {
    }

    //存款
    _tap_Deposit () : void {
        let self = this;
        GameCtrl.getInstance().fThedeposit(BANK.DEPOSIT);
        this.fRemoveSelf();
    }

    //取款
    _tap_Withdrawal () : void {
        let self = this;
        GameCtrl.getInstance().fThedeposit(BANK.WITHDRAWALS);
        this.fRemoveSelf();
    }

    _tap_btn_Leave () : void {
        this.fRemoveSelf();
    }
}
