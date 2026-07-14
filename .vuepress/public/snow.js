// snow.js - 樱花飘落 + 星屑闪烁

(function () {
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '9997';
  canvas.style.pointerEvents = 'none';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function isDark() {
    return document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark');
  }

  var darkMode = isDark();

  var observer = new MutationObserver(function () {
    darkMode = isDark();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  var lightColors = ['#ffb7c5', '#ffccd5', '#ffe0e9', '#ff9eb5', '#ffc0cb'];
  var darkColors = ['#f48fb1', '#ec407a', '#f8bbd0', '#e91e63', '#fce4ec'];

  var MAX_PETALS = 50;
  var MAX_SPARKLES = 6;
  var petals = [];
  var sparkles = [];

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function createPetal(initial) {
    if (petals.length >= MAX_PETALS) return;
    var size = rand(6, 14);
    petals.push({
      x: rand(0, canvas.width),
      y: initial ? rand(0, canvas.height) : rand(-40, -10),
      size: size,
      speedY: rand(0.4, 1.4),
      speedX: rand(-0.3, 0.3),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.025, 0.025),
      sway: rand(0.5, 2),
      swayPhase: rand(0, Math.PI * 2),
      colorIdx: Math.floor(Math.random() * 5),
      opacity: rand(0.5, 0.95),
      time: rand(0, 100),
    });
  }

  function createSparkle() {
    if (sparkles.length >= MAX_SPARKLES) return;
    sparkles.push({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height * 0.7),
      size: rand(3, 7),
      life: 0,
      maxLife: rand(40, 80),
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity;

    var colors = darkMode ? darkColors : lightColors;
    var color = colors[p.colorIdx];

    if (darkMode) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
    }

    var grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
    grad.addColorStop(0, color);
    grad.addColorStop(0.6, color);
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;

    var s = p.size;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.55, -s * 0.3, s * 0.4, s * 0.45, 0, s * 0.7);
    ctx.bezierCurveTo(-s * 0.4, s * 0.45, -s * 0.55, -s * 0.3, 0, -s);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawSparkle(sp) {
    var progress = sp.life / sp.maxLife;
    var opacity = Math.sin(progress * Math.PI);
    if (opacity <= 0) return;

    ctx.save();
    ctx.translate(sp.x, sp.y);
    ctx.globalAlpha = opacity * 0.8;

    if (darkMode) {
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = 'rgba(255,183,197,1)';
    }

    var s = sp.size;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.18, -s * 0.18);
    ctx.lineTo(s, 0);
    ctx.lineTo(s * 0.18, s * 0.18);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.18, s * 0.18);
    ctx.lineTo(-s, 0);
    ctx.lineTo(-s * 0.18, -s * 0.18);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = darkMode ? '#ffffff' : '#ffffff';
    ctx.fill();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = petals.length - 1; i >= 0; i--) {
      var p = petals[i];
      p.time += 0.015;
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.time + p.swayPhase) * p.sway * 0.4;
      p.rot += p.rotSpeed;

      if (p.y > canvas.height + 30 || p.x < -30 || p.x > canvas.width + 30) {
        petals.splice(i, 1);
        continue;
      }
      drawPetal(p);
    }

    for (var j = sparkles.length - 1; j >= 0; j--) {
      var sp = sparkles[j];
      sp.life++;
      if (sp.life >= sp.maxLife) {
        sparkles.splice(j, 1);
        continue;
      }
      drawSparkle(sp);
    }

    requestAnimationFrame(animate);
  }

  setInterval(function () { createPetal(false); }, 400);
  setInterval(function () { createSparkle(); }, 2500);

  for (var k = 0; k < 15; k++) {
    createPetal(true);
  }

  animate();
})();
