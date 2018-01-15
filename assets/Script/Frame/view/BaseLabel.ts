
const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLabel extends cc.Label {

    get string () {
        return this.string;
    }

    set string (str : string) {
        this.string = str.replace(/%s/, str);
    }
}