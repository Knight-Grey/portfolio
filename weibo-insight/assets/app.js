/* ============================================================
   热点讨论结构分析 · 前端渲染
   零依赖：只用原生 DOM API 手绘 SVG，没有图表库
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.INSIGHT;
  var NS = 'http://www.w3.org/2000/svg';

  var C = {
    ink: '#171512',
    soft: '#3d3833',
    muted: '#7c736a',
    line: '#e8e2da',
    grid: '#f0ece6',
    accent: '#d94f2b',
    gray: '#c9c0b6',
    cool: '#2f6f6a'
  };

  var SERIES = ['#d94f2b', '#2f6f6a', '#c08a2e', '#5b6bbf', '#a34d8c',
                '#4a8f4a', '#8a5a3b', '#3f7f9f', '#b04a4a', '#6f6f3f'];

  /* ---------------------------------------------------------- 工具 */
  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
          node.setAttribute(k, attrs[k]);
        }
      }
    }
    if (parent) { parent.appendChild(node); }
    return node;
  }

  function txt(parent, x, y, str, opts) {
    opts = opts || {};
    var t = el('text', {
      x: x,
      y: y,
      'font-size': opts.size || 13,
      fill: opts.fill || C.soft,
      'text-anchor': opts.anchor || 'start',
      'font-weight': opts.weight || 400
    }, parent);
    t.textContent = str;
    return t;
  }

  function makeSvg(box, w, h) {
    box.innerHTML = '';
    return el('svg', {
      viewBox: '0 0 ' + w + ' ' + h,
      class: 'chart',
      preserveAspectRatio: 'xMidYMid meet',
      role: 'img'
    }, box);
  }

  function cut(str, n) {
    str = String(str === undefined || str === null ? '' : str);
    return str.length > n ? str.slice(0, n) + '…' : str;
  }

  function num(n) {
    n = Number(n) || 0;
    return n.toLocaleString('en-US');
  }

  function pct(v, digits) {
    v = Number(v) || 0;
    return (v * 100).toFixed(digits === undefined ? 1 : digits) + '%';
  }

  function noData(box) {
    box.innerHTML = '<p class="empty">还没有数据。先在项目目录运行 <b>python analyze.py</b> 生成数据文件。</p>';
  }

  /* ---------------------------------------------------------- 顶部数字 */
  function renderKpis() {
    if (!DATA || !DATA.totals) { return; }
    var t = DATA.totals;
    document.getElementById('kpi-topics').textContent = t.topics;
    document.getElementById('kpi-posts').textContent = t.posts;
    document.getElementById('kpi-comments').textContent = num(t.comments);

    var cov = document.getElementById('kpi-coverage');
    if (cov) { cov.textContent = pct(t.coverage, 0); }

    var mb = document.getElementById('meta-batch');
    if (mb) { mb.textContent = '批次：' + (DATA.batch || '—'); }
    var mt = document.getElementById('meta-time');
    if (mt) { mt.textContent = '生成时间：' + (DATA.generated_at || '—'); }
    var mc = document.getElementById('method-coverage');
    if (mc) {
      mc.textContent = pct(t.coverage, 1) + '（' + num(t.comments) + ' / ' + num(t.comments_reported) + '）';
    }
  }

  /* ---------------------------------------------------------- 01 声量错位 */
  function renderGap() {
    var box = document.getElementById('chart-gap');
    if (!box) { return; }
    if (!DATA || !DATA.topics || !DATA.topics.length) { noData(box); return; }

    var topics = DATA.topics;
    var W = 900;
    var left = 210;
    var barMax = W - left - 140;
    var rowH = 64;
    var H = topics.length * rowH + 16;
    var svg = makeSvg(box, W, H);

    var maxShare = 0;
    topics.forEach(function (t) {
      maxShare = Math.max(maxShare, Number(t.hot_share) || 0, Number(t.comment_share) || 0);
    });
    if (maxShare <= 0) { maxShare = 1; }

    topics.forEach(function (t, i) {
      var y = i * rowH + 8;
      var hotW = Math.max(2, (Number(t.hot_share) || 0) / maxShare * barMax);
      var comW = Math.max(2, (Number(t.comment_share) || 0) / maxShare * barMax);

      txt(svg, 0, y + 20, '#' + t.rank + ' ' + cut(t.word, 11), { size: 13, fill: C.ink, weight: 500 });

      // 灰色：榜单热度占比
      el('rect', {
        x: left, y: y + 8, width: hotW, height: 13, rx: 2, fill: C.gray
      }, svg);
      // 橙色：实际评论占比
      el('rect', {
        x: left, y: y + 26, width: comW, height: 13, rx: 2, fill: C.accent
      }, svg);

      txt(svg, left + hotW + 10, y + 19, pct(t.hot_share, 1), { size: 11.5, fill: C.muted });
      txt(svg, left + comW + 10, y + 37, pct(t.comment_share, 1) + ' · ' + num(t.comment_count) + ' 条',
          { size: 11.5, fill: C.accent, weight: 600 });
    });
  }

  /* ---------------------------------------------------------- 02 时间结构 */
  function renderHours() {
    var box = document.getElementById('chart-hours');
    var legendBox = document.getElementById('legend-hours');
    if (!box) { return; }
    if (!DATA || !DATA.topics || !DATA.topics.length) { noData(box); return; }

    var topics = DATA.topics;
    var W = 900, H = 300;
    var pad = { l: 44, r: 16, t: 18, b: 30 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;
    var svg = makeSvg(box, W, H);

    var maxY = 0;
    topics.forEach(function (t) {
      (t.hours || []).forEach(function (n) { maxY = Math.max(maxY, Number(n) || 0); });
    });
    if (maxY <= 0) { maxY = 1; }

    function px(h) { return pad.l + (h / 23) * iw; }
    function py(v) { return pad.t + ih - (v / maxY) * ih; }

    // 横向网格
    [0, 0.5, 1].forEach(function (f) {
      var y = py(maxY * f);
      el('line', {
        x1: pad.l, y1: y, x2: pad.l + iw, y2: y,
        stroke: f === 0 ? C.line : C.grid, 'stroke-width': 1
      }, svg);
      txt(svg, pad.l - 8, y + 4, Math.round(maxY * f), { size: 11, fill: C.muted, anchor: 'end' });
    });

    // 横轴
    for (var h = 0; h <= 23; h += 3) {
      txt(svg, px(h), H - pad.b + 18, (h < 10 ? '0' + h : h) + ':00',
          { size: 11, fill: C.muted, anchor: 'middle' });
    }

    // 每条话题一条折线
    topics.forEach(function (t, i) {
      var hours = t.hours || [];
      var color = SERIES[i % SERIES.length];
      var pts = [];
      for (var k = 0; k < 24; k++) {
        pts.push(px(k) + ',' + py(Number(hours[k]) || 0));
      }
      el('polyline', {
        points: pts.join(' '),
        fill: 'none',
        stroke: color,
        'stroke-width': 2,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        opacity: 0.9
      }, svg);
    });

    // 图例
    if (legendBox) {
      legendBox.innerHTML = '';
      topics.forEach(function (t, i) {
        var span = document.createElement('span');
        var chip = document.createElement('i');
        chip.style.background = SERIES[i % SERIES.length];
        span.appendChild(chip);
        span.appendChild(document.createTextNode('#' + t.rank + ' ' + cut(t.word, 10)));
        legendBox.appendChild(span);
      });
    }
  }

  /* ---------------------------------------------------------- 03 博文影响力 */
  function renderPosts() {
    var box = document.getElementById('chart-posts');
    if (!box) { return; }
    var posts = (DATA && DATA.posts) || [];
    if (!posts.length) { noData(box); return; }

    var rows = posts.slice(0, 8);
    var W = 900;
    var left = 250;
    var barMax = W - left - 130;
    var rowH = 52;
    var H = rows.length * rowH + 12;
    var svg = makeSvg(box, W, H);

    var maxV = 0;
    rows.forEach(function (p) { maxV = Math.max(maxV, Number(p.attitudes) || 0); });
    if (maxV <= 0) { maxV = 1; }

    rows.forEach(function (p, i) {
      var y = i * rowH + 6;
      var w = Math.max(3, (Number(p.attitudes) || 0) / maxV * barMax);
      var isVideo = String(p.source || '').indexOf('视频') >= 0;

      txt(svg, 0, y + 18, cut(p.author || '未知账号', 10), { size: 13, fill: C.ink, weight: 500 });
      txt(svg, 0, y + 34, cut(p.topic || '', 14), { size: 11, fill: C.muted });

      el('rect', {
        x: left, y: y + 8, width: w, height: 22, rx: 3,
        fill: isVideo ? C.accent : C.cool,
        opacity: 0.88
      }, svg);

      txt(svg, left + w + 10, y + 23, num(p.attitudes) + ' 赞',
          { size: 12, fill: C.ink, weight: 600 });
    });
  }

  /* ---------------------------------------------------------- 04 地域 */
  function renderRegions() {
    var box = document.getElementById('chart-regions');
    if (!box) { return; }
    var regions = (DATA && DATA.top_regions) || [];
    if (!regions.length) { noData(box); return; }

    var rows = regions.slice(0, 10);
    var W = 900;
    var left = 70;
    var barMax = W - left - 110;
    var rowH = 34;
    var H = rows.length * rowH + 10;
    var svg = makeSvg(box, W, H);

    var maxV = 0;
    rows.forEach(function (r) { maxV = Math.max(maxV, Number(r.count) || 0); });
    if (maxV <= 0) { maxV = 1; }

    rows.forEach(function (r, i) {
      var y = i * rowH + 4;
      var w = Math.max(3, (Number(r.count) || 0) / maxV * barMax);

      txt(svg, 0, y + 18, r.name, { size: 12.5, fill: C.soft });
      el('rect', { x: left, y: y + 6, width: w, height: 16, rx: 2, fill: C.cool, opacity: 0.75 }, svg);
      txt(svg, left + w + 10, y + 18, r.count + ' 条', { size: 11.5, fill: C.muted });
    });
  }

  /* ---------------------------------------------------------- 05 情绪构成 */
  function renderSentiment() {
    var box = document.getElementById('chart-sentiment');
    if (!box) { return; }
    var topics = (DATA && DATA.topics) || [];
    if (!topics.length) { noData(box); return; }

    var POS = '#3f7a54', NEU = '#c9c0b6', NEG = '#b03a2e';
    var W = 900, left = 210, barMax = 430;
    var rowH = 56, H = topics.length * rowH + 10;
    var svg = makeSvg(box, W, H);

    topics.forEach(function (t, i) {
      var y = i * rowH + 8;
      var s = t.sentiment || { pos: 0, neu: 0, neg: 0 };
      var pos = Number(s.pos) || 0;
      var neu = Number(s.neu) || 0;
      var neg = Number(s.neg) || 0;
      var total = pos + neu + neg;
      if (total <= 0) { total = 1; }

      txt(svg, 0, y + 20, '#' + t.rank + ' ' + cut(t.word, 11),
          { size: 13, fill: C.ink, weight: 500 });

      var x = left;
      [[pos, POS], [neu, NEU], [neg, NEG]].forEach(function (seg) {
        var w = (seg[0] / total) * barMax;
        if (w <= 0) { return; }
        el('rect', { x: x, y: y + 6, width: w, height: 22, fill: seg[1] }, svg);
        x += w;
      });

      txt(svg, left + barMax + 12, y + 21,
          pct(neg / total, 0) + ' 负 · ' + pct(pos / total, 0) + ' 正',
          { size: 12, fill: C.muted });
      txt(svg, left + barMax + 12, y + 36,
          '（' + num(total) + ' 条）',
          { size: 11, fill: C.muted });
    });
  }

  /* ---------------------------------------------------------- 06 高赞评论 */
  function renderComments() {
    var box = document.getElementById('comments');
    if (!box) { return; }
    if (!DATA || !DATA.topics || !DATA.topics.length) { noData(box); return; }

    var picked = [];
    DATA.topics.forEach(function (t) {
      (t.top_comments || []).slice(0, 3).forEach(function (c) {
        picked.push({
          text: c.text,
          likes: c.likes,
          replies: c.replies,
          user: c.user,
          ip: c.ip,
          time: c.time,
          topic: t.word,
          rank: t.rank
        });
      });
    });

    if (!picked.length) { noData(box); return; }
    picked.sort(function (a, b) { return (b.likes || 0) - (a.likes || 0); });
    picked = picked.slice(0, 8);

    box.innerHTML = '';
    picked.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'comment';

      var topic = document.createElement('div');
      topic.className = 'topic';
      topic.textContent = '#' + c.rank + ' ' + c.topic;

      var text = document.createElement('div');
      text.className = 'text';
      text.textContent = c.text;

      var foot = document.createElement('div');
      foot.className = 'foot';

      var likes = document.createElement('span');
      likes.className = 'likes';
      likes.textContent = '👍 ' + num(c.likes);

      var who = document.createElement('span');
      who.textContent = (c.user || '匿名') + (c.ip ? ' · ' + c.ip : '');

      var rel = document.createElement('span');
      rel.textContent = (c.replies || 0) + ' 条回复';

      foot.appendChild(likes);
      foot.appendChild(who);
      foot.appendChild(rel);

      card.appendChild(topic);
      card.appendChild(text);
      card.appendChild(foot);
      box.appendChild(card);
    });
  }

  /* ---------------------------------------------------------- 启动 */
  function boot() {
    if (!DATA) {
      ['chart-gap', 'chart-hours', 'chart-posts', 'chart-regions', 'chart-sentiment', 'comments']
        .forEach(function (id) {
          var box = document.getElementById(id);
          if (box) { noData(box); }
        });
      return;
    }
    renderKpis();
    renderGap();
    renderHours();
    renderPosts();
    renderRegions();
    renderSentiment();
    renderComments();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
