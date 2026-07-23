---
title: " "
pageClass: archive-page
hideComments: true
---

<link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap" rel="stylesheet">

<style scoped>
    .welcome-page-wrapper {
        --card-bg: rgba(255, 255, 255, 0.78);
        --card-border: rgba(33, 187, 255, 0.3);
        --card-shadow: 0 8px 32px rgba(22, 119, 255, 0.14);
        --text-main: #2a3a4a;
        --text-sub: #6d8a9e;
        --ba-cyan: #21bbff;
        --ba-blue: #1677ff;
        --ba-light: #7fdfff;
        --pink: #ff8fab;
        --blue: #6ec6ff;
        --purple: #b39ddb;
        --green: #81c784;
        --orange: #ffb74d;
        --gold: #ffd54f;
        --teal: #4dd0e1;
        --tag-bg: rgba(255, 255, 255, 0.6);
        --glow-pink: rgba(33, 187, 255, 0.25);
        --glow-blue: rgba(22, 119, 255, 0.25);
    }
    html.dark .welcome-page-wrapper,
    body.dark .welcome-page-wrapper {
        --card-bg: rgba(18, 28, 48, 0.82);
        --card-border: rgba(33, 187, 255, 0.22);
        --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
        --text-main: #c8dcec;
        --text-sub: #7e9bb0;
        --pink: #f48fb1;
        --blue: #64b5f6;
        --purple: #ce93d8;
        --green: #66bb6a;
        --orange: #ffa726;
        --gold: #ffca28;
        --teal: #26c6da;
        --tag-bg: rgba(30, 45, 70, 0.6);
        --glow-pink: rgba(33, 187, 255, 0.18);
        --glow-blue: rgba(33, 187, 255, 0.15);
    }
    .welcome-page-wrapper {
        font-family: 'Mochiy Pop One', 'Noto Sans CJK SC', sans-serif;
        max-width: 820px;
        margin: 0 auto;
        padding: 20px 16px 60px;
    }
    .welcome-page-wrapper * { color: var(--text-main); }

    /* ========== 主卡片 — BA 斜切角面板 ========== */
    .main-card {
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 40px 32px;
        position: relative;
        /* BA 斜切角：左上 + 右下 */
        clip-path: polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px);
        filter: drop-shadow(0 10px 34px rgba(22, 119, 255, 0.2));
    }
    /* 顶部 BA 青色光带（跟随斜切轮廓） */
    .main-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--ba-cyan), var(--ba-blue));
        pointer-events: none;
        z-index: 2;
    }
    /* 右下斜切处青色高光线 */
    .main-card::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 46px; height: 3px;
        background: var(--ba-cyan);
        pointer-events: none;
        z-index: 2;
    }

    /* ========== 页标题 ========== */
    .page-title {
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 36px;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    .page-title-text {
        background: linear-gradient(135deg, var(--ba-cyan), var(--ba-blue), var(--ba-light));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .title-deco {
        width: 14px; height: 14px;
        background: linear-gradient(135deg, var(--ba-cyan), var(--ba-blue));
        transform: rotate(45deg);
        border-radius: 3px;
        flex-shrink: 0;
        box-shadow: 0 0 12px var(--glow-blue);
    }
    .title-deco.right {
        background: linear-gradient(135deg, var(--ba-light), var(--ba-blue));
        box-shadow: 0 0 12px var(--glow-blue);
    }

    /* ========== 区块标题 — BA 梯形标签条 ========== */
    .section-title {
        font-size: 1.2rem;
        margin-bottom: 20px;
        margin-left: -12px;
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 30px 8px 24px;
        color: #fff !important;
        background: linear-gradient(135deg, var(--ba-blue), var(--ba-cyan));
        /* BA 梯形：右下斜切成飘带 */
        clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
        filter: drop-shadow(0 3px 10px rgba(22, 119, 255, 0.35));
    }
    html.dark .welcome-page-wrapper .section-title { color: #fff !important; }
    .section-title::before {
        content: '';
        position: absolute;
        width: 0; height: 0;
        border: none;
    }
    .section-icon {
        width: 18px; height: 18px;
        flex-shrink: 0;
        fill: #fff;
    }

    /* CSS图标 — 星形 */
    .icon-star {
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        background: #fff;
    }
    /* CSS图标 — 盾牌 */
    .icon-shield {
        clip-path: polygon(50% 0%, 100% 15%, 100% 55%, 50% 100%, 0% 55%, 0% 15%);
        background: #fff;
    }

    /* ========== 个人信息 — 角色立绘框 ========== */
    /* ========== BA 档案舞台 — 左信息面板 + 右立绘（复刻官方档案页） ========== */
    .archive-stage {
        position: relative;
        width: 100%;
        min-height: 560px;
        margin: 0 0 40px;
        display: flex;
        align-items: stretch;
        overflow: hidden;
        /* 浅灰底 + 细三角几何纹 */
        background-color: #f3f6fa;
        background-image:
            linear-gradient(45deg, rgba(33, 187, 255, 0.06) 25%, transparent 25%, transparent 75%, rgba(33, 187, 255, 0.06) 75%),
            linear-gradient(45deg, rgba(33, 187, 255, 0.06) 25%, transparent 25%, transparent 75%, rgba(33, 187, 255, 0.06) 75%);
        background-size: 32px 32px;
        background-position: 0 0, 16px 16px;
        filter: drop-shadow(0 12px 36px rgba(22, 119, 255, 0.14));
    }
    html.dark .archive-stage,
    body.dark .archive-stage {
        background-color: #151c28;
    }
    .archive-bg { display: none; }

    /* 左侧：纯白直角信息面板（官方为白底矩形，非玻璃非斜切） */
    .archive-panel {
        position: relative;
        z-index: 2;
        width: 44%;
        min-width: 290px;
        background: #ffffff;
        padding: 40px 32px 56px;
        box-shadow: 8px 0 28px rgba(0, 0, 0, 0.07);
        display: flex;
        flex-direction: column;
    }
    html.dark .archive-panel,
    body.dark .archive-panel { background: #1d2533; }
    /* 面板左侧 BA 青色装饰条 */
    .archive-panel::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 4px;
        background: linear-gradient(180deg, var(--ba-cyan), var(--ba-blue));
    }
    .archive-panel .student-info {
        flex-direction: column;
        gap: 4px;
        flex: 1;
    }
    .archive-panel .twigline { width: 100%; margin: 12px 0 14px; }
    .archive-panel .info-entry { flex: none; }
    /* 面板底部签名 */
    .archive-footer {
        margin-top: 20px;
        font-size: 0.64rem;
        letter-spacing: 0.22em;
        color: #aab4c0;
    }

    /* 右侧：大立绘 + 头顶光环 */
    .archive-art {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 70px 20px 30px;
    }
    .archive-art .avatar-wrapper {
        position: relative;
        width: 250px;
        height: 380px;
    }
    .archive-art .avatar-hex {
        width: 230px;
        height: 340px;
    }
    /* 光环移到立绘头顶上方 */
    .archive-art .ba-halo {
        width: 160px;
        height: 160px;
        margin: 0 0 0 -80px;
        top: -70px;
        left: 50%;
        animation: bspin 8s linear infinite;
        opacity: 0.75;
    }
    .archive-art .avatar-badge { display: none; }

    /* 右下圆形头像选择条 */
    .archive-selector {
        position: absolute;
        bottom: 22px;
        right: 26px;
        z-index: 3;
        display: flex;
        gap: 10px;
        padding: 8px 14px;
        background: rgba(255, 255, 255, 0.78);
        backdrop-filter: blur(8px);
        border-radius: 40px;
    }
    html.dark .archive-selector,
    body.dark .archive-selector { background: rgba(29, 37, 51, 0.78); }
    .sel-item {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: var(--ba-blue);
        background: linear-gradient(160deg, rgba(33, 187, 255, 0.18), rgba(22, 119, 255, 0.08));
        border: 2px solid transparent;
        cursor: default;
        transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    }
    .sel-item.active {
        border-color: var(--ba-cyan);
        box-shadow: 0 0 12px rgba(33, 187, 255, 0.6);
        transform: scale(1.1);
    }
    .sel-item:hover { transform: scale(1.1); }

    /* 标题：舞台上方居中 */
    .welcome-page-wrapper > .page-title {
        margin: 0 0 24px;
        font-size: 1.5rem;
    }

    /* 内容区：复用 BA 斜切卡片 */
    .archive-content {
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 36px 32px;
        position: relative;
        margin-bottom: 32px;
        clip-path: polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px);
        filter: drop-shadow(0 10px 34px rgba(22, 119, 255, 0.18));
    }
    .archive-content::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--ba-cyan), var(--ba-blue));
        pointer-events: none;
        z-index: 2;
    }
    .avatar-wrapper {
        position: relative;
        flex-shrink: 0;
        width: 160px; height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* BA 光环：倾斜分段旋转环 */
    .ba-halo {
        position: absolute;
        top: 50%; left: 50%;
        width: 200px; height: 200px;
        margin: -100px 0 0 -100px;
        opacity: 0.6;
        animation: bspin 8s linear infinite;
        transform-style: preserve-3d;
        z-index: 0;
    }
    @keyframes bspin {
        from { transform: rotateX(66deg) rotateZ(0deg); }
        to   { transform: rotateX(66deg) rotateZ(360deg); }
    }
    .halo-arc {
        position: absolute; inset: 0; border-radius: 50%;
        background: conic-gradient(var(--ba-cyan) 0deg 52deg, transparent 52deg 90deg,
            var(--ba-cyan) 90deg 142deg, transparent 142deg 180deg,
            var(--ba-cyan) 180deg 232deg, transparent 232deg 270deg,
            var(--ba-cyan) 270deg 322deg, transparent 322deg 360deg);
        -webkit-mask: radial-gradient(circle, transparent 56%, #000 58%, #000 70%, transparent 72%);
        mask: radial-gradient(circle, transparent 56%, #000 58%, #000 70%, transparent 72%);
        filter: drop-shadow(0 0 6px rgba(33,187,255,0.8));
    }
    .halo-ring {
        position: absolute; inset: 6px; border-radius: 50%;
        border: 1.5px solid var(--ba-cyan);
        box-shadow: 0 0 10px rgba(33,187,255,0.5);
    }
    .halo-node {
        position: absolute; width: 7px; height: 7px; border-radius: 50%;
        background: var(--ba-light); box-shadow: 0 0 8px var(--ba-cyan);
    }
    .halo-node.n { top: 2px; left: 50%; margin-left: -3.5px; }
    .halo-node.s { bottom: 2px; left: 50%; margin-left: -3.5px; }
    .halo-node.e { right: 2px; top: 50%; margin-top: -3.5px; }
    .halo-node.w { left: 2px; top: 50%; margin-top: -3.5px; }
    /* BA 六边形立绘框 */
    .avatar-hex {
        position: relative;
        z-index: 1;
        width: 150px; height: 165px;
        background: linear-gradient(160deg, var(--ba-cyan), var(--ba-blue));
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 6px 18px rgba(22,119,255,0.4));
    }
    .avatar-img {
        width: 92%; height: 92%;
        object-fit: cover;
        border-radius: 0 !important;
        border: none !important;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }
    .avatar-badge {
        position: absolute;
        bottom: 6px; right: -2px;
        width: 38px; height: 38px;
        background: linear-gradient(135deg, var(--gold), var(--orange));
        border-radius: 50%;
        border: 3px solid #fff;
        z-index: 3;
        display: flex; align-items: center; justify-content: center;
    }
    .avatar-badge::after {
        content: '';
        width: 16px; height: 16px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        background: #fff;
    }
    /* 稀有度星标已移入学生档案信息面板 */
    /* ========== 学生档案信息面板 — BA 档案结构 ========== */
    .student-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .en-name {
        font-size: 0.92rem;
        font-weight: 700;
        letter-spacing: 0.32em;
        color: var(--ba-blue);
        text-transform: uppercase;
    }
    .cn-name {
        font-size: 2rem;
        font-weight: 800;
        color: var(--text-main);
        line-height: 1.15;
        margin: 2px 0 4px;
    }
    .rarity {
        color: var(--gold);
        font-size: 1rem;
        letter-spacing: 4px;
        text-shadow: 0 0 8px rgba(255, 213, 79, 0.7);
        margin-bottom: 2px;
    }
    .role-tag {
        font-size: 0.88rem;
        color: var(--text-sub);
        letter-spacing: 0.05em;
    }
    /* BA 装饰分隔线 twigline */
    .twigline {
        position: relative;
        height: 2px;
        margin: 12px 0 8px;
        background: linear-gradient(90deg, var(--ba-cyan), rgba(33, 187, 255, 0.08));
        border-radius: 1px;
    }
    .twig-diamond {
        position: absolute;
        left: 0; top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 8px; height: 8px;
        background: var(--ba-cyan);
        box-shadow: 0 0 6px var(--ba-cyan);
    }
    /* 档案 info 条目：六边形图标 + 双语标签 + 值 */
    .info-entry {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 5px 0;
    }
    .info-icon {
        flex-shrink: 0;
        width: 30px; height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(33, 187, 255, 0.18), rgba(22, 119, 255, 0.12));
        color: var(--ba-blue);
        font-size: 0.9rem;
        /* BA 六边形图标 */
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    }
    .info-text {
        display: flex;
        flex-direction: column;
        line-height: 1.3;
        min-width: 0;
        flex: 1;
    }
    .info-label {
        font-size: 0.76rem;
        color: var(--text-sub);
        display: flex;
        align-items: baseline;
        gap: 6px;
    }
    .info-label em {
        font-style: normal;
        font-size: 0.64rem;
        color: var(--ba-cyan);
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }
    .info-value {
        font-size: 0.96rem;
        color: var(--text-main);
        font-weight: 600;
    }

    /* ========== 技能卡片 — 状态面板 ========== */
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 40px;
        position: relative;
        z-index: 1;
    }
    .skill-card {
        background: var(--tag-bg);
        padding: 18px 20px;
        border: 1px solid var(--card-border);
        transition: transform 0.3s ease, filter 0.3s ease;
        position: relative;
        /* BA 斜切角 */
        clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
    }
    .skill-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 4px; height: 100%;
    }
    .skill-card[data-type="frontend"]::before { background: linear-gradient(to bottom, var(--blue), transparent); }
    .skill-card[data-type="backend"]::before { background: linear-gradient(to bottom, var(--green), transparent); }
    .skill-card[data-type="devops"]::before { background: linear-gradient(to bottom, var(--orange), transparent); }
    .skill-card[data-type="gal"]::before { background: linear-gradient(to bottom, var(--pink), transparent); }
    .skill-card[data-type="ai"]::before { background: linear-gradient(to bottom, var(--teal), transparent); }
    .skill-card:hover {
        transform: translateY(-4px);
        filter: drop-shadow(0 8px 18px rgba(22, 119, 255, 0.18));
    }
    .skill-card-header {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.05rem;
        margin-bottom: 12px;
    }
    .skill-icon {
        width: 22px; height: 22px;
        flex-shrink: 0;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .skill-icon::after {
        content: '';
        width: 12px; height: 12px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
    .skill-card[data-type="frontend"] .skill-icon { background: rgba(110, 198, 255, 0.2); }
    .skill-card[data-type="frontend"] .skill-icon::after { background: var(--blue); }
    .skill-card[data-type="backend"] .skill-icon { background: rgba(129, 199, 132, 0.2); }
    .skill-card[data-type="backend"] .skill-icon::after { background: var(--green); }
    .skill-card[data-type="devops"] .skill-icon { background: rgba(255, 183, 77, 0.2); }
    .skill-card[data-type="devops"] .skill-icon::after { background: var(--orange); }
    .skill-card[data-type="gal"] .skill-icon { background: rgba(255, 143, 171, 0.2); }
    .skill-card[data-type="gal"] .skill-icon::after { background: var(--pink); }
    .skill-card[data-type="ai"] .skill-icon { background: rgba(77, 208, 225, 0.2); }
    .skill-card[data-type="ai"] .skill-icon::after { background: var(--teal); clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
    .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .skill-tag {
        font-size: 0.82rem;
        padding: 4px 12px;
        border-radius: 20px;
        font-family: 'Comic Sans MS', 'Noto Sans CJK', sans-serif;
    }
    .skill-card[data-type="frontend"] .skill-tag { background: rgba(110, 198, 255, 0.15); color: var(--blue); }
    .skill-card[data-type="backend"] .skill-tag { background: rgba(129, 199, 132, 0.15); color: var(--green); }
    .skill-card[data-type="devops"] .skill-tag { background: rgba(255, 183, 77, 0.15); color: var(--orange); }
    .skill-card[data-type="gal"] .skill-tag { background: rgba(255, 143, 171, 0.15); color: var(--pink); }
    .skill-card[data-type="ai"] .skill-tag { background: rgba(77, 208, 225, 0.15); color: var(--teal); }

    /* ========== 版权 — BA 提示框 ========== */
    .copyright-box {
        background: linear-gradient(135deg, rgba(33, 187, 255, 0.1), rgba(22, 119, 255, 0.06));
        border: 1px dashed var(--ba-blue);
        border-radius: 16px;
        padding: 18px 22px;
        margin-bottom: 8px;
        position: relative;
        z-index: 1;
    }
    .copyright-box ul {
        margin: 0;
        padding-left: 20px;
    }
    .copyright-box li {
        font-size: 0.9rem;
        line-height: 2;
        color: var(--text-sub);
    }
    .copyright-box a {
        color: var(--ba-blue);
        text-decoration: none;
        border-bottom: 1px dashed var(--ba-blue);
    }

    /* ========== 打赏 — 抽卡祈愿banner ========== */
    .donate-section {
        margin-top: 32px;
        text-align: center;
    }
    .donate-tip {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(180deg, var(--ba-cyan) 0%, var(--ba-blue) 100%);
        color: #fff !important;
        padding: 13px 36px;
        font-size: 0.95rem;
        margin-bottom: 24px;
        /* BA 枕形按钮：左右斜切 */
        clip-path: polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
        filter: drop-shadow(0 4px 16px rgba(22, 119, 255, 0.4));
        position: relative;
    }
    .donate-tip-icon {
        width: 16px; height: 16px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        background: #fff;
        animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
    }
    .donate-cards {
        display: flex;
        gap: 24px;
        justify-content: center;
        flex-wrap: wrap;
    }
    .donate-card {
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        padding: 24px;
        width: 240px;
        text-align: center;
        transition: transform 0.3s ease, filter 0.3s ease;
        position: relative;
        /* BA 斜切角 */
        clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);
        filter: drop-shadow(0 6px 20px rgba(22, 119, 255, 0.14));
    }
    .donate-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
    }
    .donate-card.alipay::before { background: linear-gradient(to right, var(--ba-blue), var(--ba-cyan)); }
    .donate-card.wechat::before { background: linear-gradient(to right, var(--green), var(--blue)); }
    .donate-card:hover {
        transform: translateY(-6px);
        filter: drop-shadow(0 12px 28px rgba(22, 119, 255, 0.24));
    }
    .donate-card-title {
        font-size: 1.05rem;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .donate-card-title-icon {
        width: 20px; height: 20px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .donate-card-title-icon::after {
        content: '';
        width: 10px; height: 10px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
    .donate-card.alipay .donate-card-title { color: var(--ba-blue); }
    .donate-card.alipay .donate-card-title-icon { background: rgba(33, 187, 255, 0.2); }
    .donate-card.alipay .donate-card-title-icon::after { background: var(--ba-blue); }
    .donate-card.wechat .donate-card-title { color: var(--green); }
    .donate-card.wechat .donate-card-title-icon { background: rgba(129, 199, 132, 0.2); }
    .donate-card.wechat .donate-card-title-icon::after { background: var(--green); }
    .donate-card img {
        width: 180px; height: 180px;
        object-fit: cover;
        border-radius: 16px;
        border: 2px solid var(--card-border);
    }

    /* ========== 响应式 ========== */
    @media (max-width: 768px) {
        .archive-stage { flex-direction: column; min-height: auto; }
        .archive-panel { width: 100%; min-width: 0; padding: 28px 22px 44px; box-shadow: 0 6px 20px rgba(0,0,0,0.07); }
        .archive-art { padding: 40px 20px 90px; }
        .archive-art .avatar-wrapper { width: 200px; height: 300px; }
        .archive-art .avatar-hex { width: 180px; height: 260px; }
        .archive-art .ba-halo { top: -50px; width: 130px; height: 130px; }
        .archive-selector { bottom: 16px; right: 50%; transform: translateX(50%); }
        .cn-name { font-size: 1.7rem; }
        .skills-grid { grid-template-columns: 1fr; }
        .archive-content { padding: 28px 20px; }
        .page-title { font-size: 1.3rem; }
        .donate-card { width: 100%; max-width: 280px; }
    }

    /* ========== 全屏角色档案首屏 ========== */
    .profile-archive-page {
        --archive-ink: #2f3741;
        --archive-muted: #7d8995;
        --archive-blue: #168af5;
        --archive-cyan: #18d2df;
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0 0 72px;
        font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
        color: var(--archive-ink);
        background-color: #f8fafb;
        background-image:
            linear-gradient(30deg, transparent 49.4%, rgba(65, 93, 117, .045) 50%, transparent 50.6%),
            linear-gradient(150deg, transparent 49.4%, rgba(65, 93, 117, .045) 50%, transparent 50.6%);
        background-size: 280px 240px;
    }
    .profile-archive-page * { box-sizing: border-box; }
    .profile-archive-page > .page-title { display: none; }
    .profile-archive-page .archive-stage {
        width: min(1480px, calc(100% - 56px));
        min-height: 650px;
        margin: 44px auto 56px;
        overflow: visible;
        isolation: isolate;
        background:
            linear-gradient(90deg, rgba(255,255,255,.95) 0 39%, rgba(255,255,255,.48) 39% 100%),
            repeating-linear-gradient(60deg, transparent 0 136px, rgba(54, 84, 104, .045) 137px 139px, transparent 140px 274px),
            #f1f5f7;
        border-top: 2px solid var(--archive-blue);
        border-bottom: 1px solid rgba(22, 138, 245, .5);
        box-shadow: 0 24px 60px rgba(30, 63, 90, .12);
    }
    .profile-archive-page .archive-stage::before {
        content: "PERSONAL FILE / 001";
        position: absolute;
        top: 22px;
        left: 44px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .24em;
        color: var(--archive-blue);
    }
    .profile-archive-page .archive-stage::after {
        content: "SHIYI BLOG";
        position: absolute;
        right: 36px;
        bottom: 24px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .18em;
        color: rgba(47, 55, 65, .54);
    }
    .profile-archive-page .archive-panel {
        width: 42%;
        min-width: 0;
        padding: 110px 54px 72px;
        background: transparent;
        box-shadow: none;
    }
    .profile-archive-page .archive-panel::before {
        left: 54px;
        top: 82px;
        bottom: auto;
        width: 88px;
        height: 4px;
        background: var(--archive-cyan);
    }
    .profile-archive-page .en-name {
        color: var(--archive-blue);
        font-size: clamp(2.5rem, 4.7vw, 5rem);
        line-height: .92;
        letter-spacing: .025em;
        font-family: Arial, sans-serif;
        font-weight: 900;
    }
    .profile-archive-page .cn-name {
        margin: 18px 0 6px;
        color: var(--archive-ink);
        font-size: clamp(2rem, 3vw, 3.25rem);
        letter-spacing: .08em;
    }
    .profile-archive-page .rarity {
        color: #f4bb2b;
        font-size: 1.3rem;
        letter-spacing: 5px;
    }
    .profile-archive-page .role-tag { font-size: .95rem; color: var(--archive-muted); }
    .profile-archive-page .twigline { margin: 28px 0 18px; background: linear-gradient(90deg, var(--archive-blue), transparent); }
    .profile-archive-page .info-entry { padding: 7px 0; gap: 13px; }
    .profile-archive-page .info-icon { width: 34px; height: 34px; color: var(--archive-blue); background: rgba(22, 138, 245, .1); }
    .profile-archive-page .info-label { font-size: .7rem; color: var(--archive-muted); letter-spacing: .08em; }
    .profile-archive-page .info-label em { color: var(--archive-blue); }
    .profile-archive-page .info-value { font-size: 1rem; color: var(--archive-ink); }
    .profile-archive-page .archive-footer { color: rgba(47, 55, 65, .56); font-weight: 700; }
    .profile-archive-page .archive-art {
        align-items: center;
        justify-content: center;
        padding: 52px 180px 88px 50px;
    }
    .profile-archive-page .archive-art::before {
        content: "01";
        position: absolute;
        right: 12%;
        top: 12%;
        z-index: -1;
        color: rgba(22, 138, 245, .08);
        font-size: min(24vw, 300px);
        font-family: Arial, sans-serif;
        font-weight: 900;
        line-height: 1;
    }
    .profile-archive-page .archive-art .avatar-wrapper { width: 410px; height: 560px; }
    .profile-archive-page .archive-art .avatar-hex {
        width: 100%;
        height: 100%;
        background: transparent;
        clip-path: none;
        filter: none;
    }
    .profile-archive-page .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center bottom;
        clip-path: none;
        filter: saturate(.92) contrast(1.03) drop-shadow(12px 16px 18px rgba(28, 51, 74, .16));
    }
    .profile-archive-page .archive-art .ba-halo { width: 240px; height: 240px; top: -56px; margin-left: -120px; opacity: .95; }
    .profile-archive-page .archive-selector {
        right: 32px;
        bottom: 36px;
        padding: 0;
        gap: 9px;
        border-radius: 0;
        background: transparent;
        backdrop-filter: none;
    }
    .profile-archive-page .sel-item {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid rgba(47, 55, 65, .12);
        background: rgba(255,255,255,.88);
        cursor: pointer;
    }
    .profile-archive-page .sel-item.active { border-color: var(--archive-blue); box-shadow: 0 0 0 4px rgba(22,138,245,.12); }
    .profile-archive-page .archive-content {
        width: min(1040px, calc(100% - 40px));
        margin: 0 auto 42px;
        padding: 40px;
        background: rgba(255,255,255,.82);
        border: 1px solid rgba(22,138,245,.14);
        clip-path: none;
    }
    .profile-archive-page .donate-section { width: min(1040px, calc(100% - 40px)); margin: 0 auto; }
    @media (max-width: 900px) {
        .profile-archive-page .archive-stage { width: min(680px, calc(100% - 32px)); }
        .profile-archive-page .archive-panel { width: 48%; padding: 94px 28px 60px; }
        .profile-archive-page .archive-panel::before { left: 28px; }
        .profile-archive-page .archive-art { padding: 50px 45px 110px 20px; }
        .profile-archive-page .archive-art .avatar-wrapper { width: 290px; height: 430px; }
        .profile-archive-page .archive-art .avatar-hex { width: 100%; height: 100%; }
        .profile-archive-page .archive-selector { right: 20px; bottom: 22px; gap: 5px; }
        .profile-archive-page .sel-item { width: 37px; height: 37px; font-size: .8rem; }
    }
    @media (max-width: 640px) {
        .profile-archive-page .archive-stage { margin-top: 16px; }
        .profile-archive-page .archive-stage::before { left: 24px; }
        .profile-archive-page .archive-stage::after { display: none; }
        .profile-archive-page .archive-panel { width: 100%; padding: 90px 24px 42px; }
        .profile-archive-page .archive-panel::before { left: 24px; }
        .profile-archive-page .archive-art { min-height: 420px; padding: 68px 20px 84px; }
        .profile-archive-page .archive-art .avatar-wrapper { width: 265px; height: 350px; }
        .profile-archive-page .archive-art .avatar-hex { width: 100%; height: 100%; }
        .profile-archive-page .archive-art .ba-halo { width: 180px; height: 180px; margin-left: -90px; top: -32px; }
        .profile-archive-page .archive-content { padding: 28px 20px; }
        .profile-archive-page .archive-selector { right: 50%; transform: translateX(50%); }
    }
</style>

<div class="welcome-page-wrapper profile-archive-page">
<h1 class="page-title"><span class="title-deco"></span><span class="page-title-text">档案 / ARCHIVE</span><span class="title-deco right"></span></h1>
<div class="archive-stage">
<div class="archive-bg"></div>
<div class="archive-panel">
<div class="student-info">
<div class="en-name">SHI&nbsp;YI</div>
<div class="cn-name">失意</div>
<div class="rarity">★ ★ ★ ★ ★</div>
<div class="role-tag">— 摆烂系 Java 开发者 —</div>
<div class="twigline"><span class="twig-diamond"></span></div>
<div class="info-entry"><span class="info-icon">⬢</span><span class="info-text"><span class="info-label">所属<em>Affiliation</em></span><span class="info-value">双非摆烂大学生</span></span></div>
<div class="info-entry"><span class="info-icon">⌨</span><span class="info-text"><span class="info-label">武器<em>Weapon</em></span><span class="info-value">Java / Kotlin</span></span></div>
<div class="info-entry"><span class="info-icon">♪</span><span class="info-text"><span class="info-label">趣味<em>Hobby</em></span><span class="info-value">二次元 / Galgame</span></span></div>
<div class="info-entry"><span class="info-icon">⚙</span><span class="info-text"><span class="info-label">特技<em>Skill</em></span><span class="info-value">睡到 12 点继续睡</span></span></div>
<div class="info-entry"><span class="info-icon">✦</span><span class="info-text"><span class="info-label">信条<em>Motto</em></span><span class="info-value">能活一天是一天，开心最重要</span></span></div>
</div>
<div class="archive-footer">BLUE ARCHIVE /// CHARACTER INFO</div>
</div>
<div class="archive-art">
<div class="avatar-wrapper">
<div class="ba-halo">
<div class="halo-arc"></div>
<div class="halo-ring"></div>
<span class="halo-node n"></span>
<span class="halo-node e"></span>
<span class="halo-node s"></span>
<span class="halo-node w"></span>
</div>
<div class="avatar-hex">
<img class="avatar-img" src="/shiyiimg-cutout.png" alt="个人立绘">
</div>
<div class="avatar-badge"></div>
</div>
</div>
<div class="archive-selector" aria-label="档案分类">
<button class="sel-item active" type="button" title="基本档案" aria-label="基本档案">⬢</button>
<button class="sel-item" type="button" title="技术栈" aria-label="技术栈">⌨</button>
<button class="sel-item" type="button" title="兴趣爱好" aria-label="兴趣爱好">♪</button>
<button class="sel-item" type="button" title="开发习惯" aria-label="开发习惯">⚙</button>
<button class="sel-item" type="button" title="个人信条" aria-label="个人信条">✦</button>
</div>
</div>
<div class="archive-content">
<h2 class="section-title"><span class="section-icon icon-star"></span>我会什么呢</h2>
<div class="skills-grid">
<div class="skill-card" data-type="frontend">
<div class="skill-card-header"><span class="skill-icon"></span><span>前端开发</span></div>
<div class="skill-tags"><span class="skill-tag">HTML</span><span class="skill-tag">CSS</span><span class="skill-tag">JavaScript</span><span class="skill-tag">TypeScript</span><span class="skill-tag">Vue</span><span class="skill-tag">React</span><span class="skill-tag">Vite</span><span class="skill-tag">TailwindCSS</span><span class="skill-tag">UniApp</span></div>
</div>
<div class="skill-card" data-type="backend">
<div class="skill-card-header"><span class="skill-icon"></span><span>后端开发</span></div>
<div class="skill-tags"><span class="skill-tag">SpringBoot</span><span class="skill-tag">Spring Cloud</span><span class="skill-tag">Java</span><span class="skill-tag">Kotlin</span><span class="skill-tag">MyBatis-Plus</span><span class="skill-tag">Redis</span><span class="skill-tag">MySQL</span><span class="skill-tag">MongoDB</span><span class="skill-tag">RabbitMQ</span></div>
</div>
<div class="skill-card" data-type="devops">
<div class="skill-card-header"><span class="skill-icon"></span><span>Linux 运维</span></div>
<div class="skill-tags"><span class="skill-tag">Docker</span><span class="skill-tag">Nginx</span><span class="skill-tag">Jenkins</span><span class="skill-tag">1Panel</span><span class="skill-tag">Git</span><span class="skill-tag">Shell</span></div>
</div>
<div class="skill-card" data-type="ai">
<div class="skill-card-header"><span class="skill-icon"></span><span>AI 工程化</span></div>
<div class="skill-tags"><span class="skill-tag">AI 自动化采集</span><span class="skill-tag">AI 自动化测试</span></div>
</div>
<div class="skill-card" data-type="gal">
<div class="skill-card-header"><span class="skill-icon"></span><span>超绝技能</span></div>
<div class="skill-tags"><span class="skill-tag">Galgame</span></div>
</div>
</div>
<h2 class="section-title"><span class="section-icon icon-shield"></span>版权说明</h2>
<div class="copyright-box">
<ul>
<li>本博客所有内容遵循 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank">CC BY-NC-SA 4.0</a> 协议，转载请注明出处</li>
<li>如有侵犯版权请尽快联系站长：shiyi.code@qq.com，本站会在 24 小时内删除有争议的内容</li>
</ul>
</div>
</div>
<div class="donate-section">
<div class="donate-tip"><span class="donate-tip-icon"></span>如果内容对你有帮助，可以投个赏哦</div>
<div class="donate-cards">
<div class="donate-card alipay">
<div class="donate-card-title"><span class="donate-card-title-icon"></span>支付宝</div>
<img src="/buy/zhifubaobuy.jpg" alt="支付宝二维码">
</div>
<div class="donate-card wechat">
<div class="donate-card-title"><span class="donate-card-title-icon"></span>微信</div>
<img src="/buy/weixinbuy.jpg" alt="微信二维码">
</div>
</div>
</div>
</div>
