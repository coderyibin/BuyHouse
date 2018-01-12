import BaseComponent from "./BaseComponent";
import { RES } from "../common/resource";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class SceneComponent extends BaseComponent {

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
        let canvas = cc.find("Canvas");
        canvas.addChild(node);        
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