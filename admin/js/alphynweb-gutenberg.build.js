(()=>{var t={991:()=>{wp.domReady((function(){(0,wp.data.dispatch("core/edit-post").removeEditorPanel)("taxonomy-panel-category")}))},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",r="second",i="minute",a="hour",s="day",o="week",u="month",c="quarter",l="year",f="date",d="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},v=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},p={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+v(r,2,"0")+":"+v(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),a=n-i<0,s=e.clone().add(r+(a?-1:1),u);return+(-(r+(n-i)/(a?i-s:s-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:l,w:o,d:s,D:f,h:a,m:i,s:r,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=$;var D=function(t){return t instanceof _},M=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)g[t]&&(r=t),e&&(g[t]=e,r=t);else{var i=t.name;g[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},w=function(t,e){if(D(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},S=p;S.l=M,S.i=D,S.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function $(t){this.$L=M(t.locale,null,!0),this.parse(t)}var v=$.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return S},v.isValid=function(){return!(this.$d.toString()===d)},v.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return w(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<w(t)},v.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!S.u(e)||e,d=S.p(t),h=function(t,e){var r=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?r:r.endOf(s)},m=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},$=this.$W,v=this.$M,p=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case l:return c?h(1,0):h(31,11);case u:return c?h(1,v):h(0,v+1);case o:var g=this.$locale().weekStart||0,D=($<g?$+7:$)-g;return h(c?p-D:p+(6-D),v);case s:case f:return m(y+"Hours",0);case a:return m(y+"Minutes",1);case i:return m(y+"Seconds",2);case r:return m(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,c=S.p(t),d="set"+(this.$u?"UTC":""),h=(o={},o[s]=d+"Date",o[f]=d+"Date",o[u]=d+"Month",o[l]=d+"FullYear",o[a]=d+"Hours",o[i]=d+"Minutes",o[r]=d+"Seconds",o[n]=d+"Milliseconds",o)[c],m=c===s?this.$D+(e-this.$W):e;if(c===u||c===l){var $=this.clone().set(f,1);$.$d[h](m),$.init(),this.$d=$.set(f,Math.min(this.$D,$.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[S.p(t)]()},v.add=function(n,c){var f,d=this;n=Number(n);var h=S.p(c),m=function(t){var e=w(d);return S.w(e.date(e.date()+Math.round(t*n)),d)};if(h===u)return this.set(u,this.$M+n);if(h===l)return this.set(l,this.$y+n);if(h===s)return m(1);if(h===o)return m(7);var $=(f={},f[i]=t,f[a]=e,f[r]=1e3,f)[h]||1,v=this.$d.getTime()+n*$;return S.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=S.z(this),a=this.$H,s=this.$m,o=this.$M,u=n.weekdays,c=n.months,l=function(t,n,i,a){return t&&(t[n]||t(e,r))||i[n].substr(0,a)},f=function(t){return S.s(a%12||12,t,"0")},h=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:S.s(o+1,2,"0"),MMM:l(n.monthsShort,o,c,3),MMMM:l(c,o),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:l(n.weekdaysMin,this.$W,u,2),ddd:l(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(a),HH:S.s(a,2,"0"),h:f(1),hh:f(2),a:h(a,s,!0),A:h(a,s,!1),m:String(s),mm:S.s(s,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:i};return r.replace(m,(function(t,e){return e||$[t]||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,f,d){var h,m=S.p(f),$=w(n),v=($.utcOffset()-this.utcOffset())*t,p=this-$,y=S.m(this,$);return y=(h={},h[l]=y/12,h[u]=y,h[c]=y/3,h[o]=(p-v)/6048e5,h[s]=(p-v)/864e5,h[a]=p/e,h[i]=p/t,h[r]=p/1e3,h)[m]||p,d?y:S.a(y)},v.daysInMonth=function(){return this.endOf(u).$D},v.$locale=function(){return g[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},v.clone=function(){return S.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},$}(),b=_.prototype;return w.prototype=b,[["$ms",n],["$s",r],["$m",i],["$H",a],["$W",s],["$M",u],["$y",l],["$D",f]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=M,w.isDayjs=D,w.unix=function(t){return w(1e3*t)},w.en=g[y],w.Ls=g,w.p={},w}()}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var a=e[r]={exports:{}};return t[r].call(a.exports,a,a.exports,n),a.exports}(()=>{"use strict";n(991);var t=n(484);function e(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,a=[],s=!0,o=!1;try{for(n=n.call(t);!(s=(r=n.next()).done)&&(a.push(r.value),!e||a.length!==e);s=!0);}catch(t){o=!0,i=t}finally{try{s||null==n.return||n.return()}finally{if(o)throw i}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var i=wp.i18n.__,a=wp.element.Fragment,s=wp.compose.compose,o=wp.data,u=o.withSelect,c=o.withDispatch,l=wp.editPost.PluginDocumentSettingPanel,f=wp.components,d=f.Button,h=f.DateTimePicker,m=f.Popover,$=f.PanelRow,v=wp.element.useState;const p=s([u((function(t){return{postMeta:t("core/editor").getEditedPostAttribute("meta"),postType:t("core/editor").getCurrentPostType()}})),c((function(t){return{setPostMeta:function(e){console.log("Dispatching: newMeta = ",e),t("core/editor").editPost({meta:e})}}}))])((function(n){var r=n.postType,s=n.postMeta,o=n.setPostMeta;if("aw-calendar-events"!==r)return null;var u=e(v(new Date),2),c=u[0],f=u[1],p=e(v(!1),2),y=p[0],g=p[1],D=e(v(!1),2),M=D[0],w=D[1],S=function(t){switch(t){case"start":g((function(t){return!t}));break;case"end":w((function(t){return!t}))}},_=y?"Done":"Set start time and date of event",b=M?"Done":"Set end time and date of event",E=s._event_start_date?s._event_start_date:c,O=s._event_end_date?s._event_end_date:c,R=function(t,e){var n,r,i;f(e),o((i=e,(r=t)in(n={})?Object.defineProperty(n,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[r]=i,n))};return React.createElement(a,null,React.createElement(l,{title:i("Event start date and time","alphynweb-calendar-events"),icon:"edit",initialOpen:"true"},React.createElement($,null,React.createElement(d,{variant:"secondary",onClick:S("start")},_)),React.createElement($,null,React.createElement(TextControl,{label:"Date",value:t(E).format("DD/MM/YYYY")})),React.createElement($,null,React.createElement(TextControl,{label:"Time",value:t(E).format("h:mm a")})),y&&React.createElement(m,null,React.createElement(h,{currentDate:E,label:"Date of event",is12Hour:!0,onChange:function(t){return R("_event_start_date",t)}}))),React.createElement(l,{title:i("Event end date and time","alphynweb-calendar-events"),icon:"edit",initialOpen:"true"},React.createElement($,null,React.createElement(d,{variant:"secondary",onClick:S("end")},b)),React.createElement($,null,React.createElement(TextControl,{label:"Date",value:t(O).format("DD/MM/YYYY")})),React.createElement($,null,React.createElement(TextControl,{label:"Time",value:t(O).format("h:mm a")})),M&&React.createElement(m,null,React.createElement(h,{currentDate:O,label:"Date of event",is12Hour:!0,onChange:function(t){return R("_event_end_date",t)}}))))}));(0,wp.plugins.registerPlugin)("alphynweb-custom-post-meta-fields-plugin",{render:function(){return React.createElement("div",null,React.createElement(p,null))}})})()})();