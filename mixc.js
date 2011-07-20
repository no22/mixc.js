/***********************************************************************
  mixc.js ver. 1.0.0
  copyright (c) 2011 Hiroyuki OHARA
***********************************************************************/
(function($){
	var suffix = ".mixc.css";
	$(function(){
		$("link[rel=stylesheet]").each(function(){
			var url = $(this).attr("href");
			if (url.indexOf(suffix, url.length - suffix.length) !== -1) {
				$.get(url, {}, function(css){
					var mixrex = new RegExp(/\s*\/\*{4}\{mixc\}\**([\s\S]*?)\*{4,}\//g);
					while (m = mixrex.exec(css)) {
						var blkrex = new RegExp(/\s*([\s\S]+?)\{([\s\S]*?)\}/g);
						var mixc = m[1].replace(/^\s*\/\/.*$/gm, "");
						while (n = blkrex.exec(mixc)) {
							var linerex = new RegExp(/\s*([\s\S]+?)\s*;/g);
							while (o = linerex.exec(n[2])) {
								if (o[1].charAt(0) == ".") {
									$(n[1]).addClass(o[1].substr(1));
								}
								else {
									var attr = o[1].split(":", 2);
									$(n[1]).css(attr[0], attr[1]);
								}
							}
						}
					}
				});
			}
		});
	});
})(jQuery);
