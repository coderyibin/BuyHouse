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
    
    onLoad () : void {
        super.onLoad();
        let self = this;

        self._fInitUI();
        self.node.parent = self._nodeParent;
    }

    _fInitUI () : void {}
 }