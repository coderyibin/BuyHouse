/*
author: JustinLin
日期:2018-01-18 20:13:55
*/
import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Layer_SaleHouse extends LayerComponent {
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
		this.node.x = - this.getWinSize().width / 2;
		this.node.y = - this.getWinSize().height * 2 + 400;
		let action = cc.moveTo(1.5, new cc.Vec2(- this.getWinSize().width / 2, - this.getWinSize().height / 2));
		this.node.runAction(action);
		let game = GameCtrl.getInstance();
		let money = game.fGetPlayerData().PlayerMoney;
		this._LabelData["label_Money"].string = money;
		let house = game.fGetHouseList();
		
	}

	_list_House () : any {
		return [{name:"ss5555"},{name:"ww5555"},{name:"55rr55"},{name:"55"}];
	}

	_tap_Btn_Buy () : void {

	}

	_tap_Btn_Cancel () : void {
		this.removeSelf();
	}

}