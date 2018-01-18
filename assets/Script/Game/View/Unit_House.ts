import { UnitComponent } from "../../Frame/view/UnitComponent";
import { RES } from "../../Frame/common/resource";
import { GameCtrl } from "../Ctrl/GameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export class Unit_House extends UnitComponent {
    
    @property({
        tooltip : "房子缩略图",
        type : cc.Sprite
    })
    Sprite_HouseImg : cc.Sprite = null;
    
    @property({
        tooltip : "房子名称",
        type : cc.Label
    })
    Label_HouseName : cc.Label = null;
    
    @property({
        tooltip : "房子描述",
        type : cc.Label
    })
    Label_HouseDetail : cc.Label = null;

    onLoad () : void {
        super.onLoad();
    }

    
    initUi () : void { 
        this.Label_HouseName.string = this._oData.name;
    }
    
    _tap_Unit_Product (event, data) : void {
    }

}