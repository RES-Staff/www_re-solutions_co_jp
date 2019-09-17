// JavaScript Document　作成日：2012年11月9日

// クッキー操作-----------------------------------------------------------
// cookie constants
var cookieExpiresTime = 1000 * 60 * 60 * 24 * 7; // クッキー有効時間：一週間
var COOKIE_ATTRIBUTE = "font_style=";
var FONT_PREFIX = "STYLE_FONT_";

// get font cookie
function getFontCookie() {
	return getCookie(FONT_PREFIX + outerCss);
}

// get cookie
function getCookie(cookieValue) {
	// get attribute of cookie
	var cookieArray = unescape(document.cookie).split("; ");
	var len = cookieArray.length;
	var attributeLen = COOKIE_ATTRIBUTE.length;

	// get value of attribute
	var cookieValue;
	for (var i = 0; i < len; i++) {
		var cookieStr = cookieArray[i];
		if (cookieStr.substr(0, attributeLen) == COOKIE_ATTRIBUTE){
			cookieValue = cookieStr.substr(attributeLen, cookieStr.length);
			break;
		}
	}
	return cookieValue;
}

// set cookie
function setCookie(cookieValue) {
	// expires
	var exp = new Date();
	exp.setTime(exp.getTime() + cookieExpiresTime);
	// set cookie
	document.cookie = COOKIE_ATTRIBUTE + escape(cookieValue) + "; expires=" + exp.toGMTString();
}

// ブラウザを判別してCSS切り替えを実行--------------------------------------
// 現在は全ブラウザ同処理としている。
// IEの処理を"toggleCSS2()"へ変更するとIE専用のCSS切り替え処理になる。

// style constants
var STANDARD_IE = 'ie-Standard';		// IE
var STANDARD_NOT_IE = 'Standard';		// IE以外

function Css(){
	if (typeof document.documentElement.style.maxHeight != "undefined") {
		if (!/*@cc_on!@*/false){
			// IE以外
			toggleCSS(STANDARD_NOT_IE);

		} else if (document.documentMode >= 8) {
			// IE8 以降
			toggleCSS(STANDARD_IE);

		} else {
			//IE7, IE8（IE7 mode)
			toggleCSS(STANDARD_IE);
		}
	} else {
		// IE 6.0 以下
		toggleCSS(STANDARD_IE);
	}
}

// CSSファイル切り替え処理---------------------------------------------
// style flag
var outerCss = true;

// change CSS
function changeCSS(cssLinkId) {
	var cssLink = document.getElementById(cssLinkId);
	cssLink.rel = outerCss ? 'stylesheet' : 'stylesheet-off';
	return;
}

// toggle CSS
// param cssLinkId
function toggleCSS(cssLinkId) {
	// change CSS
	changeCSS(cssLinkId);
}


// onload
(function() {
	// get font cookie
	var fontCookie = getFontCookie();
	if (typeof(fontCookie) == undefined) {
		// empty cookie
		return;
	}

	// get font style
	var fontStrArray = fontCookie.split(FONT_PREFIX);
	fontStyle = fontStrArray[1];

	// cast css cookie
	outerCss = (fontStyle == 'true' ? true : false);

	// set css style
	Css();
})()

// onclick change css
function onclickChangeCss() {
	// change style flag
	outerCss = !outerCss;

	// set cookie
	setCookie(FONT_PREFIX + outerCss);

	// set css style
	Css();
}
