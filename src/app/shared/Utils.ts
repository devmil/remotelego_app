export class Utils {
    static get isAndroid() : boolean {
        return navigator.userAgent.toLowerCase().indexOf("android") > -1;
    }

    static get isChrome() : boolean {
        return navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    }

    static get androidVersion() : number {
        if(!Utils.isAndroid) {
            return 0;
        }
        var userAgent: string = navigator.userAgent.toLowerCase();

        var match = userAgent.match("/android\\s([0-9\\.]*)/)");
        return match ? parseFloat(match[0]) : 0;
    }
}