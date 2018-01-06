import { BaseData } from "./BaseData";


/**
 * 该类为人物数据的基类-包括玩家自己，玩伴，怪物之类的
 * 不可为单例模式
 */

 export default class Hero extends BaseData {
    //玩家名称
    _name : string = "";
    //玩家uid
    _uid : number = 0;
    constructor () {
        super();
    }

    //清理数据
    fCleanData (key : string) : void {
    }
 }