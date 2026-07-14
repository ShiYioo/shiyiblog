<link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap" rel="stylesheet">

<style scoped>
    .welcome-page-wrapper {
        --card-bg: rgba(255, 255, 255, 0.72);
        --card-border: rgba(255, 255, 255, 0.6);
        --card-shadow: 0 8px 32px rgba(31, 38, 135, 0.12);
        --text-main: #4a4a6a;
        --text-sub: #8888aa;
        --pink: #ff8fab;
        --blue: #6ec6ff;
        --purple: #b39ddb;
        --green: #81c784;
        --orange: #ffb74d;
        --gold: #ffd54f;
        --teal: #4dd0e1;
        --tag-bg: rgba(255, 255, 255, 0.55);
        --glow-pink: rgba(255, 143, 171, 0.25);
        --glow-blue: rgba(110, 198, 255, 0.25);
    }
    html.dark .welcome-page-wrapper,
    body.dark .welcome-page-wrapper {
        --card-bg: rgba(30, 30, 50, 0.72);
        --card-border: rgba(100, 100, 160, 0.2);
        --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        --text-main: #d0d0e8;
        --text-sub: #9090b0;
        --pink: #f48fb1;
        --blue: #64b5f6;
        --purple: #ce93d8;
        --green: #66bb6a;
        --orange: #ffa726;
        --gold: #ffca28;
        --teal: #26c6da;
        --tag-bg: rgba(50, 50, 80, 0.55);
        --glow-pink: rgba(244, 143, 177, 0.15);
        --glow-blue: rgba(100, 181, 246, 0.15);
    }
    .welcome-page-wrapper {
        font-family: 'Mochiy Pop One', 'Noto Sans CJK SC', sans-serif;
        max-width: 820px;
        margin: 0 auto;
        padding: 20px 16px 60px;
    }
    .welcome-page-wrapper * { color: var(--text-main); }

    /* ========== 主卡片 ========== */
    .main-card {
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--card-border);
        border-radius: 24px;
        padding: 40px 32px;
        box-shadow: var(--card-shadow);
        position: relative;
        overflow: hidden;
    }
    .main-card::before {
        content: '';
        position: absolute;
        top: -60px; right: -40px;
        width: 280px; height: 280px;
        background: radial-gradient(circle, var(--pink) 0%, transparent 70%);
        opacity: 0.1;
        border-radius: 50%;
        pointer-events: none;
    }
    .main-card::after {
        content: '';
        position: absolute;
        bottom: -50px; left: -30px;
        width: 240px; height: 240px;
        background: radial-gradient(circle, var(--blue) 0%, transparent 70%);
        opacity: 0.1;
        border-radius: 50%;
        pointer-events: none;
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
        background: linear-gradient(135deg, var(--pink), var(--purple), var(--blue));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .title-deco {
        width: 14px; height: 14px;
        background: linear-gradient(135deg, var(--pink), var(--purple));
        transform: rotate(45deg);
        border-radius: 3px;
        flex-shrink: 0;
        box-shadow: 0 0 12px var(--glow-pink);
    }
    .title-deco.right {
        background: linear-gradient(135deg, var(--blue), var(--purple));
        box-shadow: 0 0 12px var(--glow-blue);
    }

    /* ========== 区块标题 — 游戏UI标签页风格 ========== */
    .section-title {
        font-size: 1.2rem;
        margin-bottom: 20px;
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 24px 8px 20px;
        border-radius: 0 20px 20px 0;
        background: linear-gradient(135deg, var(--purple), var(--pink));
        color: #fff !important;
    }
    html.dark .welcome-page-wrapper .section-title { color: #fff !important; }
    .section-title::before {
        content: '';
        position: absolute;
        left: -12px; top: 50%;
        transform: translateY(-50%);
        width: 0; height: 0;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        border-right: 12px solid var(--purple);
        opacity: 0.5;
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
    .profile-section {
        display: flex;
        align-items: center;
        gap: 32px;
        margin-bottom: 40px;
        position: relative;
        z-index: 1;
    }
    .avatar-wrapper {
        position: relative;
        flex-shrink: 0;
        width: 150px; height: 150px;
    }
    .avatar-ring {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        background: conic-gradient(from 0deg, var(--pink), var(--purple), var(--blue), var(--pink));
        animation: spin 4s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .avatar-img {
        width: 150px; height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--card-bg);
        position: relative;
        z-index: 1;
    }
    .avatar-badge {
        position: absolute;
        bottom: 2px; right: 2px;
        width: 36px; height: 36px;
        background: linear-gradient(135deg, var(--gold), var(--orange));
        border-radius: 50%;
        border: 3px solid var(--card-bg);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-badge::after {
        content: '';
        width: 16px; height: 16px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        background: #fff;
    }
    .profile-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .profile-info p {
        font-size: 0.95rem;
        line-height: 1.8;
        color: var(--text-sub);
        margin: 0;
        padding-left: 20px;
        position: relative;
    }
    .profile-info p::before {
        content: '';
        position: absolute;
        left: 0; top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 8px; height: 8px;
        border-radius: 2px;
        background: linear-gradient(135deg, var(--pink), var(--purple));
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
        border-radius: 16px;
        padding: 18px 20px;
        border: 1px solid var(--card-border);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
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
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
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

    /* ========== 版权 — 卷轴提示框 ========== */
    .copyright-box {
        background: linear-gradient(135deg, rgba(179, 157, 219, 0.1), rgba(255, 143, 171, 0.08));
        border: 1px dashed var(--purple);
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
        color: var(--purple);
        text-decoration: none;
        border-bottom: 1px dashed var(--purple);
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
        background: linear-gradient(135deg, var(--pink), var(--purple));
        color: #fff !important;
        padding: 12px 32px;
        border-radius: 30px;
        font-size: 0.95rem;
        margin-bottom: 24px;
        box-shadow: 0 4px 20px var(--glow-pink);
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
        border: 1px solid var(--card-border);
        border-radius: 20px;
        padding: 24px;
        width: 240px;
        text-align: center;
        box-shadow: var(--card-shadow);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    .donate-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
    }
    .donate-card.alipay::before { background: linear-gradient(to right, var(--purple), var(--pink)); }
    .donate-card.wechat::before { background: linear-gradient(to right, var(--green), var(--blue)); }
    .donate-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
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
    .donate-card.alipay .donate-card-title { color: var(--purple); }
    .donate-card.alipay .donate-card-title-icon { background: rgba(179, 157, 219, 0.2); }
    .donate-card.alipay .donate-card-title-icon::after { background: var(--purple); }
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
    @media (max-width: 640px) {
        .profile-section { flex-direction: column; text-align: center; gap: 20px; }
        .profile-info p { padding-left: 0; text-align: center; }
        .profile-info p::before { display: none; }
        .skills-grid { grid-template-columns: 1fr; }
        .main-card { padding: 28px 20px; }
        .page-title { font-size: 1.5rem; }
        .donate-card { width: 100%; max-width: 280px; }
    }
</style>

<div class="welcome-page-wrapper">
<div class="main-card">
<h1 class="page-title"><span class="title-deco"></span><span class="page-title-text">自我介绍</span><span class="title-deco right"></span></h1>
<div class="profile-section">
<div class="avatar-wrapper">
<div class="avatar-ring"></div>
<img class="avatar-img" src="/shiyiimg.jpg" alt="个人头像">
<div class="avatar-badge"></div>
</div>
<div class="profile-info">
<p>这里是失意哦，双非摆烂大学生</p>
<p>一觉睡到 12 点，吃完饭后继续睡</p>
<p>平常喜欢二次元，不怎么运动，也不自律</p>
<p>没米的时候就写点外包</p>
<p>有时候喜欢折磨 Java 和 Kotlin，虽然没啥意义</p>
<p>算了，能活一天是一天吧，开心最重要</p>
</div>
</div>
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
