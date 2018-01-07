import SceneComponent from "./SceneComponent";
import { RES } from "../common/resource";

const { ccclass } = cc._decorator;

@ccclass
export default class BaseLoading extends SceneComponent {
    onLoad () : void {
        RES.loadResConfig((file)=>{
            //读取资源配置
            this.loadRes(file);
        });
    }

    loadRes (file : any) : void {
    }
}