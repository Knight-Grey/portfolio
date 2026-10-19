/* ==========================================================================
   作品集 · 渲染逻辑
   一般不需要改这个文件；要改内容请编辑 assets/js/data.js
   ========================================================================== */
(function () {
  'use strict';

  var D = window.PORTFOLIO_DATA;

  /* ---------------- 小工具 ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt !== undefined && txt !== null && String(txt) !== '') n.textContent = txt;
    return n;
  }
  function blank(v) { return v === undefined || v === null || String(v).trim() === ''; }
  function val(v, fb) { return blank(v) ? fb : v; }
  function list(v) { return Object.prototype.toString.call(v) === '[object Array]' ? v : []; }
  function setText(sel, txt) {
    var n = $(sel);
    if (n) n.textContent = blank(txt) ? '' : String(txt);
  }

  if (!D) {
    document.body.insertBefore(
      el('p', 'load-error', '没有找到内容配置：请确认 assets/js/data.js 是否存在且没有语法错误。'),
      document.body.firstChild
    );
    return;
  }

  var SITE = D.site || {};
  var PROFILE = D.profile || {};
  var SECTIONS = SITE.sections || {};

  /* ---------------- 站点基础信息 ---------------- */
  function initMeta() {
    document.title = val(SITE.title, val(PROFILE.name, '个人作品集'));

    var desc = $('meta[name="description"]');
    if (desc && !blank(SITE.description)) desc.setAttribute('content', SITE.description);

    setText('#brand-name', val(SITE.brand, val(PROFILE.name, '作品集')));

    var footer = $('#footer-text');
    if (footer) {
      var year = new Date().getFullYear();
      footer.textContent = String(val(SITE.footer, '© ' + year + ' ' + val(PROFILE.name, '')))
        .replace('{year}', year);
    }
  }

  /* ---------------- 板块标题 ---------------- */
  function initSectionHeads() {
    ['about', 'video', 'article', 'experience', 'contact'].forEach(function (id) {
      var cfg = SECTIONS[id] || {};
      setText('#' + id + '-kicker', cfg.kicker);
      setText('#' + id + '-title', cfg.title);
      setText('#' + id + '-desc', cfg.desc);
    });
  }

  /* ---------------- 首屏 ---------------- */
  function initialOf(name) {
    var s = String(val(name, '')).trim();
    return s ? s.charAt(0) : '★';
  }

  function initHero() {
    setText('#hero-eyebrow', SITE.eyebrow);
    setText('#hero-name', val(PROFILE.name, '你的名字'));
    setText('#hero-title', PROFILE.title);
    setText('#hero-tagline', PROFILE.tagline);

    // 头像：有图用图，没图用姓氏首字
    var avatar = $('#hero-avatar');
    if (avatar) {
      avatar.innerHTML = '';
      if (!blank(PROFILE.avatar)) {
        var img = new Image();
        img.alt = val(PROFILE.name, '') + '的照片';
        img.onerror = function () {
          if (img.parentNode) img.parentNode.removeChild(img);
          avatar.textContent = initialOf(PROFILE.name);
        };
        img.src = PROFILE.avatar;
        avatar.appendChild(img);
      } else {
        avatar.textContent = initialOf(PROFILE.name);
      }
    }

    // 亮点
    var hl = $('#hero-highlights');
    if (hl) {
      hl.innerHTML = '';
      list(PROFILE.highlights).forEach(function (t) { hl.appendChild(el('li', null, t)); });
      if (!hl.children.length) hl.parentNode.hidden = true;
    }

    // 按钮
    var actions = $('#hero-actions');
    if (actions) {
      actions.innerHTML = '';
      actions.appendChild(link('#video', '查看作品', 'btn btn--primary', true));
      if (!blank(PROFILE.resume)) actions.appendChild(link(PROFILE.resume, '下载简历', 'btn', true));
      actions.appendChild(link('#contact', '联系方式', 'btn', false));
    }
  }

  function link(href, text, cls, blankTarget) {
    var a = el('a', cls, text);
    a.href = href;
    if (blankTarget) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }

  /* ---------------- 关于我 ---------------- */
  function initAbout() {
    var box = $('#about-body');
    if (!box) return;
    box.innerHTML = '';

    list(PROFILE.intro).forEach(function (p) { box.appendChild(el('p', null, p)); });

    var skills = list(PROFILE.skills);
    if (skills.length) {
      var wrap = el('div', 'skills');
      skills.forEach(function (s) {
        var card = el('div', 'skill');
        card.appendChild(el('div', 'skill__title', val(s.title, '')));
        card.appendChild(el('div', 'skill__items', val(s.items, '')));
        wrap.appendChild(card);
      });
      box.appendChild(wrap);
    }

    // 统计数字
    var stats = $('#stats');
    if (stats) {
      stats.innerHTML = '';
      [
        { num: list(D.videoWorks).length, label: '视频作品' },
        { num: list(D.articleWorks).length, label: '图文作品' },
        { num: list(D.experiences).length, label: '实习与实践' }
      ].filter(function (s) { return s.num > 0; })
        .forEach(function (s) {
          var c = el('div', 'stat');
          c.appendChild(el('div', 'stat__num', s.num));
          c.appendChild(el('div', 'stat__label', s.label));
          stats.appendChild(c);
        });
      if (!stats.children.length) stats.hidden = true;
    }

    if (!box.children.length) $('#about').hidden = true;
  }

  /* ---------------- 作品卡片 ---------------- */
  function placeholder(item) {
    var ph = el('div', 'thumb__ph');
    ph.appendChild(el('span', null, val(item.category, '封面待补充')));
    return ph;
  }

  function playIcon() {
    var s = el('span', 'thumb__play');
    s.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    return s;
  }

  function isPortrait(item) {
    return String(val(item.ratio, '')).replace(/\s/g, '') === '9:16';
  }

  function thumb(item, kind) {
    var t = el('div', 'thumb' + (isPortrait(item) ? ' thumb--portrait' : ''));
    var hasMedia = kind === 'video'
      ? (!blank(item.embed) || !blank(item.url))
      : (!blank(item.url) || !blank(item.file));

    if (!blank(item.cover)) {
      var img = new Image();
      img.className = 'thumb__img';
      img.loading = 'lazy';
      img.alt = val(item.title, '作品封面');
      img.onerror = function () {
        if (img.parentNode) img.parentNode.removeChild(img);
        t.appendChild(placeholder(item));
      };
      img.src = item.cover;
      t.appendChild(img);
    } else {
      t.appendChild(placeholder(item));
    }

    if (!blank(item.duration)) t.appendChild(el('span', 'thumb__badge', item.duration));
    if (kind === 'video' && hasMedia) t.appendChild(playIcon());
    if (!hasMedia) t.appendChild(el('span', 'thumb__badge thumb__badge--pending', '链接待补充'));
    return t;
  }

  function card(item, kind) {
    var node = el('article', 'card');
    node.tabIndex = 0;
    node.setAttribute('role', 'button');

    node.appendChild(thumb(item, kind));

    var body = el('div', 'card__body');
    var meta = el('div', 'card__meta');
    var metaItems = kind === 'video'
      ? [item.category, item.role, item.year]
      : [item.category, item.outlet, item.date];
    metaItems.forEach(function (v) { if (!blank(v)) meta.appendChild(el('span', 'card__tag', v)); });
    if (meta.children.length) body.appendChild(meta);

    body.appendChild(el('h3', 'card__title', val(item.title, '未命名作品')));
    if (!blank(item.summary)) body.appendChild(el('p', 'card__desc', item.summary));

    var tags = list(item.tags);
    if (tags.length) {
      var tagBox = el('div', 'card__tags');
      tags.forEach(function (t) { tagBox.appendChild(el('span', 'tag', t)); });
      body.appendChild(tagBox);
    }

    var foot = el('div', 'card__foot');
    var hasLink = kind === 'video'
      ? (!blank(item.embed) || !blank(item.url))
      : (!blank(item.url) || !blank(item.file));
    foot.appendChild(el('span', hasLink ? '' : 'card__pending',
      kind === 'video' ? (hasLink ? '点击播放' : '视频文件待补充') : (hasLink ? '查看详情 ↗' : '链接待补充')));
    body.appendChild(foot);

    node.appendChild(body);

    function activate() { openItem(item, kind); }
    node.addEventListener('click', activate);
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        activate();
      }
    });
    return node;
  }

  /* ---------------- 作品列表 + 分类筛选 ---------------- */
  function initWorks(kind) {
    var id = kind === 'video' ? 'video' : 'article';
    var section = document.getElementById(id);
    if (!section) return;
    var items = list(kind === 'video' ? D.videoWorks : D.articleWorks);
    if (!items.length) { section.hidden = true; return; }
    section.hidden = false;

    var grid = $('#' + id + '-grid');
    var chips = $('#' + id + '-chips');

    var cats = ['全部'];
    items.forEach(function (it) {
      var c = val(it.category, '其他');
      if (cats.indexOf(c) < 0) cats.push(c);
    });

    var current = '全部';
    function draw() {
      grid.innerHTML = '';
      items.filter(function (it) {
        return current === '全部' || val(it.category, '其他') === current;
      }).forEach(function (it) { grid.appendChild(card(it, kind)); });
    }

    if (cats.length > 2 && chips) {
      chips.hidden = false;
      chips.innerHTML = '';
      cats.forEach(function (c) {
        var b = el('button', 'chip' + (c === current ? ' is-active' : ''), c);
        b.type = 'button';
        b.addEventListener('click', function () {
          current = c;
          $$('.chip', chips).forEach(function (x) { x.classList.remove('is-active'); });
          b.classList.add('is-active');
          draw();
        });
        chips.appendChild(b);
      });
    } else if (chips) {
      chips.hidden = true;
    }

    draw();
  }

  /* ---------------- 实习与实践 ---------------- */
  function initExperience() {
    var section = $('#experience');
    var box = $('#experience-list');
    if (!section || !box) return;
    var items = list(D.experiences);
    if (!items.length) { section.hidden = true; return; }
    section.hidden = false;

    box.innerHTML = '';
    items.forEach(function (it) {
      var wrap = el('div', 'exp');
      var top = el('div', 'exp__top');
      var left = el('div', 'exp__left');
      left.appendChild(el('div', 'exp__org', val(it.org, '')));
      if (!blank(it.role)) left.appendChild(el('div', 'exp__role', it.role));
      top.appendChild(left);
      if (!blank(it.period)) top.appendChild(el('div', 'exp__period', it.period));
      wrap.appendChild(top);

      var pts = list(it.points);
      if (pts.length) {
        var ul = el('ul', 'exp__points');
        pts.forEach(function (p) { ul.appendChild(el('li', null, p)); });
        wrap.appendChild(ul);
      }
      box.appendChild(wrap);
    });
  }

  /* ---------------- 联系方式 ---------------- */
  function socialIcon(name) {
    var n = String(name || '');
    if (n.indexOf('邮') >= 0 || /mail/i.test(n)) {
      var s = el('span', 'social__icon');
      s.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>';
      return s;
    }
    if (n.indexOf('手机') >= 0 || n.indexOf('电话') >= 0 || /phone|tel/i.test(n)) {
      var p = el('span', 'social__icon');
      p.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"/></svg>';
      return p;
    }
    if (n.indexOf('微信') >= 0) {
      var w = el('span', 'social__icon');
      w.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 4c-3.3 0-6 2.3-6 5.2 0 1.7.9 3.2 2.4 4.1L5 16l2.7-1.2c.4.1.9.1 1.3.1"/><path d="M15 8.5c3 0 5.5 2 5.5 4.6 0 1.4-.7 2.7-1.9 3.5l.3 2.4-2.4-1a6.4 6.4 0 0 1-1.5.2c-3 0-5.5-2.1-5.5-4.6S12 8.5 15 8.5Z"/></svg>';
      return w;
    }
    return el('span', 'social__icon', n.charAt(0));
  }

  function initContact() {
    var box = $('#socials');
    if (!box) return;
    var items = list(D.socials);
    box.innerHTML = '';
    items.forEach(function (s) {
      var hasUrl = !blank(s.url);
      var hasHandle = !blank(s.handle);
      var pending = !hasUrl && !hasHandle;   // 只有完全没填时才显示「待补充」样式
      var node = document.createElement(hasUrl ? 'a' : 'div');
      node.className = 'social' + (pending ? ' social--pending' : '');
      if (hasUrl) { node.href = s.url; node.target = '_blank'; node.rel = 'noopener'; }
      node.appendChild(socialIcon(s.name));
      var info = el('div', 'social__info');
      info.appendChild(el('div', 'social__name', val(s.name, '')));
      info.appendChild(el('div', 'social__handle', val(s.handle, '待补充')));
      node.appendChild(info);
      box.appendChild(node);
    });
    if (!items.length) $('#contact').hidden = true;
  }

  /* ---------------- 弹层 ---------------- */
  var modal, modalMedia, modalContent;

  function initModal() {
    modal = $('#modal');
    if (!modal) return;
    modalMedia = $('#modal-media');
    modalContent = $('#modal-content');
    $$('[data-close]', modal).forEach(function (n) {
      n.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && !modal.hidden) closeModal();
    });
  }

  function showModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var btn = $('.modal__close', modal);
    if (btn) btn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    if (modalMedia) { modalMedia.innerHTML = ''; modalMedia.hidden = true; }
    if (modalContent) modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  function fillContent(item, kind) {
    modalContent.innerHTML = '';

    // 图文作品在弹层顶部显示封面（论文截图这类可放大看）
    if (kind === 'article' && !blank(item.cover)) {
      var coverBox = el('div', 'modal__cover');
      var coverImg = new Image();
      coverImg.src = item.cover;
      coverImg.alt = val(item.title, '封面');
      coverImg.loading = 'lazy';
      coverBox.appendChild(coverImg);
      modalContent.appendChild(coverBox);
    }

    var meta = el('div', 'card__meta');
    var metaItems = kind === 'video'
      ? [item.category, item.role, item.year, item.duration]
      : [item.category, item.outlet, item.date];
    metaItems.forEach(function (v) { if (!blank(v)) meta.appendChild(el('span', 'card__tag', v)); });
    if (meta.children.length) modalContent.appendChild(meta);

    modalContent.appendChild(el('h3', 'modal__title', val(item.title, '未命名作品')));
    if (!blank(item.summary)) modalContent.appendChild(el('p', 'modal__desc', item.summary));

    var tags = list(item.tags);
    if (tags.length) {
      var tagBox = el('div', 'card__tags');
      tags.forEach(function (t) { tagBox.appendChild(el('span', 'tag', t)); });
      modalContent.appendChild(tagBox);
    }

    var actions = [];
    if (!blank(item.url) && !(kind === 'video' && !blank(item.embed) && item.url === item.embed)) {
      actions.push({
        label: val(item.urlLabel, kind === 'video' ? '打开原片 ↗' : '原文链接 ↗'),
        href: item.url
      });
    }
    if (!blank(item.file)) {
      actions.push({ label: val(item.fileLabel, '查看本地文件 ↗'), href: item.file });
    }
    if (actions.length) {
      var actionBox = el('div', 'modal__actions');
      actions.forEach(function (a, i) {
        var link = el('a', 'btn btn--sm' + (i === 0 ? ' btn--primary' : ''), a.label);
        link.href = a.href;
        link.target = '_blank';
        link.rel = 'noopener';
        actionBox.appendChild(link);
      });
      modalContent.appendChild(actionBox);
    }
  }

  // 点击卡片：视频弹出播放器，图文弹出详情（原文 / 本地文件入口都在里面）
  function openItem(item, kind) {
    if (kind === 'video' && (!blank(item.embed) || !blank(item.url))) {
      openVideo(item);
      return;
    }
    if (modalMedia) modalMedia.hidden = true;
    fillContent(item, kind);
    showModal();
  }

  function openVideo(item) {
    var src = blank(item.embed) ? item.url : item.embed;
    src = String(src).trim();
    if (blank(src)) { openItem(item, 'video'); return; }

    modalMedia.className = 'modal__media' + (isPortrait(item) ? ' modal__media--portrait' : '');
    modalMedia.hidden = false;
    modalMedia.innerHTML = '';

    if (src.charAt(0) === '<') {
      // 直接粘贴的完整 <iframe> / <video> 代码
      modalMedia.innerHTML = src;
    } else if (/\.(mp4|m4v|webm|ogv|ogg|mov)(\?.*)?$/i.test(src)) {
      var v = document.createElement('video');
      v.src = src;
      if (!blank(item.cover)) v.poster = item.cover;
      v.controls = true;
      v.playsInline = true;
      v.preload = 'metadata';
      // 不自动播放：浏览器会拦截带声音的自动播放，看起来就像"卡在第一帧"，交给用户点播放更稳
      modalMedia.appendChild(v);
    } else {
      var f = document.createElement('iframe');
      f.src = src;
      f.setAttribute('frameborder', '0');
      f.setAttribute('allowfullscreen', 'true');
      f.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
      modalMedia.appendChild(f);
    }

    fillContent(item, 'video');
    showModal();
  }

  /* ---------------- 导航 ---------------- */
  function initNav() {
    var nav = $('#nav');
    var toggle = $('#nav-toggle');
    if (!nav) return;

    var visible = [];
    list(SITE.nav).forEach(function (item) {
      var s = document.getElementById(item.id);
      if (!s || s.hidden) return;
      var a = el('a', 'nav__link', val(item.label, item.id));
      a.href = '#' + item.id;
      nav.appendChild(a);
      visible.push(item.id);
    });

    if (toggle && nav.children.length) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('nav__link')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 下载简历按钮
    var r = $('#header-resume');
    if (r) {
      if (blank(PROFILE.resume)) { r.hidden = true; }
      else { r.hidden = false; r.href = PROFILE.resume; }
    }

    return visible;
  }

  /* ---------------- 滚动高亮 ---------------- */
  function initSpy() {
    var links = $$('.nav__link');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var targets = links.map(function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    }).filter(Boolean);
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------------- 淡入动效 ---------------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    $$('.section').forEach(function (s) { s.classList.add('reveal'); io.observe(s); });
  }

  /* ---------------- 启动 ---------------- */
  initMeta();
  initSectionHeads();
  initAbout();
  initWorks('video');
  initWorks('article');
  initExperience();
  initContact();
  initHero();
  initModal();
  initNav();
  initSpy();
  initReveal();
})();
