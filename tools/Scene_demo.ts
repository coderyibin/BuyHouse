/*
author: JustinLin
日期:2018-01-17 09:51:03
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_demo extends SceneComponent {
   //私有变量
   //私有变量声明结束
   //这边去声明ui组件

	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
	}


}