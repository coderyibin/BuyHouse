/**
 * 全局的一些数据结构
 */


 //商品的数据结构
 interface inter_Product {
    sName ?: string//商品名称
    nPrice ?: number//商品基础价格
    nMax ?: number//商品最大的波动价格比例
    nMin ?: number//商品最小的波动价格比例
    sNamePath ?: string//商品图片路径
    nLastPrice ?: number//商品上次价格
 }

 //资源结构
 interface inter_Res {
    Common ?: Array<string>//公共
    StartGame ?: Array<string>//开始游戏
 }

 interface inter_Player {
    nBout ?: number;//本局得分
    nMaxScore ?: number;//最高分数
    sCurTime ?: string;//当局时间
    sShortTime ?: string;//最短时间
    PlayerMoney ?: number//玩家初始金币
    PlayerHealth ?: number//玩家初始健康
    PlayerCurHealth ?: number//玩家当前健康
    PlayerReputation ?: number//玩家初始名声
    PlayerDeposit ?: number//存款
    nCurPackageCount ?: number//当前背包空间
    nAllPackageCount ?: number//总背包空间
}

 interface inter_Config {
     mode ?: number;//游戏模式
     Speed ?: number;//游戏速度
     challenge ?: boolean//是否挑战成功
     PanelCount ?: number//方块数量--经典模式
     ProductList ?: number//商品列表数量限制
     PlayerMoney ?: number//玩家初始金币
     PlayerHealth ?: number//玩家初始健康
     PlayerReputation ?: number//玩家初始名声
     GameTime ?: number//游戏时间
     RepositoryPrice ?: number//背包空间单价
     BaseHealth ?: number//健康基数
     MinHealth ?: number//最低健康
 }