if(!window.zk){zk={};zk.booting=true;if(!window.Boot_progressbox){Boot_progressbox=function(b,h,q,p,r,a){var l='<div id="'+b+'"';var i=zk.innerX(),g=zk.innerY();if(r){if(zk._ctpgs.length){for(var o=zk._ctpgs.length,m=$e(zk._ctpgs[--o]);m;m=$e(zk._ctpgs[--o])){zk.applyMask(m)}return}l+='><div id="zk_mask" class="z-modal-mask" style="display:block;left:'+i+"px;top:"+g+'px;" z.x="'+i+'" z.y="'+g+'"></div><div'}else{l+="><div"}if(typeof q!="string"||q.indexOf("%")==-1){q+="px"}if(typeof p!="string"||p.indexOf("%")==-1){p+="px"}l+=' id="zk_loading" class="z-loading" style="left:'+q+";top:"+p+';visibility: hidden;" z.x="'+i+'" z.y="'+g+'"><div class="z-loading-indicator"><img class="z-loading-icon" alt="..." src="'+zk.getUpdateURI("/web/img/spacer.gif")+'"/> '+h+"</div></div></div>";var f=document.createElement("DIV");document.body.appendChild(f);zk._setOuterHTML(f,l);if(r){var k=$e("zk_mask");zk.listen(k,"mousemove",Event.stop);zk.listen(k,"click",Event.stop)}var d=$e("zk_loading");if(a){if(d){d.style.left=(zk.innerWidth()-d.offsetWidth)/2+i+"px";d.style.top=(zk.innerHeight()-d.offsetHeight)/2+g+"px";setZKAttr(d,"x",i);setZKAttr(d,"y",g)}}zk.cleanVisibility(d);return $e(b)}}if(!window.AU_progressbox){AU_progressbar=function(c,b,a){Boot_progressbox(c,b,zk.innerX(),zk.innerY(),a)}}function $int(c,a){c=c?parseInt(c,a||10):0;return isNaN(c)?0:c}zk.agent=navigator.userAgent.toLowerCase();zk.safari=zk.agent.indexOf("safari")>=0;zk.opera=zk.agent.indexOf("opera")>=0;zk.gecko=zk.agent.indexOf("gecko/")>=0&&!zk.safari&&!zk.opera;if(zk.gecko){var j=zk.agent.indexOf("firefox/");j=$int(zk.agent.substring(j+8));zk.gecko3=j>=3;zk.gecko2Only=!zk.gecko3}else{if(!zk.opera){var j=zk.agent.indexOf("msie ");zk.ie=j>=0;if(zk.ie){j=$int(zk.agent.substring(j+5));zk.ie7=j>=7;zk.ie8=j>=8;zk.ie6Only=!zk.ie7}}}zk.air=zk.agent.indexOf("adobeair")>=0;zk._js4ld={};zk._ctpgs=[];zk._gevts={};zk._jscnt=0;zk._jsmap={};zk.voidf=function(){return false};zk.on=function(d,f,c){var g=typeof d=="string"?d:d?d.id:null;if(!g){zk.error(mesg.COMP_OR_UUID_REQUIRED);return}var a=zk._gevts[g];if(!a){zk._gevts[g]=a={}}var b=a[f];if(!b){a[f]=b=[]}b.push(c)};zk.un=function(d,f,c){var a=zk.find(d),b=a[f];if(b){b.remove(c);if(!b.length){delete a[f]}}};zk.unAll=function(c){var a=zk.find(c);for(var d in a){var b=a[d];delete a[d];b=null}};zk.find=function(b,c){var d=typeof b=="string"?b:b?b.id:null;if(!d){return null}var a=zk._gevts[d];return a?c?a[c]:a:null};zk.fire=function(h,l,b,g){var d=zk.find(h,l);if(d){h=$e(h);for(var c=0,a=d.length;c<a;c++){var k=d[c];if(!b){b=[h]}if(k.apply(g||h,b)===false){return}}}};zk.listen=function(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{b.attachEvent("on"+c,a)}if("submit"==c&&$tag(b)=="FORM"){if(!b._submfns){b._submfns=[]}b._submfns.push(a)}};zk.unlisten=function(b,d,a){if(b.removeEventListener){b.removeEventListener(d,a,false)}else{if(b.detachEvent){try{b.detachEvent("on"+d,a)}catch(c){}}}if("submit"==d&&$tag(b)=="FORM"&&b._submfns){b._submfns.remove(a)}};if(zk.ie){zk._ltns={};zk._unltns=[];zk._listen=zk.listen;zk.listen=function(d,f,c){zk._listen(d,f,c);var a=zk._ltns[d];if(!a){zk._ltns[d]=a={}}var b=a[f];if(!b){a[f]=b=[]}b.push(c)};zk._unlisten=zk.unlisten;zk.unlisten=function(d,f,c){zk._unlisten(d,f,c);var a=zk._ltns[d];var b=a?a[f]:null;if(b){b.remove(c);if(!b.length){delete a[f]}}};zk.unlistenAll=function(b){if(b){var a=zk._ltns[b];if(a){zk._unltns.push([b,a]);delete zk._ltns[b];setTimeout(zk._unlistenOne,10000+20000*Math.random())}}else{while(zk._unltns.length){zk._unlistenOne()}for(var b in zk._ltns){var a=zk._ltns[b];if(a){delete zk._ltns[b];zk._unlistenNode(b,a)}}}};zk._unlistenOne=function(){if(zk._unltns.length){var a=zk._unltns.shift();zk._unlistenNode(a[0],a[1])}};zk._unlistenNode=function(d,a){for(var g in a){var c=a[g];delete a[g];for(var b=c.length;--b>=0;){try{zk._unlisten(d,g,c[b]);c[b]=null}catch(f){}}c.length=0}}}else{zk.unlistenAll=zk.voidf}zk.disableESC=function(){if(!zk._noESC){zk._noESC=function(a){if(!a){a=window.event}if(a.keyCode==27){if(a.preventDefault){a.preventDefault();a.stopPropagation()}else{a.returnValue=false;a.cancelBubble=true}return false}return true};zk.listen(document,"keydown",zk._noESC);zk._oldOnErr=window.onerror;zk._onErrChange=true;window.onerror=function(d,b,c){var f=zkau.uri();if(f&&b.indexOf(location.host)>=0){var a=f.lastIndexOf(";");a=a>=0?f.substring(0,a):f;if(b.indexOf(a+"/web/")>=0){d=mesg.FAILED_TO_LOAD+b+"\n"+mesg.FAILED_TO_LOAD_DETAIL+"\n"+mesg.CAUSE+d+" (line "+c+")";if(zk.error){zk.error(d)}else{alert(d)}return true}}}}};zk.disableESC();zk.enableESC=function(){if(zk._noESC){zk.unlisten(document,"keydown",zk._noESC);delete zk._noESC}if(zk._onErrChange){window.onerror=zk._oldOnErr;if(zk._oldOnErr){delete zk._oldOnErr}delete zk._onErrChange}};zk.mods={};function $es(a){return typeof a=="string"?a?document.getElementsByName(a):null:a}function $now(){return new Date().getTime()}function $e(b,a){if(b&&b.id){b=b.id}return typeof b=="string"?b?document.getElementById(b+(a?"!"+a:"")):null:b}function $uuid(b){if(typeof b!="string"){for(;b;b=$parent(b)){if(b.id){b=b.id;break}}}if(!b){return""}var a=b.lastIndexOf("!");return a>0?b.substring(0,a):b}function $id(a){for(;a;a=$parent(a)){if(a.id){return a.id}}return""}function $real(a){var c=$uuid(a);if(c){var b=$e(c+"!real");if(b){return b}b=$e(c);if(b){return b}}return a}function $outer(a){var c=$uuid(a);if(c){var b=$e(c);if(b){return b}}return a}function $type(c){var b=getZKAttr(c,"type");if(b){var a=b.lastIndexOf(".");return a>=0?b.substring(a+1):b}return null}function $childExterior(a){var b=$e(a.id+"!chdextr");return b?b:a}function $parent(b){var a=zk._vpts[b.id];return a?a:b.parentNode}zk.setVParent=function(f){var d=f.id,c=f.parentNode;if(!d){zk.error("id required, "+f);return}if(zk.isVParent(d)){return}var b=f.nextSibling;if(b){var a=document.createElement("SPAN");a.id=d+"!agtx";a.style.display="none";c.insertBefore(a,b)}zk._vpts[d]=c;if(!getZKAttr(f,"dtid")){setZKAttr(f,"dtid",zkau.dtid(f))}document.body.appendChild(f)};zk.isVParent=function(a){return zk._vpts[a&&a.id?a.id:a]};zk.unsetVParent=function(d){var c=d.id,b=zk._vpts[c];delete zk._vpts[c];if(b){var a=$e(c+"!agtx");if(a){b.insertBefore(d,a);zk.remove(a)}else{b.appendChild(d)}}};zk.unsetChildVParent=function(f,b){var c=[];for(var d in zk._vpts){if(zk.isAncestor(f,d)){c.push(d)}}for(var a=c.length;--a>=0;){f=$e(c[a]);if(b){f.style.display="none"}zk.unsetVParent(f)}return c};zk._vpts={};function $parentByType(b,a){for(;b;b=$parent(b)){if($type(b)==a){return b}}return null}function $tag(a){return a&&a.tagName?a.tagName.toUpperCase():""}function $parentByTag(b,a){for(;b;b=$parent(b)){if($tag(b)==a){return b}}return null}function $visible(b,a){return b&&(!b.style||(b.style.display!="none"&&(!a||b.style.visibility!="hidden")))}function getZKAttr(b,a){try{return b&&b.getAttribute?b.getAttribute("z."+a):null}catch(c){return null}}function setZKAttr(b,a,c){if(b&&b.setAttribute){b.setAttribute("z."+a,c)}}function rmZKAttr(b,a){if(b&&b.removeAttribute){b.removeAttribute("z."+a)}else{setZKAttr(b,a,"")}}zk.getBuild=function(a){return zk.mods[a]||zk.build||"0"};zk.addInit=function(a,b,c){if(typeof c=="string"){if(zk._initids[c]){return}zk._initids[c]=true}zk._addfn(zk._initfns,a,b)};zk.addInitLater=function(a,b,c){if(typeof c=="string"){if(zk._inLatids[c]){return}zk._inLatids[c]=true}zk._addfn(zk._inLatfns,a,b)};zk._addfn=function(a,b,c){if(c){a.unshift(b)}else{a.push(b)}};zk.addBeforeInit=zk.addModuleInit=function(a){zk._bfinits.push(a)};zk.addInitCmp=function(a){zk._initcmps.push(a)};zk.addCleanup=function(a,b,c){if(typeof c=="string"){if(zk._cuids[c]){return}zk._cuids[c]=true}zk._addfn(zk._cufns,a,b)};zk.addCleanupLater=function(a,b,c){if(typeof c=="string"){if(zk._cuLatids[c]){return}zk._cuLatids[c]=true}zk._addfn(zk._cuLatfns,a,b)};zk.addBeforeUnload=function(a,b){if(b){zk._bfunld.unshift(a)}else{zk._bfunld.push(a)}};zk.rmBeforeUnload=function(a){zk._bfunld.remove(a)};zk.beforeUnload=function(){for(var a=0,c=zk._bfunld.length;a<c;++a){var b=zk._bfunld[a]();if(b){return b}}};zk.unwatch=function(c){if(typeof c!="string"){c=c.id}for(var a=arguments,b=a.length;--b>0;){switch(a[b]){case"onVisi":zk._visicmps.remove(c);break;case"onHide":zk._hidecmps.remove(c);break;case"onSize":zk._szcmps.remove(c);break;case"beforeSize":zk._bfszcmps.remove(c);break;case"onScroll":zk._scrlcmps.remove(c)}}};zk.watch=function(c){c=$e(c);for(var a=arguments,b=a.length;--b>0;){switch(a[b]){case"onVisi":zk._watch(c,zk._visicmps);break;case"onHide":zk._watch(c,zk._hidecmps);break;case"onSize":zk._watch(c,zk._szcmps);break;case"beforeSize":zk._watch(c,zk._bfszcmps);break;case"onScroll":zk._watch(c,zk._scrlcmps)}}};zk._watch=function(f,a){for(var b=0;b<a.length;++b){var d=a[b];if(zk.isAncestor(d,f)){a.splice(b,0,f.id);return}}a.unshift(f.id)};zk.invoke=function(a,c,b){if(!zk._modules[a]){zk.load(a,c,null,null,b)}else{if(zk.loading){zk.addBeforeInit(c)}else{c()}}};zk.addOnLoad=function(a,b){if(zk._modules[a]){setTimeout(b,0)}else{var c=zk._js4ld[a]=[];c.push(b)}};zk.load=function(a,b,f,d,c){if(!a){zk.error("Module name must be specified");return}if(!zk._modules[a]){zk._modules[a]=true;if(b){zk.addBeforeInit(b)}zk._load(a,d,c,f)}};zk._loadByType=function(a,b){if(!zk._modules[a]){zk._modules[a]=true;zk._load(a,null,zkau.dtid(b))}};zk.loadByType=function(c){var b=getZKAttr(c,"type");if(b){var a=b.lastIndexOf(".");if(a>0){zk._loadByType(b.substring(0,a),c)}return true}return false};zk._load=function(a,g,c,f){zk._bld();var i=document.createElement("script"),h="/web",d=a;i.type="text/javascript";if(f){zk._ckfns.push(f)}else{h+="/_zcbzk.ald-"+zk._jscnt++}if(d.indexOf("://")>0){if(!f&&zk.debugJS){zk.error("zk.load: ckfn required to load "+d)}i.src=d}else{if(d.indexOf("/")>=0){if(d.charAt(0)!="/"){d="/"+d}i.charset="UTF-8";i.src=zk.getUpdateURI(h+d,false,g,c)}else{d=d.replace(/\./g,"/");var b=d.lastIndexOf("!");d=b>=0?d.substring(0,b)+".js."+d.substring(b+1):d+".js";if(d.charAt(0)!="/"){d="/"+d}i.charset="UTF-8";if(!g){g=zk.getBuild(a)}i.src=zk.getUpdateURI(h+"/js"+d,false,g,c)}}document.getElementsByTagName("HEAD")[0].appendChild(i)};zk._bld=function(){if(zk.loading++){zk._updCnt()}else{zk.disableESC();zk._ckload=setInterval(function(){for(var b=0,a=zk._ckfns.length;b<a;++b){if(zk._ckfns[b]()){zk._ckfns.splice(b--,1);--a;zk.ald()}else{return}}},10);setTimeout(function(){if(zk.loading||window.dbg_progressbox){var a=$e("zk_loadprog");if(!a){Boot_progressbox("zk_loadprog",'Loading (<span id="zk_loadcnt">'+zk.loading+"</span>)",0,0,true,true)}}},350)}};zk.ald=function(d){if(zk._jsmap[d]){return}if(--zk.loading){zk._jsmap[d]=true;try{zk._updCnt()}catch(c){zk.error("Failed to count. "+c.message)}}else{zk._jsmap={};zk._jscnt=0;try{zk.enableESC();if(zk._ckload){clearInterval(zk._ckload);delete zk._ckload}for(var a in zk._js4ld){if(zk._modules[a]){var b=zk._js4ld[a];if(b){delete zk._js4ld[a];while(b.length){setTimeout(b.shift(),0)}}}}zk.cleanAllMask("zk_loadprog")}catch(c){zk.error("Failed to stop counting. "+c.message)}if(zk._ready){zk._evalInit()}}};zk.cleanAllMask=function(d){var b=$e(d);if(b){zk.remove(b)}for(var a=zk._ctpgs.length,b=$e(zk._ctpgs[--a]+"!progbox");b;b=$e(zk._ctpgs[--a]+"!progbox")){zk.remove(b)}};zk._updCnt=function(){var a=$e("zk_loadcnt");if(a){a.innerHTML=""+zk.loading}};zk.initAt=function(b){if(!b||b.nodeType!=1){return}var a=[];a.push(b);zk._loadAndInit({stk:a,nosibling:true})};zk.initChildren=function(a){for(a=a.firstChild;a;a=a.nextSibling){zk.initAt(a)}};zk._loadAndInit=function(c){zk._ready=false;for(var b=0;c.stk.length;){if(++b>1000){setTimeout(function(){zk._loadAndInit(c)},10);return}var g=c.stk.pop();if(g.nodeType==1){try{if(!zk.ie){switch($tag(g)){case"INPUT":if(g.type=="checkbox"||g.type=="radio"){if(g.checked!=g.defaultChecked){g.checked=g.defaultChecked}if(zk.opera){zk.setOuterHTML(g,zk.getOuterHTML(g))}break}if(g.type!="text"&&g.type!="password"){break}case"TEXTAREA":if(g.value!=g.defaultValue&&g.defaultValue!="zk_wrong!~-.zk_pha!6"){g.value=g.defaultValue}break;case"OPTION":if(g.selected!=g.defaultSelected){g.selected=g.defaultSelected}}}else{switch($tag(g)){case"A":case"AREA":if(g.href.indexOf("javascript:")>=0){zk.listen(g,"click",zk._ieFixBfUnload)}break;case"FORM":zk.fixSubmit(g)}}}catch(f){}var a=getZKAttr(g,"dtid");if(a){if(zkau.addDesktop(a)&&zk.pfmeter){zkau.pfrecv(a,a)}var d=getZKAttr(g,"au");if(d){zkau.addURI(a,d)}}if(zk.loadByType(g)||getZKAttr(g,"drag")||getZKAttr(g,"drop")||getZKAttr(g,"zid")){zk._initcmps.push(g)}if(getZKAttr(g,"zidsp")=="ctpage"){zk._ctpgs.push(g.id)}}if(c.nosibling){c.nosibling=false}else{if(g.nextSibling&&!getZKAttr(g,"skipsib")){c.stk.push(g.nextSibling)}}if(g.firstChild&&!getZKAttr(g,"skipdsc")){c.stk.push(g.firstChild)}}zk._evalInit();zk._ready=true};if(zk.ie){zk._ieFixBfUnload=function(){zk.skipBfUnload=true;setTimeout(zk._skipBackBF,0)};zk._skipBackBF=function(){zk.skipBfUnload=false}}zk._evalInit=function(){do{while(!zk.loading&&zk._bfinits.length){(zk._bfinits.shift())()}for(var j=0;zk._initcmps.length&&!zk.loading;){var n=zk._initcmps.pop();var m=zk.eval(n,"init");if(m){n=m}if(getZKAttr(n,"zid")){zkau.initzid(n)}if(getZKAttr(n,"drag")){zkau.initdrag(n)}if(getZKAttr(n,"drop")){zkau.initdrop(n)}var type=$type(n);if(type){var o=window["zk"+type];if(o){if(o.onVisi){zk._tvisicmps.push(n.id)}if(o.onHide){zk._thidecmps.push(n.id)}if(o.onSize){zk._tszcmps.push(n.id)}if(o.beforeSize){zk._tbfszcmps.push(n.id)}if(o.onScroll){zk._tscrlcmps.push(n.id)}}}if(zk.loading||++j>1000){if(!zk.loading){setTimeout(zk._evalInit,10)}return}}if(!zk.loading){for(var es=zk._tvisicmps;es.length;){zk._visicmps.unshift(es.pop())}for(var es=zk._thidecmps;es.length;){zk._hidecmps.unshift(es.pop())}for(var es=zk._tscrlcmps;es.length;){zk._scrlcmps.unshift(es.pop())}for(var es=zk._tbfszcmps,j=es.length;--j>=0;){zk._bfszcmps.unshift(es[j])}for(var es=zk._tszcmps,j=es.length;--j>=0;){zk._szcmps.unshift(es[j])}for(var es=zk._tbfszcmps;es.length;){var n=$e(es.pop());if($visible(n)){zk.eval(n,"beforeSize")}}for(var es=zk._tszcmps;es.length;){var n=$e(es.pop());if($visible(n)){zk.eval(n,"onSize")}}}while(!zk.loading&&zk._initfns.length){(zk._initfns.shift())()}if(!zk.loading&&!zk._initfns.length){zk._initids={};setTimeout(zk._initLater,25)}}while(!zk.loading&&(zk._bfinits.length||zk._initcmps.length||zk._initfns.length));zkau.doCmds()};zk._initLater=function(){while(!zk.loading&&zk._inLatfns.length){(zk._inLatfns.shift())()}if(!zk.loading&&!zk._inLatfns.length){zk._inLatids={}}};zk.eval=function(k,g,d){if(!d){d=$type(k)}if(d){var i=window["zk"+d];if(i){var h=i[g];if(h){try{var b=[k];for(var a=arguments.length-2;--a>0;){b[a]=arguments[a+2]}return h.apply(i,b)}catch(c){zk.error("Failed to invoke zk"+d+"."+g+"\n"+c.message);if(zk.debugJS){throw c}}}}}return false};zk.cleanupAt=function(a){zk._cleanupAt(a);zk._afterCleanup()};zk.cleanupChildren=function(a){for(a=a.firstChild;a;a=a.nextSibling){zk._cleanupAt(a)}zk._afterCleanup()};zk._afterCleanup=function(){while(zk._cufns.length){(zk._cufns.shift())()}zk._cuids={};setTimeout(zk._cleanLater,25)};zk._cleanLater=function(){while(zk._cuLatfns.length){(zk._cuLatfns.shift())()}zk._cuLatids={}};zk._cleanupAt=function(n){if(getZKAttr(n,"zid")){zkau.cleanzid(n)}if(getZKAttr(n,"zidsp")){zkau.cleanzidsp(n)}if(getZKAttr(n,"drag")){zkau.cleandrag(n)}if(getZKAttr(n,"drop")){zkau.cleandrop(n)}var type=$type(n);if(type){zk.eval(n,"cleanup",type);zkau.cleanupMeta(n);zk.unlistenAll(n);zk._visicmps.remove(n.id);zk._hidecmps.remove(n.id);zk._szcmps.remove(n.id);zk._bfszcmps.remove(n.id);zk._scrlcmps.remove(n.id)}zk.unAll(n);for(n=n.firstChild;n;n=n.nextSibling){if(n.nodeType==1){zk._cleanupAt(n)}}};zk.onVisiAt=function(n){for(var elms=zk._visicmps,j=elms.length;--j>=0;){var elm=$e(elms[j]);for(var e=elm;e;e=$parent(e)){if(!$visible(e)){break}if(e==n||!n){zk.eval(elm,"onVisi");break}}}};zk.onHideAt=function(n){var f=zkau.currentFocus;if(f&&zk.isAncestor(n,f)){zkau.currentFocus=null;try{f.blur()}catch(e){}}for(var elms=zk._hidecmps,j=elms.length;--j>=0;){var elm=$e(elms[j]);for(var e=elm;e;e=$parent(e)){if(!$visible(e)){break}if(e==n||!n){zk.eval(elm,"onHide");break}}}};zk.onSizeAt=function(n){for(var elms=zk._szcmps,j=elms.length;--j>=0;){var elm=$e(elms[j]);for(var e=elm;e;e=$parent(e)){if(!$visible(e)){break}if(!n||e==n){zk.eval(elm,"onSize");break}}}};zk.beforeSizeAt=function(n){for(var elms=zk._bfszcmps,j=elms.length;--j>=0;){var elm=$e(elms[j]);for(var e=elm;e;e=$parent(e)){if(!$visible(e)){break}if(!n||e==n){zk.eval(elm,"beforeSize");break}}}};zk.onScrollAt=function(n){if(zkau.valid){zkau.valid.onScrollAt(n)}for(var elms=zk._scrlcmps,j=elms.length;--j>=0;){var elm=$e(elms[j]);for(var e=elm;e;e=$parent(e)){if(!$visible(e)){break}if(!n||e==n){zk.eval(elm,"onScroll");break}}}};zk.loadCSS=function(b,a){if(b.indexOf("://")<0){if(b.charAt(0)!="/"){b="/"+b}b=zk.getUpdateURI("/web"+b,false,null,a)}zk.loadCSSDirect(b)};zk.loadCSSDirect=function(a,c){var b=document.createElement("LINK");if(c){b.id=c}b.rel="stylesheet";b.type="text/css";b.href=a;document.getElementsByTagName("HEAD")[0].appendChild(b)};zk.loadJS=function(c,b,a){var d=document.createElement("script");d.type="text/javascript";d.charset="UTF-8";if(b){d.onload=d.onreadystatechange=function(){if(!d.readyState||d.readyState=="loaded"){b()}}}if(c.indexOf("://")<0){if(c.charAt(0)!="/"){c="/"+c}c=zk.getUpdateURI("/web"+c,false,null,a)}d.src=c;document.getElementsByTagName("HEAD")[0].appendChild(d)};zk._getUpdateURI=function(a,b,m,c,d){if(!b){return a}if(b.charAt(0)!="/"){b="/"+b}if(c&&b.length>=5&&b.substring(0,5)=="/web/"){b="/web/_zv"+c+b.substring(4)}var h=a.lastIndexOf(";"),g=a.lastIndexOf("?");if(h<0&&g<0){return a+b}if(g>=0&&(h<0||g<h)){h=g}var i=a.substring(0,h);if(m){return i+b}var n=a.substring(h);var f=b.indexOf("?");return f>=0?g>=0?i+b.substring(0,f)+n+"&"+b.substring(f+1):i+b.substring(0,f)+n+b.substring(f):i+b+n};zk.getUpdateURI=function(f,c,d,b){var g=zkau.uri(b);var a=new RegExp("&p_p_resource_id=([^&$]+)");if(!a.test(g)){return zk._getUpdateURI(g,f,c,d,b)}return g.replace(/&p_p_resource_id=([^&$]+)/,"&p_p_resource_id="+escape(zk._getUpdateURI(RegExp.$1,f,c,d,b)))};zk.progress=function(a){zk.progressing=true;if(a>0){setTimeout(zk._progress,a)}else{zk._progress()}};zk.progressDone=function(){zk.progressing=zk.progressPrompted=false;zk.cleanAllMask("zk_prog");if(zk.dbModal){zk.restoreDisabled()}};zk._progress=function(){if(zk.progressing&&!zk.loading){var c=$e("zk_showBusy");if(c){return}c=$e("zk_prog");if(!c){var b;try{b=mesg.PLEASE_WAIT}catch(a){b="Processing..."}if(zk.dbModal&&!zk.booted){zk.disableAll()}AU_progressbar("zk_prog",b,!zk.booted);zk.progressPrompted=true}}};zk.https=function(){var a=location.protocol;return a&&"https:"==a.toLowerCase()};zk.innerX=function(){return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0};zk.innerY=function(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0};zk.innerWidth=function(){return typeof window.innerWidth=="number"?window.innerWidth:document.compatMode=="CSS1Compat"?document.documentElement.clientWidth:document.body.clientWidth};zk.innerHeight=function(){return typeof window.innerHeight=="number"?window.innerHeight:document.compatMode=="CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight};zk.pageWidth=function(){var d=document.body.scrollWidth,c=document.body.offsetWidth;return d>c?d:c};zk.pageHeight=function(){var d=document.body.scrollHeight,c=document.body.offsetHeight;return d>c?d:c};zk._setOuterHTML=function(d,b){if(d.outerHTML){d.outerHTML=b}else{var a=document.createRange();a.setStartBefore(d);var c=a.createContextualFragment(b);d.parentNode.replaceChild(c,d)}};zk.pause=function(a){if(a){var b=$now(),c;do{c=$now()}while(c-b<a)}};zk.encodeXML=function(b,a){var f="";if(b){for(var d=0,c=b.length;d<c;++d){var g=b.charAt(d);switch(g){case"<":f+="&lt;";break;case">":f+="&gt;";break;case"&":f+="&amp;";break;case'"':f+="&quot;";break;case"\n":if(a){f+="<br/>";break}default:f+=g}}}return f};zk.message=function(){var f="",c=arguments;if(c.length>1){for(var d=0,b=c.length;d<b;d++){f+="["+c[d]+"] "}}else{f=arguments[0]}zk._msg=zk._msg?zk._msg+f:f;zk._msg+="\n";setTimeout(zk._domsg,600)};zk._domsg=function(){if(zk._msg){var a=$e("zk_msg");if(!a){a=document.createElement("DIV");document.body.appendChild(a);var b='<div id="zk_debugbox" class="z-debugbox" style="visibility:hidden"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="20pt"><button onclick="zk._msgclose(this)">close</button><br/><button onclick="$e(\'zk_msg\').value = \'\'">clear</button></td><td><textarea id="zk_msg" style="width:99%" rows="10"></textarea></td></tr></table></div>';zk._setOuterHTML(a,b);a=$e("zk_msg");var c=$e("zk_debugbox");c.style.top=zk.innerY()+zk.innerHeight()-c.offsetHeight-20+"px";c.style.left=zk.innerX()+zk.innerWidth()-c.offsetWidth-20+"px";zk.cleanVisibility(c)}a.value=a.value+zk._msg+"\n";a.scrollTop=a.scrollHeight;zk._msg=null}};zk._msgclose=function(a){while((a=a.parentNode)!=null){if($tag(a)=="DIV"){a.parentNode.removeChild(a);return}}};zk.debug=zk.message;zk.error=function(d){if(!zk.booted){setTimeout(function(){zk.error(d)},100);return}if(!zk._errcnt){zk._errcnt=1}var f="zk_err_"+zk._errcnt++;var b=document.createElement("DIV");document.body.appendChild(b);var a='<div style="position:absolute;z-index:99000;padding:3px;left:'+(zk.innerX()+50)+"px;top:"+(zk.innerY()+20)+'px;width:550px;border:1px solid #963;background-color:#fc9" id="'+f+'"><table cellpadding="2" cellspacing="2" width="100%"><tr valign="top"><td width="20pt"><button onclick="zkau.sendRedraw()">redraw</button><button onclick="zk._msgclose(this)">close</button></td><td style="border:1px inset">'+zk.encodeXML(d,true)+"</td></tr></table></div>";zk._setOuterHTML(b,a);b=$e(f);try{new zDraggable(b,{handle:b,zindex:b.style.zIndex,starteffect:zk.voidf,starteffect:zk.voidf,endeffect:zk.voidf})}catch(c){}};zk.errorDismiss=function(){for(var a=zk._errcnt;a;--a){zk.remove($e("zk_err_"+a))}};zk.loading=0;zk._modules={};zk._initfns=[];zk._initids={};zk._inLatfns=[];zk._inLatids={};zk._bfinits=[];zk._cufns=[];zk._cuids={};zk._cuLatfns=[];zk._cuLatids={};zk._bfunld=[];zk._initcmps=[];zk._ckfns=[];zk._visicmps=[];zk._hidecmps=[];zk._szcmps=[];zk._bfszcmps=[];zk._scrlcmps=[];zk._tszcmps=[],zk._tbfszcmps=[],zk._tscrlcmps=[],zk._tvisicmps=[],zk._thidecmps=[];function myload(){var a=zk._onload;if(a){zk._onload=null;a()}}zk.bootDone=function(){if(zk.pfmeter){for(var b=zkau._dtids,a=b.length;--a>=0;){zkau.pfdone(b[a],b[a])}}zk.progressDone();zk.booting=false;zk.booted=true;zkau.onURLChange()};zk._onload=function(){zk.progress(600);zk.addInitLater(zk.bootDone);zk.initAt(document.body)};if(zk.ie&&!zk.https()){document.write('<script id="_zie_load" defer src="javascript:void(0)"><\/script>');var e=$e("_zie_load");e.onreadystatechange=function(){if("complete"==this.readyState){myload()}};e.onreadystatechange()}else{if(zk.safari){var timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(timer);delete timer;myload()}},10)}else{if(zk.gecko){zk.listen(document,"DOMContentLoaded",myload)}zk._oldOnload=window.onload;window.onload=function(){myload();if(zk._oldOnload){zk._oldOnload.apply(window,arguments)}}}}};