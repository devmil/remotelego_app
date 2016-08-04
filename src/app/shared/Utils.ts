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

        var match = userAgent.match("android\\s([0-9\\.]*)");
        return match ? parseFloat(match[0]) : 0;
    }

    //UTF-8 Utils taken from Google Closure library
    //https://github.com/google/closure-library/blob/e877b1eac410c0d842bcda118689759512e0e26f/closure/goog/crypt/crypt.js

    public static stringToUTF8Bytes(input: String) : Uint8Array {
        // TODO(user): Use native implementations if/when available
        var out : Array<number> = new Array<number>(), p = 0;
        for (var i = 0; i < input.length; i++) {
            var c = input.charCodeAt(i);
            if (c < 128) {
                out.push(c);
            } else if (c < 2048) {
                out.push((c >> 6) | 192);
                out.push((c & 63) | 128);
            } else if (
                ((c & 0xFC00) == 0xD800) && (i + 1) < input.length &&
                ((input.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
                // Surrogate Pair
                c = 0x10000 + ((c & 0x03FF) << 10) + (input.charCodeAt(++i) & 0x03FF);
                out.push((c >> 18) | 240);
                out.push(((c >> 12) & 63) | 128);
                out.push(((c >> 6) & 63) | 128);
                out.push((c & 63) | 128);
            } else {
                out.push((c >> 12) | 224);
                out.push(((c >> 6) & 63) | 128);
                out.push((c & 63) | 128);
            }
        }
        return Uint8Array.from(out);
    }

    public static utf8BytesToString(input : Uint8Array) {
        // TODO(user): Use native implementations if/when available
        var out = [], pos = 0, c = 0;
        while (pos < input.length) {
            var c1 = input[pos++];
            if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
            } else if (c1 > 191 && c1 < 224) {
            var c2 = input[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
            } else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = input[pos++];
            var c3 = input[pos++];
            var c4 = input[pos++];
            var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
                0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
            } else {
            var c2 = input[pos++];
            var c3 = input[pos++];
            out[c++] =
                String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            }
        }
        return out.join('');
    }
}