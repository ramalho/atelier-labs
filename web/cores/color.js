// Color class
// implemented by Luciano Ramalho

// constructor
function Color(R, G, B, name) {
    this.r = R;
    this.g = G;
    this.b = B;
    if (typeof name != 'undefined') {
        this.name = name;
    };
}

// constants

Color.TRANSPARENT = new Color(-1,-1,-1, 'transparent');
Color.BLACK = new Color(0,0,0, 'black');
Color.LIGHT_GRAY = new Color(191,191,191, 'lightgray');
Color.WHITE = new Color(255,255,255, 'white');
Color.RED = new Color(255,0,0, 'red');
Color.GREEN = new Color(0,255,0, 'green');
Color.BLUE = new Color(0,0,255, 'blue');

Color.NAMES = {
    'aliceblue'            :'#F0F8FF', // 1
    'antiquewhite'         :'#FAEBD7', // 2
    'aqua'                 :'#00FFFF', // 3
    'aquamarine'           :'#7FFFD4', // 4
    'azure'                :'#F0FFFF', // 5
    'beige'                :'#F5F5DC', // 6
    'bisque'               :'#FFE4C4', // 7
    'black'                :'#000000', // 8
    'blanchedalmond'       :'#FFEBCD', // 9
    'blue'                 :'#0000FF', // 10
    'blueviolet'           :'#8A2BE2', // 11
    'brown'                :'#A52A2A', // 12
    'burlywood'            :'#DEB887', // 13
    'cadetblue'            :'#5F9EA0', // 14
    'chartreuse'           :'#7FFF00', // 15
    'chocolate'            :'#D2691E', // 16
    'coral'                :'#FF7F50', // 17
    'cornflowerblue'       :'#6495ED', // 18
    'cornsilk'             :'#FFF8DC', // 19
    'crimson'              :'#DC143C', // 20
    'cyan'                 :'#00FFFF', // 21
    'darkblue'             :'#00008B', // 22
    'darkcyan'             :'#008B8B', // 23
    'darkgoldenrod'        :'#B8860B', // 24
    'darkgray'             :'#A9A9A9', // 25
    'darkgreen'            :'#006400', // 26
    'darkkhaki'            :'#BDB76B', // 27
    'darkmagenta'          :'#8B008B', // 28
    'darkolivegreen'       :'#556B2F', // 29
    'darkorange'           :'#FF8C00', // 30
    'darkorchid'           :'#9932CC', // 31
    'darkred'              :'#8B0000', // 32
    'darksalmon'           :'#E9967A', // 33
    'darkseagreen'         :'#8FBC8F', // 34
    'darkslateblue'        :'#483D8B', // 35
    'darkslategray'        :'#2F4F4F', // 36
    'darkturquoise'        :'#00CED1', // 37
    'darkviolet'           :'#9400D3', // 38
    'deeppink'             :'#FF1493', // 39
    'deepskyblue'          :'#00BFFF', // 40
    'dimgray'              :'#696969', // 41
    'dodgerblue'           :'#1E90FF', // 42
    'firebrick'            :'#B22222', // 43
    'floralwhite'          :'#FFFAF0', // 44
    'forestgreen'          :'#228B22', // 45
    'fuchsia'              :'#FF00FF', // 46
    'gainsboro'            :'#DCDCDC', // 47
    'ghostwhite'           :'#F8F8FF', // 48
    'gold'                 :'#FFD700', // 49
    'goldenrod'            :'#DAA520', // 50
    'gray'                 :'#808080', // 51
    'green'                :'#008000', // 52
    'greenyellow'          :'#ADFF2F', // 53
    'honeydew'             :'#F0FFF0', // 54
    'hotpink'              :'#FF69B4', // 55
    'indianred'            :'#CD5C5C', // 56
    'indigo'               :'#4B0082', // 57
    'ivory'                :'#FFFFF0', // 58
    'khaki'                :'#F0E68C', // 59
    'lavender'             :'#E6E6FA', // 60
    'lavenderblush'        :'#FFF0F5', // 61
    'lawngreen'            :'#7CFC00', // 62
    'lemonchiffon'         :'#FFFACD', // 63
    'lightblue'            :'#ADD8E6', // 64
    'lightcoral'           :'#F08080', // 65
    'lightcyan'            :'#E0FFFF', // 66
    'lightgoldenrodyellow' :'#FAFAD2', // 67
    'lightgreen'           :'#90EE90', // 68
    'lightgrey'            :'#D3D3D3', // 69
    'lightgray'            :'#D3D3D3', // 69 // grAy
    'lightpink'            :'#FFB6C1', // 70
    'lightsalmon'          :'#FFA07A', // 71
    'lightseagreen'        :'#20B2AA', // 72
    'lightskyblue'         :'#87CEFA', // 73
    'lightslategray'       :'#778899', // 74
    'lightsteelblue'       :'#B0C4DE', // 75
    'lightyellow'          :'#FFFFE0', // 76
    'lime'                 :'#00FF00', // 77
    'limegreen'            :'#32CD32', // 78
    'linen'                :'#FAF0E6', // 79
    'magenta'              :'#FF00FF', // 80
    'maroon'               :'#800000', // 81
    'mediumaquamarine'     :'#66CDAA', // 82
    'mediumblue'           :'#0000CD', // 83
    'mediumorchid'         :'#BA55D3', // 84
    'mediumpurple'         :'#9370DB', // 85
    'mediumseagreen'       :'#3CB371', // 86
    'mediumslateblue'      :'#7B68EE', // 87
    'mediumspringgreen'    :'#00FA9A', // 88
    'mediumturquoise'      :'#48D1CC', // 89
    'mediumvioletred'      :'#C71585', // 90
    'midnightblue'         :'#191970', // 91
    'mintcream'            :'#F5FFFA', // 92
    'mistyrose'            :'#FFE4E1', // 93
    'moccasin'             :'#FFE4B5', // 94
    'navajowhite'          :'#FFDEAD', // 95
    'navy'                 :'#000080', // 96
    'oldlace'              :'#FDF5E6', // 97
    'olive'                :'#808000', // 98
    'olivedrab'            :'#6B8E23', // 99
    'orange'               :'#FFA500', // 100
    'orangered'            :'#FF4500', // 101
    'orchid'               :'#DA70D6', // 102
    'palegoldenrod'        :'#EEE8AA', // 103
    'palegreen'            :'#98FB98', // 104
    'paleturquoise'        :'#AFEEEE', // 105
    'palevioletred'        :'#DB7093', // 106
    'papayawhip'           :'#FFEFD5', // 107
    'peachpuff'            :'#FFDAB9', // 108
    'peru'                 :'#CD853F', // 109
    'pink'                 :'#FFC0CB', // 110
    'plum'                 :'#DDA0DD', // 111
    'powderblue'           :'#B0E0E6', // 112
    'purple'               :'#800080', // 113
    'red'                  :'#FF0000', // 114
    'rosybrown'            :'#BC8F8F', // 115
    'royalblue'            :'#4169E1', // 116
    'saddlebrown'          :'#8B4513', // 117
    'salmon'               :'#FA8072', // 118
    'sandybrown'           :'#F4A460', // 119
    'seagreen'             :'#2E8B57', // 120
    'seashell'             :'#FFF5EE', // 121
    'sienna'               :'#A0522D', // 122
    'silver'               :'#C0C0C0', // 123
    'skyblue'              :'#87CEEB', // 124
    'slateblue'            :'#6A5ACD', // 125
    'slategray'            :'#708090', // 126
    'snow'                 :'#FFFAFA', // 127
    'springgreen'          :'#00FF7F', // 128
    'steelblue'            :'#4682B4', // 129
    'tan'                  :'#D2B48C', // 130
    'teal'                 :'#008080', // 131
    'thistle'              :'#D8BFD8', // 132
    'tomato'               :'#FD6347', // 133
    'turquoise'            :'#40E0D0', // 134
    'violet'               :'#EE82EE', // 135
    'wheat'                :'#F5DEB3', // 136
    'white'                :'#FFFFFF', // 137
    'whitesmoke'           :'#F5F5F5', // 138
    'yellow'               :'#FFFF00', // 139
    'yellowgreen'          :'#9ACD32'  // 140
}

