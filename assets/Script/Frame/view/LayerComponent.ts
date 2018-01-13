import BaseComponent from "./BaseComponent";
import { RES } from "../common/resource";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class LayerComponent extends BaseComponent {

    //静态数据-接收外部传进来的数据
    static oData : null;
    /**
     * 要显示的单元名称
     * @param prefab 要显示的单元预制资源名称
     * @param data 数据
     */
    public static show (prefab : string, data ?: any) : cc.Node {
        let node = RES.fGetRes(prefab);
        LayerComponent.oData = data;
        return node;
    }

    protected _oData : null;
    /**
     * 关闭自己
     */
    fRemoveSelf () : void {
        cc.find("Canvas/shield").destroy();
        this.node.destroy();
    }
}