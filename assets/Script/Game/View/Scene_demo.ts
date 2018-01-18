/*
author: JustinLin
日期:2018-01-17 14:54:04
*/
import { Emitter } from "../../Frame/ctrl/Emitter";
import SceneComponent from "../../Frame/view/SceneComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_demo extends SceneComponent {
   	//私有变量
   	//私有变量声明结束
   	//这边去声明ui组件
	ScrollView : cc.ScrollView = null;
	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
	}
}