// class methods

Color.Hex = function(hexColor) {
    // hexColor must be formated as #rrggbb
    if (hexColor.charAt(0) == '#' && hexColor.length == 7) { 
        var r = parseInt(hexColor.slice(1,3),16);
        var g = parseInt(hexColor.slice(3,5),16);
        var b = parseInt(hexColor.slice(5,7),16);
        return new Color(r, g, b);
    }
}

Color.Named = function(colorName) {
    var value = Color.NAMES[colorName.toLowerCase()];
    var color = null;
    if (typeof value != 'undefined') {
        color = Color.Hex(value);
        color.setName(colorName);
        return color;
    }
}    

Color.Triplet = function(rgbTriplet) {
    // hexColor must be formated as rgb(rrr,ggg,bbb)
    var start = rgbTriplet.indexOf('(') + 1;
    var end = rgbTriplet.indexOf(')') - 1;
    var triplet = rgbTriplet.substr(start,end-start+1);
    var values = triplet.split(',');
    if (values.length == 3) { 
        var r = parseInt(values[0]);
        var g = parseInt(values[1]);
        var b = parseInt(values[2]);
        return new Color(r, g, b);
    }
}

Color.FromString = function(colorStr) {
    if (colorStr.charAt(0) == '#') {
        return Color.Hex(colorStr);
    } 
    else if (colorStr.substring(0,4).toLowerCase() == 'rgb(') {
        return Color.Triplet(colorStr);
    } 
    else if (colorStr.toLowerCase() =='transparent'){
        return Color.TRANSPARENT;
    }
    else {// assume it's a named color
        return Color.Named(colorStr);
    }
}

