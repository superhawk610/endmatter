window.storyFormat({version:"0.0.1",proofing:!1,name:"Endmatter",author:"Aaron Ross <superhawk610@gmail.com>",description:"Simple JSON export supporting YAML meta in endmatter.",source:'<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"><\/script><script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"><\/script><title>{{STORY_NAME}}</title><style type="text/css">*{box-sizing:border-box}body,html,p{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;margin:0;padding:0}body{background:#222;color:#fff}.app{grid-gap:1rem;display:grid;grid-template-columns:250px auto;height:100vh;width:100vw}button{background:#00a1ff;border:none;border-radius:4px;cursor:pointer;font-weight:700;padding:8px 10px}button:hover{background:#0087d6}button.red{background:red;color:#fff}button.gray{background:#333;color:#eee}.sidebar{align-items:stretch;background:#111;display:flex;flex-direction:column;gap:.5rem;justify-content:flex-start;padding:1rem}.sidebar .header{color:#444;font-size:1.1rem;margin-top:1rem;text-align:center;width:100%}.sidebar .story-title{color:#888;margin:-.25rem 0 1rem;text-align:center;width:100%}.container{align-items:stretch;display:flex;justify-content:center;overflow-y:auto}.container .document,.container .story{background:#333;border-radius:4px;color:#eee;overflow-x:auto;padding:1rem}.container .document{font-family:Dank Mono,Fira Code,Consolas,monospace;max-width:1000px;width:100%}.container .story{margin-top:2rem;min-height:200px;width:500px}</style></head><body><div id="root"></div><div id="storyData" style="display: none">{{STORY_DATA}}</div><script defer="defer">(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=React;var n=e.n(t);const r=ReactDOM;var a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},l=(0,t.createContext)({});function i(){return(0,t.useContext)(l)}function o(e){var r=e.children,o=i(),s=o.hash,c=null,u=null;return t.Children.forEach(r,(function(e){if(!u&&(0,t.isValidElement)(e)){var n=e.props.match;if(!n||"string"==typeof n&&s===n)u=e;else if("string"!=typeof n){var r=s.match(n);r&&(c=r.slice(1),u=e)}}})),n().createElement(l.Provider,{value:a(a({},o),{matches:c})},u)}function s(e){var t=e.children;return n().createElement(n().Fragment,null,t)}function c(e){var n=e.to,r=i().navigateTo;return(0,t.useEffect)((function(){r(n)})),null}var u=(0,t.createContext)({});function m(){return(0,t.useContext)(u)}function d(e){var t=e.children;return n().createElement("div",{className:"container"},n().createElement("div",{style:{height:"100%"}},n().createElement("div",{style:{paddingBottom:"1px"}},t)))}function p(){var e=(0,t.useState)(null),r=e[0],a=e[1],l=(0,t.useState)(!1),o=l[0],s=l[1],u=m().story,p=i(),f=p.matches,v=p.navigateTo,g=f[0]?parseInt(f[0]):-1;if(Number.isNaN(g)&&(console.warn(\'attempted to navigate to invalid passage "\'+f[0]+\'"\'),g=-1),(0,t.useEffect)((function(){if(u){for(var e=-1===g?u.startNode:g,t=0,n=u.passages;t<n.length;t++){var r=n[t];if(r.pid===e)return void a(r)}s(!0)}}),[u,g]),!r)return n().createElement(d,null,o?"Uh-oh! Couldn\'t find that passage.":"Flipping pages...");if(-1===g)return n().createElement(c,{to:"story/"+r.pid});var h=window.location.href.match(/test/);return n().createElement(d,null,n().createElement("pre",{className:"story"},r.text),n().createElement("div",null,r.links.map((function(e,t){return n().createElement("button",{key:e.pid||t,title:e.link+(e.broken?" (broken)":""),"aria-label":"link named "+e.name+" pointing to "+e.link+(e.broken?" that is broken":""),style:{marginRight:"0.5rem"},className:e.broken?"red":"",onClick:function(){return(t=e.pid)&&v("story/"+t);var t}},e.name," ",e.broken&&" (broken)")}))),g!==u.startNode&&n().createElement("div",{style:{marginTop:"1rem"}},n().createElement("button",{className:"gray",style:{marginRight:"0.5rem"},onClick:function(){return window.history.back()}},"Go Back"),n().createElement("button",{className:"gray",style:{marginRight:"0.5rem"},onClick:function(){return v("story/"+u.startNode)}},"Start Over")),h&&n().createElement("div",{style:{marginTop:"1rem"}},n().createElement("pre",{className:"document"},n().createElement("span",{style:{opacity:.7}},"/* passage meta */"),"\\n\\n",JSON.stringify(r.meta,null,2)||"none")))}function f(e,t,n){void 0===n&&(n="text/plain");var r=document.createElement("a");r.setAttribute("href","data:"+n+";charset=utf-8,"+encodeURIComponent(t)),r.setAttribute("download",e),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)}function v(){var e=m(),t=e.twine,r=e.story,a=i().navigateTo;return n().createElement("div",{className:"sidebar"},n().createElement("p",{className:"header"},"endmatter ···"),n().createElement("p",{className:"story-title"},n().createElement("span",{style:{opacity:.7}},"viewing")," ",(null==r?void 0:r.name)||n().createElement("em",null,"untitled")),null,n().createElement("button",{onClick:function(){return f((r.name||"story")+".json",JSON.stringify(r,null,2),"application/json")}},"Download JSON"),n().createElement("button",{onClick:function(){return f((r.name||"story")+".html",t.outerHTML,"text/html")}},"Download Twine"),n().createElement("p",{style:{fontSize:"0.8rem",opacity:.5,textAlign:"center"}},"JSON is used by the game engine, while Twine is used to import into the story editor (you might need both)."),n().createElement("div",{style:{height:"1rem"}}),n().createElement("button",{className:"gray",onClick:function(){return a("story")}},"Play Story"),n().createElement("button",{className:"gray",onClick:function(){return a("json")}},"View JSON"))}function g(){var e=m().story;return n().createElement(d,null,n().createElement("pre",{className:"document"},e?JSON.stringify(e,null,2):"Flipping pages..."))}var h=document.getElementById("root");(0,r.render)(n().createElement(n().StrictMode,null,n().createElement((function(e){var r=e.children,a=(0,t.useRef)(""),i=(0,t.useState)((function(){var e=window.location.hash.slice(1),t=e.indexOf("#");return t>-1?(a.current=e.slice(0,t),e.slice(t+1)):(a.current=e,"")})),o=i[0],s=i[1];return(0,t.useEffect)((function(){var e=function(e){var t=e.target.location.hash.slice(1),n=t.indexOf("#");s(n>-1?t.slice(n+1):"")};return window.addEventListener("popstate",e),function(){return window.removeEventListener("popstate",e)}}),[]),n().createElement(l.Provider,{value:{hash:o,matches:null,navigateTo:function(e){s(e),window.history.pushState(null,document.title,"#"+a.current+"#"+e)}}},r)}),null,n().createElement((function(e){var r=e.children,a=(0,t.useState)(null),l=a[0],i=a[1],o=(0,t.useState)(null),s=o[0],c=o[1];return(0,t.useEffect)((function(){var e=document.getElementsByTagName("tw-storydata")[0];if(e){i(e);for(var t={name:e.getAttribute("name"),startNode:parseInt(e.getAttribute("startnode")),passages:[]},n=e.getElementsByTagName("tw-passagedata"),r=function(e){var n=e.innerHTML,r=[],a=void 0,l=(n=n.replace(/\\[\\[(.+?)\\]\\]/g,(function(e,t){if(t.includes("-&gt;")){var n=t.split("-&gt;"),a=n[0],l=n[1];r.push({name:a,link:l})}else r.push({name:t,link:t});return""}))).search(/\\n---\\n/);if(l>-1){var i=n.substr(l+5);n=n.substr(0,l),a={};for(var o=0,s=i.split(/\\n/g);o<s.length;o++){var c=s[o].split(":"),u=c[0],m=c[1];a[u.trim()]=m.trim()}}t.passages.push({pid:parseInt(e.getAttribute("pid")),name:e.getAttribute("name"),text:n.trim(),links:r,meta:a})},a=0,l=Array.prototype.slice.call(n);a<l.length;a++)r(l[a]);for(var o={},s=0,u=t.passages;s<u.length;s++)o[(p=u[s]).name]=p.pid;for(var m=0,d=t.passages;m<d.length;m++)for(var p,f=0,v=(p=d[m]).links;f<v.length;f++){var g=v[f];o[g.link]?g.pid=o[g.link]:g.broken=!0}c(t)}else console.log("unable to find <tw-storydata>")}),[]),n().createElement(u.Provider,{value:{twine:l,story:s}},r)}),null,n().createElement((function(){return n().createElement("div",{className:"app"},n().createElement(v,null),n().createElement(o,null,n().createElement(s,{match:/story\\/?(.*)/},n().createElement(p,null)),n().createElement(s,{match:"json"},n().createElement(g,null)),n().createElement(s,null,n().createElement(c,{to:"story"}))))}),null)))),h)})();<\/script></body></html>'});