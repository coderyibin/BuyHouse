import BaseComponent from "./BaseComponent";
import { RES } from "../common/resource";
import LayerComponent from "./LayerComponent";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class SceneComponent extends BaseComponent {

    onLoad () : void {
        super.onLoad();
        let self = this;
        self._emitter.on("runScene", self._runScene, self);
    }
    /**
     * 跳转场景
     * @param 跳转的场景名称
     * @param 跳转后的回调函数？
     */
    protected _runScene (sceneName : string, callBack ?: Function) : void {
        let self = this;
        cc.director.preloadScene(sceneName, (err) => {
            if (err) {
                cc.warn("场景预加载失败->[", sceneName, "]");
                debugger;
            } else {
                self.onExit();
                cc.director.loadScene(sceneName, callBack);
            }
        });
    }

    /**
     * 显示弹窗
     */
    showLayer (module : string, data ?: any) : void {
        this._fAddLayerToCanvas();
        let node = RES.fGetRes(module);
        let comp = node.getComponent(module);
        if (comp) {
            node.getComponent(module).init(data);
            let canvas = cc.find("Canvas");
            canvas.addChild(node);    
        } else {
            cc.warn("未创建脚本组件", module);
        }
    }

    /**
     * 添加屏蔽层到canvas节点
     */
    _fAddLayerToCanvas () : void {
        let canvas = cc.find("Canvas");
        let node = new cc.Node();
        node.name = "shield";
        let btn = node.addComponent(cc.Button);
        node.setContentSize(this.getWinSize());
        canvas.addChild(node);
        node.color = cc.Color.GRAY;
    }
}