Color.HSB = function(hue, saturation, brightness) {
    // creates a new RGBColor instance with given HSB value
    // hue, saturation, brightness should be in range 0...1
    // adapted from java/awt/Color.java
    var r = 0, g = 0, b = 0;
    if (saturation == 0) {
        r = g = b = brightness * 255.0 + 0.5;
    } 
    else {
        var h = (hue - Math.floor(hue)) * 6.0;
        var f = h - Math.floor(h);
        var p = brightness * (1.0 - saturation);
        var q = brightness * (1.0 - saturation * f);
        var t = brightness * (1.0 - (saturation * (1.0 - f)));
        switch (Math.floor(h)) {
            case 0:
                r = brightness * 255.0 + 0.5;
                g = t * 255.0 + 0.5;
                b = p * 255.0 + 0.5;
                break;
            case 1:
                r = q * 255.0 + 0.5;
                g = brightness * 255.0 + 0.5;
                b = p * 255.0 + 0.5;
                break;
            case 2:
                r = p * 255.0 + 0.5;
                g = brightness * 255.0 + 0.5;
                b = t * 255.0 + 0.5;
                break;
            case 3:
                r = p * 255.0 + 0.5;
                g = q * 255.0 + 0.5;
                b = brightness * 255.0 + 0.5;
                break;
            case 4:
                r = t * 255.0 + 0.5;
                g = p * 255.0 + 0.5;
                b = brightness * 255.0 + 0.5;
                break;
            case 5:
                r = brightness * 255.0 + 0.5;
                g = p * 255.0 + 0.5;
                b = q * 255.0 + 0.5;
                break;
        }
    } // else
    var color = new Color(Math.floor(r), Math.floor(g), Math.floor(b));
    color.hue = hue;
    color.saturation = saturation;
    color.brightness = brightness;
    return color;
} // Color.HSB

// instance methods
Color.prototype.setHSB = function(hue, saturation, brightness) {
    var newColor = Color.HSB(hue, saturation, brightness);
    this.r = newColor.r;
    this.g = newColor.g;
    this.b = newColor.b;
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
}

Color.prototype.setName = function(name) {
    this.name  = name.toLowerCase();
}


Color.prototype.toString = function() {
    if (this == Color.TRANSPARENT) return 'transparent'
    else return 'rgb('+this.r+ ', '+this.g+', '+this.b+')';
}

Color.prototype.toHexString = function() {
    if (this == Color.TRANSPARENT) return 'transparent'
    else {
        var rr = this.r.toString(16);
        rr = (rr.length == 1) ? '0' + rr : rr;
        var gg = this.g.toString(16);
        gg = (gg.length == 1) ? '0' + gg : gg;
        var bb = this.b.toString(16);
        bb = (bb.length == 1) ? '0' + bb : bb;
        return '#'+rr+gg+bb;  
    }    
}

Color.prototype.equalsString = function(colorStr) {
    if (colorStr.charAt(0) == '#') {
        return colorStr == this.toHexString();
    } 
    else if (colorStr.substring(0,4).toLowerCase() == 'rgb(') {
        return colorStr.toLowerCase() == this.toString();
    } 
    else {// assume it's transparent or a named color
        if (typeof this.name != 'undefined') {
            return colorStr.toLowerCase() == this.name;
        }
        else return false;
    }
}


Color.prototype.calculateHSB = function() {
    var r = this.r;
    var g = this.g;
    var b = this.b;
	var hue, saturation, brightness;
    var cmax = (r > g) ? r : g;
	if (b > cmax) cmax = b;
	var cmin = (r < g) ? r : g;
	if (b < cmin) cmin = b;

	brightness = cmax / 255.0;
	if (cmax != 0)
	    saturation = (cmax - cmin) / cmax;
	else
	    saturation = 0;
	if (saturation == 0)
	    hue = 0;
	else {
	    var redc =   (cmax - r) / (cmax - cmin);
	    var greenc = (cmax - g) / (cmax - cmin);
	    var bluec =  (cmax - b) / (cmax - cmin);
	    if (r == cmax)
		hue = bluec - greenc;
	    else if (g == cmax)
	        hue = 2.0 + redc - bluec;
            else
		hue = 4.0 + greenc - redc;
	    hue = hue / 6.0;
	    if (hue < 0)
		hue = hue + 1.0;
	}
	this.hue = hue;
	this.saturation = saturation;
	this.brightness = brightness;
}


