import ButtonClick from "./ButtonClick";
import { Common } from "../common/Common";
import BaseComponent from "./BaseComponent";

/**
 * 单元类型脚本组件
 */

 const {ccclass, property} = cc._decorator;

 @ccclass
 export class UnitComponent extends cc.Component {

    //单元脚本组件名称
    _sUnitCompName : string;
    //父节点
    _nodeParent : cc.Node;
    //单元组件的数据id
    _nUnitDataId : number;
    //脚本数据
    _oData : any;
    //父节点
    _parent : cc.Node;
    
    onLoad () : void {
        // super.onLoad(); 
        let self = this;

        self._fInitUI();
    }

    _fInitUI () : void {
        let btn : ButtonClick = this.node.addComponent("ButtonClick");
        btn.CreateButton(this, Common.fGetObjectName(this));
        // let name = this.fGetLogicComponentName();
        // let _comp = cc.director.getScene().getChildByName("LogicNode").getComponent(name);
        // _comp
    }
 }