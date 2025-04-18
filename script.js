/*************************************************************************
 * TIMINGS (ms)                                                          *
 *************************************************************************/
const START_DELAY       = 5000;   // crisp text before zoom
const ZOOM_DURATION     = 3000;  // matches CSS animation
const VIDEO_FADE_BUFFER = 500;   // small gap before video fades in
const COUNTDOWN_DELAY   = 5000;  // after video starts
const TARGET_UTC        = Date.UTC(2025, 5, 1, 18, 0, 0); // 1 Jun 25 11 AM PDT

/*************************************************************************
 * COUNTDOWN                                                             *
 *************************************************************************/
const countdown = document.getElementById("countdown");
function tick(){
  let diff = TARGET_UTC - Date.now();
  if(diff < 0) diff = 0;
  const d = Math.floor(diff/8.64e7),
        h = Math.floor(diff/3.6e6)%24,
        m = Math.floor(diff/6e4)%60,
        s = Math.floor(diff/1e3)%60;
  countdown.innerHTML =
    `${d.toString().padStart(2,"0")}d&nbsp;`+
    `${h.toString().padStart(2,"0")}h&nbsp;`+
    `${m.toString().padStart(2,"0")}m&nbsp;`+
    `${s.toString().padStart(2,"0")}s`;
}
tick(); setInterval(tick,1000);

/*************************************************************************
 * SEQUENCE CONTROL                                                      *
 *************************************************************************/
const splash = document.getElementById("splashText");
const video  = document.getElementById("landingVideo");

/* 1️⃣ Kick off zoom animation */
setTimeout(()=> splash.classList.add("zoom"), START_DELAY);

/* 2️⃣ After zoom + small buffer, fade splash out & show video */
setTimeout(()=>{
  video.classList.add("visible");
  video.play();

  /* 3️⃣ Countdown appears over video */
  setTimeout(()=>countdown.classList.add("visible"), COUNTDOWN_DELAY);

}, START_DELAY + ZOOM_DURATION + VIDEO_FADE_BUFFER);
