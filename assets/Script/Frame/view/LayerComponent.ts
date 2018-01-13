import BaseComponent from "./BaseComponent";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class LayerComponent extends BaseComponent {
    protected _oData : null;
    /**
     * 关闭自己
     */
    fRemoveSelf () : void {
        cc.find("Canvas/shield").destroy();
        this.node.destroy();
    }

    show (param ?: any) : void {
        if (param) this._oData = param;
    }
}