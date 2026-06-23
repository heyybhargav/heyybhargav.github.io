// Progressive-enhancement client-side navigation.
// Intercepts internal links, fetches the target, and swaps <main> in place
// (animated via the View Transitions API) so pages never do a full reload.
// On file:// fetch is blocked, so we bail and let the browser navigate normally.
(function () {
  if (location.protocol === 'file:') return;

  var cache = new Map();

  function internal(a) {
    return a && a.origin === location.origin
      && /\.html$/.test(a.pathname)
      && a.target !== '_blank'
      && !a.hasAttribute('download');
  }

  function load(url) {
    if (cache.has(url)) return Promise.resolve(cache.get(url));
    return fetch(url).then(function (r) { return r.text(); }).then(function (t) {
      var doc = new DOMParser().parseFromString(t, 'text/html');
      var data = { main: doc.querySelector('main'), title: doc.title };
      cache.set(url, data);
      return data;
    });
  }

  function swap(data, hash) {
    document.querySelector('main').replaceWith(document.importNode(data.main, true));
    if (data.title) document.title = data.title;
    if (hash) {
      var el = document.querySelector(hash);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  function go(url, hash, push) {
    load(url).then(function (data) {
      if (!data.main) { location.href = url + (hash || ''); return; }
      var run = function () { swap(data, hash); };
      if (document.startViewTransition) { document.startViewTransition(run); } else { run(); }
      if (push) history.pushState({}, '', url + (hash || ''));
    }).catch(function () { location.href = url + (hash || ''); });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a');
    if (!internal(a)) return;
    e.preventDefault();
    go(a.origin + a.pathname + a.search, a.hash, true);
  });

  window.addEventListener('popstate', function () {
    go(location.origin + location.pathname + location.search, location.hash, false);
  });
})();
