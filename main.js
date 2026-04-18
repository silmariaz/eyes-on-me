// Stars — subtle, slow-twinkling
function initStars(id) {
  var canvas = document.getElementById(id);
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var stars = [];
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    var n = Math.floor((canvas.width * canvas.height) / 7000);
    for (var i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 0.8 + 0.15,
        a: Math.random() * 0.6 + 0.15,
        spd: Math.random() * 0.0004 + 0.0001,
        ph: Math.random() * Math.PI * 2
      });
    }
  }
  var frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = s.a * (0.6 + 0.4 * Math.sin(frame * s.spd * 60 + s.ph));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,205,216,' + alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
}

// Scroll reveal
function initReveal() {
  // Double RAF so browser paints opacity:0 before transitions start
  requestAnimationFrame(function(){ requestAnimationFrame(function(){

    // Fade-in and stagger elements
    var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      var el = e.target;
      var delay = el.classList.contains('stagger') ? 100 : 50;
      setTimeout(function(){
        el.classList.add('visible');
      }, delay);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in, .stagger').forEach(function(el) { obs.observe(el); });

    // Each char-card accent line triggers individually when card enters viewport
    var cardObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('line-visible'); cardObs.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.char-card').forEach(function(el) { cardObs.observe(el); });

    // Section break lines — top then dot then bottom, fast
    var lineObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var top = e.target;
          top.classList.add('visible');
          var dot = top.nextElementSibling;
          if (dot) { dot.classList.add('visible'); var bot = dot.nextElementSibling; if(bot) bot.classList.add('visible'); }
          lineObs.unobserve(top);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.section-break-line.top').forEach(function(el) { lineObs.observe(el); });

  }); });
}

// Nav
function initNav() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
}

// Music player
function initPlayer(src, name) {
  var player = document.getElementById('music-player');
  if (!player) return;
  if (!src) { player.style.display = 'none'; return; }
  var audio = null, playing = false, collapsed = false;
  var trackEl  = player.querySelector('.player-track');
  var playBtn  = player.querySelector('.player-play');
  var progFill = player.querySelector('.player-progress-fill');
  var progBar  = player.querySelector('.player-progress');
  var timeEl   = player.querySelector('.player-time');
  var colBtn   = player.querySelector('.player-collapse');
  var body     = player.querySelector('.player-body');
  if (trackEl) trackEl.textContent = name || '— no track assigned —';
  function fmt(s) {
    if (isNaN(s) || !isFinite(s)) return '0:00';
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }
  function togglePlay() {
    if (!src) return;
    if (!audio) {
      audio = new Audio(src);
      audio.addEventListener('timeupdate', function() {
        var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        if (progFill) progFill.style.width = pct + '%';
        if (timeEl) timeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
      });
      audio.addEventListener('ended', function() {
        playing = false;
        if (playBtn) { playBtn.innerHTML = '&#9654;'; playBtn.classList.remove('on'); }
      });
    }
    if (playing) {
      audio.pause();
      if (playBtn) { playBtn.innerHTML = '&#9654;'; playBtn.classList.remove('on'); }
    } else {
      audio.play();
      if (playBtn) { playBtn.innerHTML = '&#10074;&#10074;'; playBtn.classList.add('on'); }
    }
    playing = !playing;
  }
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (progBar) {
    progBar.addEventListener('click', function(e) {
      if (!audio || !audio.duration) return;
      var rect = progBar.getBoundingClientRect();
      audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });
  }
  if (colBtn) {
    colBtn.addEventListener('click', function() {
      collapsed = !collapsed;
      player.classList.toggle('collapsed', collapsed);
      if (body) body.style.display = collapsed ? 'none' : '';
      colBtn.innerHTML = collapsed ? '&#43;' : '&#8722;';
      var hdr = player.querySelector('.player-header');
      if (hdr) hdr.style.marginBottom = collapsed ? '0' : '';
    });
  }
}

// Reading progress + back-to-top
function initChapterScroll() {
  var fill = document.getElementById('rpf');
  var btt  = document.getElementById('btt');
  if (!fill && !btt) return;
  window.addEventListener('scroll', function() {
    var d = document.documentElement;
    var pct = d.scrollTop / (d.scrollHeight - d.clientHeight);
    if (fill) fill.style.width = (pct * 100) + '%';
    if (btt)  btt.classList.toggle('vis', d.scrollTop > 500);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initStars('stars');
  initNav();
  initChapterScroll();
  if (typeof TRACK_SRC !== 'undefined') initPlayer(TRACK_SRC, TRACK_NAME);
  // On index page with intro, delay initReveal until intro finishes
  if (document.getElementById('intro')) {
    setTimeout(initReveal, 3800);
  } else {
    initReveal();
  }
});
