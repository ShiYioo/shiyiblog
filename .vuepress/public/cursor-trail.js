// cursor-trail.js

(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  let mouseX = 0, mouseY = 0;
  let planeX = 0, planeY = 0;
  const easing = 0.02; // 缓动系数，值越小越慢

  // 监听鼠标位置
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 纸飞机动画循环
  function animate() {
    // 更新纸飞机位置（缓动）
    planeX += (mouseX - planeX) * easing;
    planeY += (mouseY - planeY) * easing;

    // 计算角度（弧度）
    const angle = Math.atan2(mouseY - planeY, mouseX - planeX);

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制纸飞机并旋转
    drawPaperPlane(planeX, planeY, angle);

    requestAnimationFrame(animate);
  }

  // 绘制一个简单的纸飞机形状并旋转
  function drawPaperPlane(x, y, angle) {
    ctx.save(); // 保存当前状态
    ctx.translate(x, y); // 移动画布原点到飞机中心
    ctx.rotate(angle); // 旋转画布

    // 渐变色
    const gradient = ctx.createLinearGradient(-15, -15, 15, 15);
    gradient.addColorStop(0, '#4facfe'); // 蓝色
    gradient.addColorStop(1, '#00f2fe'); // 青色

    ctx.fillStyle = gradient;

    // 绘制三角形机头
    ctx.beginPath();
    ctx.moveTo(0, -10);         // 上顶点
    ctx.lineTo(10, 5);          // 右下
    ctx.lineTo(-10, 5);         // 左下
    ctx.closePath();
    ctx.fill();

    // 中心菱形机身
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, -5);
    ctx.lineTo(0, -10);
    ctx.lineTo(-5, -5);
    ctx.closePath();
    ctx.fill();

    ctx.restore(); // 恢复画布状态
  }

  animate();

  // 自适应窗口大小
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();