import { Common } from "../common/Common";
import LayerComponent from "./LayerComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseTip extends LayerComponent {

    onLoad () : void {
        this.node.scale = 0.2;
        let action = cc.scaleTo(0.2, 1.0);
        this.node.runAction(action);
    }

    
}