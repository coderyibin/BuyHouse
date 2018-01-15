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
    }

    _tap_OK () : void {
        let self = this;
    }

    _tap_Cancel () : void {
        this.fRemoveSelf();
    }
}
