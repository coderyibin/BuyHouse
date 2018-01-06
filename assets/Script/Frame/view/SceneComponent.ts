import BaseComponent from "./BaseComponent";

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
        cc.director.preloadScene(name, (err) => {
            if (err) {
                cc.warn("场景预加载失败->[", name, "]");
            } else {
                self.onExit();
                cc.director.loadScene(name, callBack);
            }
        });
    }
}