import BaseTip from "../../../Frame/view/BaseTip";
import { TRADE_TYPE } from "../../../Frame/common/Common";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TipMgr extends BaseTip {
    
}

class MsgTip {

}

class TradeTip {
    constructor (trade : TRADE_TYPE, productID) {

    }
}