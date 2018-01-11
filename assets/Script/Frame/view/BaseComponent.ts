/**
 * 该脚本为逻辑组件脚本基类，所有逻辑节点都继承该类
 * 创建于 2017/12/24
 */
const {ccclass, property, executionOrder} = cc._decorator;
import { Emitter } from "../ctrl/Emitter"
import { ClientData } from "../module/ClientData"
import { RES, RES_TYPE } from "../common/resource";
import { LOCAL_KEY } from "../common/Common";
import ButtonClick from "./ButtonClick";

@ccclass
@executionOrder(0)
export default class BaseComponent extends cc.Component {
    @property(cc.Node)
    ArrButton : cc.Node[] = [];
    @property(cc.Label)
    ArrLabel : cc.Label[] = [];
    @property(cc.Node)
    Canvas : cc.Node = null;
    // @property({
    //     type : cc.Node,
    //     tooltip: "这是一个屏蔽层layer",
    // })
    // ShieldNode : cc.Node = null;

    _emitter : Emitter;
    _client : ClientData;
    // _playerCtrl : PlayerCtrl;
    // _gameCtrl : GameCtrl;
    _logicComponentName : string;
    _spriteFrame : {};
    _fExitFunc : Function;
    _LabelData : any;//文本对象集合
    onLoad () : void {
        cc.director.setDisplayStats(false);
        let self = this; 
        self._emitter = Emitter.getInstance();
        self._client = ClientData.getInstance();
        // self._playerCtrl = PlayerCtrl.getInstance();
        // self._gameCtrl = GameCtrl.getInstance();
        self._initData();
        if (self._isLogicNode()) {
            self._logicNode();
        }
        self._initUI();
    }

    _initUI () : void {
        let self = this;
    }

    _initData () : void {
        let self = this;
        self._fExitFunc = null;
        self._LabelData = {};
    }

    /**
     * 逻辑节点做得一些另外的操作
     */
    _logicNode () : void {
        let self = this;
        //当前如果是逻辑节点才去注册这个事件，避免重复注册
        // self._emitter.on("runScene", self._runScene, self);
        self._logicComponentName = self.fGetLogicComponentName();
        
        self._registerButton();
        self._fLabelObject();
    }

    /**
     * 注册按钮事件
     */
    _registerButton () : void {
        let self = this;   
        for (let i in self.ArrButton) {
            let _node = self.ArrButton[i];
            let _btn : ButtonClick = _node.getComponent("ButtonClick");
            if (! _btn) {
                _btn.addComponent("ButtonClick");
            }
            _btn.CreateButton(self, _node.name);
        }
    }

    /**
     * 分析文本对象
     */
    _fLabelObject () : void {
        let self = this;
        for (let i in self.ArrLabel) {
            let sName = self.ArrLabel[i].node.name;
            self._LabelData[sName] = self.ArrLabel[i];
        }
    }

    /**
     * 判断当前节点是否是逻辑节点
     * @return 是否是逻辑节点
     */
    _isLogicNode () : boolean {
        let self = this;
        return self.node.name == "LogicNode" ? true : false; 
    }

    /**
     * 获取当前场景大小
     * @return 场景大小尺寸
     */
    getWinSize () : cc.Size {
        return cc.director.getWinSize();
    }

    /**
     * 获取当前场景逻辑组件名称
     */
    fGetLogicComponentName () : string {
        let scene = cc.director.getScene().name;
        cc.log(scene);
        return "S_" + scene;
    }

    /**
     * 获取当前脚本对象名称
     * @return 脚本对象名称
     */
    getObjectName () : string {
        let self = this;
        let name : string = self.name;
        let index : number = name.indexOf("<");
        name = name.slice(index + 1, name.length - 1);
        return name;
    }

    /**
     * 当前组件被销毁时调用
     */
    onDestroy () : void {
       
    }

    /**
     * 场景跳转之前做的一些业务
     */
    onExit () : void {
        let self = this;
        if (self._fExitFunc) self._fExitFunc(); 
        //当前场景资源的释放
        RES.fReleaseRes(RES_TYPE.MODULE);
    }

    /**
     * 清理游戏数据
     * @param key 要清理的对象数据数组 
     */
    _cleanData (key : Array<string>) : void {
        let self = this;
        // self._playerCtrl.fCleanData([LOCAL_KEY.PLAYER]);
    }
}