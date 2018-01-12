
/**
 * 游戏数据单利
 */

export class ClientData {
    private _oResource : any;
    private _oGameConfig : any;
    private _oProductData : any;
    

    constructor () {
        let self = this;
        console.log("客户端数据初始化");
        self._oResource = {};
        self._oGameConfig = {};
        // self._loadInitConfig();
    }

    // //加载初始化配置
    // private _loadInitConfig () {
    //     let self = this;
    //     setTimeout(()=>{
    //         RES.loadJson("Product", (res)=>{
    //             cc["Product"] = res;
    //             self._oProductData = res;
    //         });
    //         RES.loadJson("Config", (res : inter_Config)=>{
    //             cc["Config"] = res;
    //             self._oGameConfig = res;
    //         });
    //     }, 1000);
        
    // }

    init () : void {
        cc["Product"] = cc["RES"].Res.global.Product;
        this._oProductData = cc["Product"];
        delete cc["RES"].Res.global.Product;
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

    /**
     * 获取产品数据
     * @param 产品id 选填
     */
    fGetProductData (id ?: number) : any {
        if (id) {
            for (let i in this._oProductData) {
                if (this._oProductData[i].id == id) {
                    return this._oProductData[i].price;
                }
            }
        }
        return this._oProductData;
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

// cc["ClientData"] = ClientData.getInstance();