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
    
    @property({
        tooltip : "房子价格",
        type : cc.Label
    })
    Label_HousePrice : cc.Label = null;
    
    @property({
        tooltip : "选中",
        type : cc.Node
    })
    Node_HouseSelect : cc.Node = null;

    onLoad () : void {
        super.onLoad();
    }

    
    initUi () : void { 
        this.Label_HouseName.string = this._oData.sName;
        this.Label_HouseDetail.string = this._oData.sDetails;
        this.Label_HousePrice.string = this._oData.nPrice;
        this.Sprite_HouseImg.spriteFrame = RES.fGetRes(this._oData.sPath);
        this.Node_HouseSelect.active = false;
    }
    
    _tap_Unit_House (event, data) : void {
        if (this._oData.cb) {
            this._oData.cb(this._oData.id, this._oData.nPrice);
        }
    }

    public HideSelected (id : number) : void {
        if (id == this._oData.id) {
            this.Node_HouseSelect.active = true;
        } else {
            this.Node_HouseSelect.active = false;
        }
    }

}