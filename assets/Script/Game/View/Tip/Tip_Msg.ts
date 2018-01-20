/*
author: JustinLin
日期:2018-01-20 16:42:29
*/
import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";
import BaseTip from "../../../Frame/view/BaseTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip_Msg extends BaseTip {
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
		if (data.Title) this._LabelData["label_TiShi"].string = data.Title;
		if (data.Content) this._LabelData["label_Content"].string = data.Content;
	}

	_tap_Cancel () : void {
		super._tap_Cancel();
		if (this._oData.cb) this._oData.cb(); 
	}
}