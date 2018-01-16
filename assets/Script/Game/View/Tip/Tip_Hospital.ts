/*
author: JustinLin
日期:2018-01-16 09:21:35
*/
import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip_Hospital extends LayerComponent {
   //私有变量
   private _id : number = 0;
   private _money : number;
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
		// let data = this._oData;
		// cc.log(data);
		let data = GameCtrl.getInstance().fIsGotoHospistal();
		this._LabelData["label_Hint"].node.active = false;
		if (data.is) {//治疗不起
			this._LabelData["Label_Medati"].string = "需要花费 " + data.money;
			this._money = -1;
		} else {
			this._LabelData["Label_Medati"].string = "需要花费 " + data;
			this._money = data;
		}
	}

	_tap_Ok () : void {
		if (this._money < 0) {
			this._LabelData["label_Hint"].node.active = true;
			this._LabelData["label_Hint"].string = "钱不够，病都看不起了";
			return; 
		}
		GameCtrl.getInstance().fGoTreatment(this._money);
	}

}