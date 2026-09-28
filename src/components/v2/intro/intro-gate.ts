/**
 * Archive intro: the PRE-PAINT GATE (homepage only).
 *
 * WHAT: a tiny classic script rendered inline at the very top of the homepage
 * markup (see IntroGate.tsx). It runs while the HTML is being parsed, before
 * hydration, and decides whether the intro plays on this load. If it plays,
 * it injects one <style> into <head> that paints a full-screen cover in the
 * canvas colour (via body::after), so the page never flashes before the
 * intro overlay mounts.
 *
 * WHY A <style> AND NOT A CLASS ON <html>: a class on <html> is an attribute
 * React hydrates against. An injected <style> in <head> is a third-party node
 * React 19 skips during hydration, so there is nothing to mismatch. Removing
 * the element uncovers the page.
 *
 * CONTRACT (same as the terminal-intro engine, own names):
 *   ?t=<ms>    freeze on one frame (allowed under reduced motion: it is a still)
 *   ?intro=1   force        ?intro=0   skip        reduced motion = no intro
 *   otherwise once per browser session (sessionStorage); if storage throws, it plays.
 *   FAILSAFE: if the engine has not taken over within 2.5 s, the cover is
 *   removed and the intro is cancelled for this load (never a late pop-in).
 * JS off: nothing here runs and the page is exactly the page.
 *
 * The cover rule resets every property a host could already set on
 * body::after (engine 1.0.1 rule), all !important.
 */
export const INTRO_SESSION_KEY = "ee-archive-intro-seen";
export const INTRO_COVER_ID = "ee-intro-cover";
export const INTRO_BG = "#050605"; // --ee-canvas
export const INTRO_FAILSAFE_MS = 2500;

const COVER_CSS =
  "body::after{content:\"\"!important;display:block!important;position:fixed!important;top:0!important;right:0!important;bottom:0!important;left:0!important;width:auto!important;height:auto!important;margin:0!important;padding:0!important;border:0!important;background:" +
  INTRO_BG +
  "!important;opacity:1!important;visibility:visible!important;filter:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;mix-blend-mode:normal!important;transform:none!important;clip-path:none!important;-webkit-mask:none!important;mask:none!important;animation:none!important;transition:none!important;pointer-events:auto!important;z-index:2147483000!important}";

/** The inline script body. Classic script, ES5, no dependencies. */
export const GATE_SCRIPT = `(function(){
var KEY=${JSON.stringify(INTRO_SESSION_KEY)},ID=${JSON.stringify(INTRO_COVER_ID)},FAILSAFE=${INTRO_FAILSAFE_MS};
var d={play:false,freeze:-1,force:false,key:KEY,expired:false,consumed:false,path:location.pathname,sr:null};
try{
  var q=new URLSearchParams(location.search),tp=q.get('t'),ip=q.get('intro');
  var rm=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if(tp!==null&&tp!==''&&isFinite(+tp)){d.play=true;d.force=true;d.freeze=Math.max(0,+tp);}
  else if(ip==='0'||rm){d.play=false;}
  else if(ip==='1'){d.play=true;d.force=true;}
  else{var seen=null;try{seen=window.sessionStorage.getItem(KEY);}catch(e){seen=null;}d.play=(seen!=='1');}
}catch(e){d.play=false;}
window.__eeIntro=d;
if(d.play){
  try{if('scrollRestoration' in history){d.sr=history.scrollRestoration;history.scrollRestoration='manual';}}catch(e){}
  try{var s=document.createElement('style');s.id=ID;s.textContent=${JSON.stringify(COVER_CSS)};(document.head||document.documentElement).appendChild(s);}catch(e){}
  setTimeout(function(){
    if(!window.__eeIntroLive){d.expired=true;var x=document.getElementById(ID);if(x&&x.parentNode)x.parentNode.removeChild(x);}
  },FAILSAFE);
}
})();`;
