/*
author: JustinLin
日期:2018-01-18 20:13:55
*/
import LayerComponent from "../../../Frame/view/LayerComponent";
import { GameCtrl } from "../../Ctrl/GameCtrl";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";
import { MODULE } from "../../../Frame/common/Common";
import { Unit_House } from "../Unit_House";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Layer_SaleHouse extends LayerComponent {
	//私有变量
	private _id : number = 0;
	private _lists : Array<Unit_House> = [];
	private _selectPrice : number;
	private _nHousePrice : number;
	//私有变量声明结束
	//这边去声明ui组件
	@property({
		tooltip : "售楼列表",
		type : cc.ScrollView
	})
	HouseList : cc.ScrollView = null;
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
		for (let i in house) {
			house[i]["cb"] = this.SelectHouse.bind(this);
            let node = Unit_House.show(MODULE.House_UNIT, house[i]);
			this.HouseList.content.addChild(node);
			this._lists.push(node.getComponent(node.name));
		}
	}

	//选择要买的房子id,价格
	public SelectHouse (id : number, price : number) : void {
		for (let i in this._lists) {
			let comp = this._lists[i];
			comp.HideSelected(id);
		}
		this._selectPrice = price;
		this._nHousePrice = id;
	}

	_tap_Btn_Buy () : void {
		let data = GameCtrl.getInstance().fBuyHouse(this._nHousePrice);
	}

	_tap_Btn_Cancel () : void {
		this.removeSelf();
	}

}