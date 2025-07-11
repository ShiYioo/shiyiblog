// snow.js - Canvas 版本下雪特效（渐进式生成）

(function () {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '9997';
  canvas.style.pointerEvents = 'none';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // 设置最大雪花数
  const MAX_SNOWFLAKES = 200;
  const INITIAL_SNOWFLAKES = 1; // 初始数量
  const SNOWFLAKE_INTERVAL = 1000; // 每隔多少毫秒增加一些雪花

  const snowflakes = [];

  function createSnowflake() {
    if (snowflakes.length >= MAX_SNOWFLAKES) return;

    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -50,
      r: Math.random() * 3 + 1, // 半径
      d: Math.random() * 200,   // 控制飘动方向和速度
      a: Math.random() * 0.5 + 0.3, // 透明度
      drift: (Math.random() - 0.5) * 1.5, // 漂移方向
    });
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snowflakes.length; i++) {
      const flake = snowflakes[i];

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.a})`;
      ctx.fill();

      flake.y += Math.cos(flake.d) + 1 + flake.r / 2;
      flake.x += flake.drift;

      // 回到顶部
      if (flake.y > canvas.height) {
        snowflakes[i] = {
          x: Math.random() * canvas.width,
          y: -5,
          r: flake.r,
          d: Math.random() * 200,
          a: flake.a,
          drift: (Math.random() - 0.5) * 1.5,
        };
      }
    }

    requestAnimationFrame(drawSnowflakes);
  }

  // 定时创建雪花（控制总数不超过 MAX_SNOWFLAKES）
  setInterval(() => {
    createSnowflake();
  }, SNOWFLAKE_INTERVAL);

  // 初始生成少量雪花
  for (let i = 0; i < INITIAL_SNOWFLAKES; i++) {
    createSnowflake();
  }

  drawSnowflakes();
})();