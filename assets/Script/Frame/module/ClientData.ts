/**
 * 游戏数据单利
 */

export class ClientData {
    private _oResource : any;
    private _oGameConfig : any;
    

    constructor () {
        let self = this;
        self._oResource = {};
        self._oGameConfig = {};
    }

    /**设置游戏配置
     * json数据格式
     * {mode : value}
    */
    fSetGameConfig (res : inter_Config) : void {
        for (let i in res) {
            this._oGameConfig[i] = res[i];
        }
    }
    fGetGameConfig () : inter_Config {
        return this._oGameConfig;
    }

    //设置获取资源文件数据
    fSetResData (res : any) : void {
        this._oResource = res;
    }
    fGetResData () : any {
        return this._oResource;
    }

    static _oData : ClientData;
    static getInstance () : ClientData {
        let self = this;
        if (! self._oData) {
            self._oData = new ClientData();
            return self._oData;
        }
        return self._oData;
    }
}

cc["GameConfig"] = ClientData.getInstance();