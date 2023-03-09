export const monoImage = (imgdata: ImageData, ht: number, brightness = 1) => {
    var x = String.fromCharCode,
        m8 = [
            [2, 130, 34, 162, 10, 138, 42, 170],
            [194, 66, 226, 98, 202, 74, 234, 106],
            [50, 178, 18, 146, 58, 186, 26, 154],
            [242, 114, 210, 82, 250, 122, 218, 90],
            [14, 142, 46, 174, 6, 134, 38, 166],
            [206, 78, 238, 110, 198, 70, 230, 102],
            [62, 190, 30, 158, 54, 182, 22, 150],
            [254, 126, 222, 94, 246, 118, 214, 86],
        ],
        d = imgdata.data,
        w = imgdata.width,
        h = imgdata.height,
        r = new Array(((w + 7) >> 3) * h),
        n = 0,
        p = 0,
        q = 0,
        t = 128,
        e = new Array(),
        e1,
        e2,
        b,
        v,
        f,
        i,
        j;
    if (ht == 1) {
        i = w;
        while (i--) {
            e.push(0);
        }
    }
    for (j = 0; j < h; j++) {
        e1 = 0;
        e2 = 0;
        i = 0;
        while (i < w) {
            b = i & 7;
            if (ht == 0) {
                t = m8[j & 7][b];
            }
            v = (Math.pow((((d[p++] * 0.29891 + d[p++] * 0.58661 + d[p++] * 0.11448) * d[p]) / 255 + 255 - d[p++]) / 255, 1 / brightness) * 255) | 0;
            if (ht == 1) {
                v += (e[i] + e1) >> 4;
                f = v - (v < t ? 0 : 255);
                if (i > 0) {
                    e[i - 1] += f;
                }
                e[i] = f * 7 + e2;
                e1 = f * 5;
                e2 = f * 3;
            }
            if (v < t) {
                n |= 128 >> b;
            }
            i++;
            if (b == 7 || i == w) {
                r[q++] = x(n == 16 ? 32 : n);
                n = 0;
            }
        }
    }
    return r.join("");
}

function toBase64Binary(s: string) {
    var l = s.length,
        r = new Array(((l + 2) / 3) << 2),
        t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        p = (3 - (l % 3)) % 3,
        j = 0,
        i = 0,
        n;
    s += "\x00\x00";
    while (i < l) {
        n = (s.charCodeAt(i++) << 16) | (s.charCodeAt(i++) << 8) | s.charCodeAt(i++);
        r[j++] = t.charAt((n >> 18) & 63);
        r[j++] = t.charAt((n >> 12) & 63);
        r[j++] = t.charAt((n >> 6) & 63);
        r[j++] = t.charAt(n & 63);
    }
    while (p--) {
        r[--j] = "=";
    }
    return r.join("");
}