Color.prototype.dark = function () {
    // returns true if color is closer to black than to white
    return (this.r*2 + this.g*3 + this.b) < (127 * 6);
}


// Based on ColorMatch 5K by Kim Jensen http://colormatch.dk/
// Refactored by Modified by Twyst http://color.twysted.net/
// Rerefactored by Luciano Ramalho http://ramalho.org/

Color.prototype.match = function() {
    // returns an array of 9 matching colors, including this
	var colors = new Array();
	var hs = new Object();
	if (typeof this.hue == 'undefined') {
	    this.calculateHSB();
	}
	hs.h = this.hue * 360.0;
	hs.s = this.saturation * 100.0;
	hs.v = this.brightness * 100.0;
	var z=new Object();
	var y=new Object();
	var yx=new Object();
	var p=new Object();
	var pr=new Object();
	p.s = y.s = hs.s;
	p.h = y.h = hs.h;
	if(hs.v>70) {
		y.v = hs.v-30;
		p.v = y.v +15;
	} else {
		y.v = hs.v+30;
		p.v = y.v-15;
	};
	colors.push({h:p.h,s:p.s,v:p.v}); //0
	colors.push({h:y.h,s:y.s,v:y.v}); //1
	if((hs.h>=0)&&(hs.h<30)) {
		pr.h=yx.h=y.h=hs.h+20;
		pr.s=yx.s=y.s=hs.s;
		y.v=hs.v;
		if(hs.v>70) {
			yx.v=hs.v-30;
			pr.v = yx.v +15;
		} else {
			yx.v=hs.v+30;
			pr.v = yx.v -15;
		}
	}
	if((hs.h>=30)&&(hs.h<60)) {
		pr.h=yx.h=y.h=hs.h+150;
		y.s=rc(hs.s-30,100);
		y.v=rc(hs.v-20,100);
		pr.s=yx.s=rc(hs.s-70,100);
		yx.v=rc(hs.v+20,100);
		pr.v=hs.v;
	}
	if((hs.h>=60)&&(hs.h<180)) {
		pr.h=yx.h=y.h=hs.h-40;
		pr.s=y.s=yx.s=hs.s;
		y.v=hs.v;
		if(hs.v>70) {
			yx.v=hs.v-30;
			pr.v = yx.v +15;
		} else {
			yx.v=hs.v+30;
			pr.v = yx.v -15;
		}
	}
	if((hs.h>=180)&&(hs.h<220)) {
		pr.h=yx.h=hs.h-170;
		y.h=hs.h-160;
		pr.s=yx.s=y.s=hs.s;
		y.v=hs.v;
		if(hs.v>70) {
			yx.v=hs.v-30;
			pr.v = yx.v +15;
		} else {
			yx.v=hs.v+30;
			pr.v = yx.v -15;
		}
	}
	if((hs.h>=220)&&(hs.h<300)) {
		pr.h=yx.h=y.h=hs.h;
		pr.s=yx.s=y.s=rc(hs.s-60,100);
		y.v=hs.v;
		if(hs.v>70) {
			yx.v=hs.v-30;
			pr.v = yx.v +15;
		} else {
			yx.v=hs.v+30;
			pr.v = yx.v -15;
		}
	}
	if(hs.h>=300) {
		if(hs.s>50) {
			pr.s=y.s=yx.s=hs.s-40;
		} else {
			pr.s=y.s=yx.s=hs.s+40;
		}
		pr.h=yx.h=y.h=(hs.h+20)%360;
		y.v=hs.v;
		if(hs.v>70) {
			yx.v=hs.v-30;
			pr.v = yx.v +15;
		} else {
			yx.v=hs.v+30;
			pr.v = yx.v -15;
		}
	}
    colors.push({h:y.h,s:y.s,v:y.v}); //2
    colors.push({h:yx.h,s:yx.s,v:yx.v}); //3
	y.h=0;
	y.s=0;
	y.v=100-hs.v;
	colors.push({h:y.h,s:y.s,v:y.v}); //4
	y.h=0;
	y.s=0;
	y.v=hs.v;
	colors.push({h:y.h,s:y.s,v:y.v}); //5
	colors.push({h:pr.h,s:pr.s,v:pr.v}); //6
	if(hs.v >= 50) { pr.v = 0 } else { pr.v = 100 } 
	pr.h=pr.s=0;
	colors.push({h:pr.h,s:pr.s,v:pr.v}); //7
    for (var i=0; i<colors.length; i++) {
	    colors[i] = Color.HSB(colors[i].h/360.0, 
	                          colors[i].s/100.0, 
	                          colors[i].v/100.0);
	}
	colors.unshift(this); // insert this color
	return colors;

}
function rc(x,m) {
	if(x>m) { return m };
	if(x<0) { return 0 };
	return x;
}


