/* CodeLab — interactions */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 移动端菜单 ---------- */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- 2. 头部滚动阴影 ---------- */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 3. 英雄区路径按真实长度描边 ---------- */
  document.querySelectorAll('.scene .trace').forEach(p => {
    const len = Math.ceil(p.getTotalLength());
    p.style.setProperty('--len', len);
  });

  /* ---------- 4. 滚动入场 ---------- */
  const items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------- 5. 导航高亮当前区块 ---------- */
  const sections = ['top', 'methods', 'questions', 'partners', 'team', 'resources']
    .map(id => document.getElementById(id)).filter(Boolean);
  const links = new Map();
  document.querySelectorAll('.nav a[href^="#"]').forEach(a =>
    links.set(a.getAttribute('href').slice(1), a)
  );
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.remove('is-active'));
        const link = links.get(e.target.id);
        if (link) link.classList.add('is-active');
      });
    }, { threshold: 0.4 });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- 6. 年份 ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- 7. 聊天按钮（占位，接你的客服/问答系统） ---------- */
  const fab = document.getElementById('chatFab');
  if (fab) {
    fab.addEventListener('click', () => {
      // TODO: 在这里打开你的聊天面板或第三方 widget
      alert('Ask CodeLab — 聊天面板还没接上，可在 js/main.js 第 7 段替换成你的实现。');
    });
  }
})();
