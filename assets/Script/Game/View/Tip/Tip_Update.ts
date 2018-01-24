/*
author: JustinLin
日期:2018-01-20 16:42:29
*/
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
	@property({
		tooltip : "进度条节点",
		type : cc.Node
	})
	Node_Progress : cc.Node =  null;

	@property({
		tooltip : "当前的更新进度条",
		type : cc.ProgressBar
	})
	Progress_Update : cc.ProgressBar = null;

	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
		this.Node_Progress.active = false;
	}

   //渲染结束后会调用
	initUi () : void {
		this.Progress_Update.progress = 0;
		this.Progress_Update.totalLength = 300;
		this._LabelData["label_CurProgress"].string = 0;
		this._LabelData["label_TotalProgress"].string = 0;
	}

	_tap_HotUpdate () : void {
		if (this._oData.cb) this._oData.cb(); 
	}

	setProgressLength (cur : number, total : number) : void {
		this.Node_Progress.active = true;
		this.Progress_Update.totalLength = total;
		this.Progress_Update.progress = cur;
		this._LabelData["label_CurProgress"].string = cur;
		this._LabelData["label_TotalProgress"].string = total;
	}
}