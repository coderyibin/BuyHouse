import SceneComponent from "./SceneComponent";
import { RES } from "../common/resource";

const { ccclass } = cc._decorator;

@ccclass
export default class BaseLoading extends SceneComponent {
    onLoad () : void {
        RES.loadResConfig((file)=>{
            this.loadRes(file);
        });
    }

    loadRes (file : any) : void {
    }
}