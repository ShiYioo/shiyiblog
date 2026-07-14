// cursor-trail.js - 魔法少女星屑轨迹

(function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  function isDark() {
    return document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark');
  }

  var darkMode = isDark();
  var observer = new MutationObserver(function () { darkMode = isDark(); });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  var colors = ['#ff8fab', '#6ec6ff', '#b39ddb', '#ffd54f', '#4dd0e1', '#ffab91', '#ce93d8'];

  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  var starX = mouseX, starY = mouseY;
  var easing = 0.14;
  var mainRot = 0;
  var pulse = 0;

  var particles = [];
  var MAX_PARTICLES = 35;
  var lastSpawnX = 0, lastSpawnY = 0;

  function rand(a, b) { return Math.random() * (b - a) + a; }

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    var dx = mouseX - lastSpawnX;
    var dy = mouseY - lastSpawnY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 10 && particles.length < MAX_PARTICLES) {
      var count = Math.min(2, Math.floor(dist / 20) + 1);
      for (var i = 0; i < count; i++) {
        spawnParticle(mouseX + rand(-4, 4), mouseY + rand(-4, 4));
      }
      lastSpawnX = mouseX;
      lastSpawnY = mouseY;
    }
  });

  function spawnParticle(x, y) {
    particles.push({
      x: x,
      y: y,
      vx: rand(-0.6, 0.6),
      vy: rand(-1.8, -0.4),
      size: rand(2.5, 6),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.06, 0.06),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.0,
      decay: rand(0.015, 0.028),
    });
  }

  function drawStar(x, y, size, rotation, color, alpha, glow) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    if (glow > 0) {
      ctx.shadowColor = color;
      ctx.shadowBlur = glow;
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.2, -size * 0.2);
    ctx.lineTo(size, 0);
    ctx.lineTo(size * 0.2, size * 0.2);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.2, size * 0.2);
    ctx.lineTo(-size, 0);
    ctx.lineTo(-size * 0.2, -size * 0.2);
    ctx.closePath();
    ctx.fill();

    if (size > 3) {
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starX += (mouseX - starX) * easing;
    starY += (mouseY - starY) * easing;
    mainRot += 0.015;
    pulse += 0.06;

    var pulseScale = 1 + Math.sin(pulse) * 0.15;
    var mainSize = 7 * pulseScale;
    var mainColor = darkMode ? '#ffd6e7' : '#ff8fab';
    var mainGlow = darkMode ? 16 : 10;

    drawStar(starX, starY, mainSize, mainRot, mainColor, 0.9, mainGlow);
    drawStar(starX, starY, mainSize * 1.6, mainRot * 0.5, mainColor, 0.15, 0);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy *= 0.97;
      p.vx *= 0.98;
      p.rot += p.rotSpeed;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      var twinkle = 0.7 + Math.sin(p.life * 15) * 0.3;
      drawStar(p.x, p.y, p.size * p.life, p.rot, p.color, p.life * twinkle, darkMode ? 6 : 3);
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();
