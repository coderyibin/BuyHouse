/**
 * 游戏数据结构体的配置
 */

 interface inter_Player {
    nBout ?: number;//本局得分
    nMaxScore ?: number;//最高分数
    sCurTime ?: string;//当局时间
    sShortTime ?: string;//最短时间
 }

 interface inter_Config {
     mode ?: number;//游戏模式
     Speed ?: number;//游戏速度
     challenge ?: boolean//是否挑战成功
     PanelCount ?: number//方块数量--经典模式
 }