import SceneComponent from "../../Frame/view/SceneComponent";
import { SCENE_NAME } from "../../Frame/common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class S_MenuScene extends SceneComponent {
    _tap_Button_StartGame (event, data) : void {
        let self = this;
        self._runScene(SCENE_NAME.START_SCENE);
    }

    _tap_Button_Rank (event, data) : void {

    }
}