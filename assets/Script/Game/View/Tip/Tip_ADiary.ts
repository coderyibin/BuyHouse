/*
author: JustinLin
日期:2018-01-18 09:17:46
*/
import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip_ADiary extends LayerComponent {
   //私有变量
   _id : number = 0;
   //私有变量声明结束
   //这边去声明ui组件

   //声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
	}

   //渲染结束后会调用
	initUi () : void {
		//创建当前类时传进来的数据
		let data = this._oData || null;
       	cc.log(data);
		this._LabelData["label_Content"].string = data.text;
	}
	
	_tap_node_shiled () : void {
		this.removeSelf();
	}
}