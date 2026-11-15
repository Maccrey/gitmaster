(function () {
  'use strict';
  const measurementId = document.querySelector('meta[name="ga-measurement-id"]')?.content || '';
  const enabled = /^G-[A-Z0-9]+$/i.test(measurementId) && !/XXXXXXXXXX/i.test(measurementId);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (enabled) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: true });
  }

  function track(name, params) {
    const payload = Object.assign({ language: document.documentElement.lang || 'ko' }, params || {});
    window.gtag('event', name, payload);
  }
  window.GitMasterAnalytics = { enabled, track };

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.href || '';
    if (href === 'https://maccrey.com/' || href === 'https://maccrey.com') {
      track('home_click', { link_url: href, link_location: 'topbar' });
    } else if (/\.pdf(?:#|$)/i.test(href)) {
      track('ebook_open', { file_name: href.split('/').pop().split('#')[0], link_location: 'ebook' });
    } else if (link.closest('.lang, .seo-language-links')) {
      track('language_select', { target_language: link.getAttribute('lang') || link.textContent.trim(), link_url: href });
    } else if (link.classList.contains('cta')) {
      track('learning_cta_click', { link_url: href, cta_text: link.textContent.trim() });
    }
  });
  document.addEventListener('change', function (event) {
    if (event.target.id === 'language') {
      track('language_select', { target_language: event.target.value, link_location: 'app_language_switch' });
    }
  });

  window.addEventListener('gitmaster-route-change', function (event) {
    const detail = event.detail || {};
    track('learning_route_view', { page_route: detail.route || location.hash || '#dashboard', page_name: detail.page || 'dashboard' });
  });
  window.addEventListener('gitmaster-lab-complete', function (event) {
    track('lab_complete', { lab_id: event.detail?.labId || '', completed_count: event.detail?.completedCount || 0 });
  });
}());
