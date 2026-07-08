document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const header = document.querySelector('.site-header');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let revealObserver = null;

  const setupReveal = () => {
    if (prefersReducedMotion) return;
    if (revealObserver) revealObserver.disconnect();

    const revealTargets = [
      ...document.querySelectorAll('main > section:not(.home-hero):not(.home-services)'),
      ...document.querySelectorAll('main article, main .section-heading, main .home-services__grid, main .process-list, main .home-info__grid')
    ].filter((target) => !target.closest('.home-services .section-heading, .section-bridge-marquee, .section-bridge-label'));

    revealTargets.forEach((target, index) => {
      target.dataset.reveal = '';
      target.classList.remove('is-visible');
      target.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
    });

    document.querySelectorAll('.benefit-grid').forEach((grid) => {
      grid.querySelectorAll('.benefit-card').forEach((card, index) => {
        card.style.setProperty('--reveal-delay', `${index * 95}ms`);
      });
    });

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((target) => revealObserver.observe(target));
  };

  const setupSmoothDetails = () => {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.notice-list__item, .faq-list__item').forEach((details) => {
      if (details.dataset.smoothDetailsReady === 'true') return;

      const summary = details.querySelector('summary');
      const panel = details.querySelector('.notice-list__body, .faq-list__body');
      if (!summary || !panel) return;

      details.dataset.smoothDetailsReady = 'true';
      let animation = null;

      if (details.open) {
        panel.style.height = 'auto';
      }

      summary.addEventListener('click', (event) => {
        event.preventDefault();
        if (animation) animation.cancel();

        const isOpen = details.open;
        panel.style.overflow = 'hidden';

        if (isOpen) {
          animation = panel.animate([
            { height: `${panel.scrollHeight}px`, opacity: 1, transform: 'translateY(0)' },
            { height: '0px', opacity: 0, transform: 'translateY(-8px)' }
          ], {
            duration: 260,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
          });

          animation.onfinish = () => {
            details.open = false;
            panel.style.height = '0px';
            panel.style.opacity = '';
            panel.style.transform = '';
            panel.style.overflow = '';
            animation = null;
          };
          return;
        }

        details.open = true;
        panel.style.height = '0px';
        animation = panel.animate([
          { height: '0px', opacity: 0, transform: 'translateY(-8px)' },
          { height: `${panel.scrollHeight}px`, opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 300,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        });

        animation.onfinish = () => {
          panel.style.height = 'auto';
          panel.style.opacity = '';
          panel.style.transform = '';
          panel.style.overflow = '';
          animation = null;
        };
      });
    });
  };

  const setupPolicyModal = () => {
    const modal = document.querySelector('[data-policy-modal]');
    if (!modal || modal.dataset.policyModalReady === 'true') return;

    const dialog = modal.querySelector('.policy-modal__dialog');
    const openButtons = document.querySelectorAll('[data-policy-modal-open]');
    const closeButtons = modal.querySelectorAll('[data-policy-modal-close]');
    const contents = modal.querySelectorAll('[data-policy-content]');
    let lastFocusedElement = null;
    let closeTimer = 0;

    const closeModal = () => {
      window.clearTimeout(closeTimer);
      modal.classList.remove('is-open');
      modal.classList.add('is-closing');
      document.body.classList.remove('has-policy-modal');
      closeTimer = window.setTimeout(() => {
        modal.hidden = true;
        modal.classList.remove('is-closing');
        if (lastFocusedElement) lastFocusedElement.focus();
      }, 260);
    };

    const openModal = (type, trigger) => {
      window.clearTimeout(closeTimer);
      lastFocusedElement = trigger;
      contents.forEach((content) => {
        content.hidden = content.dataset.policyContent !== type;
      });
      modal.hidden = false;
      modal.classList.remove('is-closing');
      document.body.classList.add('has-policy-modal');
      window.requestAnimationFrame(() => {
        modal.classList.add('is-open');
      });
      if (dialog) dialog.focus();
    };

    modal.dataset.policyModalReady = 'true';

    openButtons.forEach((button) => {
      button.addEventListener('click', () => {
        openModal(button.dataset.policyModalOpen, button);
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  };

  const updateActiveNav = (pathname) => {
    document.querySelectorAll('.site-nav__link').forEach((link) => {
      const linkPath = new URL(link.href, window.location.href).pathname;
      const isActive = linkPath === pathname || (linkPath !== '/' && pathname.startsWith(linkPath));
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const setupSectionScrollButtons = () => {
    document.querySelectorAll('.section-scroll-button').forEach((button) => {
      if (button.dataset.sectionScrollReady === 'true') return;
      button.dataset.sectionScrollReady = 'true';

      button.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = button.dataset.scrollTarget || button.getAttribute('href')?.replace('#', '');
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        window.history.replaceState(null, '', `#${targetId}`);
      });
    });
  };

  const setupBackToTop = () => {
    const button = document.querySelector('[data-back-to-top]');
    if (!button || button.dataset.backToTopReady === 'true') return;

    const updateVisibility = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight * 0.85;
      button.classList.toggle('is-visible', scrollBottom >= threshold && window.scrollY > 240);
    };

    button.dataset.backToTopReady = 'true';
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
  };

  const updateHead = (nextDocument) => {
    document.title = nextDocument.title;

    ['description', 'robots', 'theme-color'].forEach((name) => {
      const current = document.head.querySelector(`meta[name="${name}"]`);
      const next = nextDocument.head.querySelector(`meta[name="${name}"]`);
      if (current && next) current.setAttribute('content', next.getAttribute('content') || '');
    });

    const currentCanonical = document.head.querySelector('link[rel="canonical"]');
    const nextCanonical = nextDocument.head.querySelector('link[rel="canonical"]');
    if (currentCanonical && nextCanonical) currentCanonical.setAttribute('href', nextCanonical.getAttribute('href') || '');
  };

  const navigatePage = async (url, pushState = true) => {
    const currentMain = document.querySelector('#main-content');
    if (!currentMain) {
      window.location.href = url.href;
      return;
    }

    document.body.classList.add('is-leaving');

    try {
      const response = await fetch(url.href, { headers: { 'X-Requested-With': 'fetch' } });
      if (!response.ok) throw new Error('Navigation request failed');

      const html = await response.text();
      const nextDocument = new DOMParser().parseFromString(html, 'text/html');
      const nextMain = nextDocument.querySelector('#main-content');
      const currentFooter = document.querySelector('.site-footer');
      const nextFooter = nextDocument.querySelector('.site-footer');

      if (!nextMain) throw new Error('Main content missing');

      window.setTimeout(() => {
        currentMain.replaceWith(nextMain);
        if (currentFooter && nextFooter) currentFooter.replaceWith(nextFooter);

        document.body.className = nextDocument.body.className;
        document.body.classList.add('is-entering');
        updateHead(nextDocument);
        updateActiveNav(url.pathname);
        setupReveal();
        setupSmoothDetails();
        setupPolicyModal();
        setupSectionScrollButtons();
        setupBackToTop();
        window.scrollTo({ top: 0, behavior: 'auto' });

        if (pushState) {
          window.history.pushState({}, '', url.href);
        }

        window.setTimeout(() => {
          document.body.classList.remove('is-entering');
        }, 260);
      }, 160);
    } catch (error) {
      window.location.href = url.href;
    }
  };

  setupReveal();
  setupSmoothDetails();
  setupPolicyModal();
  setupSectionScrollButtons();
  setupBackToTop();

  if (!prefersReducedMotion) {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      const isSameOriginPage = url.origin === window.location.origin && url.pathname !== window.location.pathname;
      const opensNewContext = link.target && link.target !== '_self';

      if (!isSameOriginPage || opensNewContext || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      navigatePage(url);
    });
  }

  window.addEventListener('popstate', () => {
    navigatePage(new URL(window.location.href), false);
  });

  if (toggle && menu) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    };

    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (event.target.closest('.site-header')) return;
      closeMenu();
    });
  }

  if (!header) return;

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const HEADER_TOGGLE_OFFSET = 140;
  const WHEEL_INTENT_THRESHOLD = 180;
  let isHeaderMainHidden = false;
  let wheelIntentDirection = 0;
  let wheelIntentDistance = 0;

  const setHeaderMainHidden = (hidden) => {
    if (isHeaderMainHidden === hidden) return;
    isHeaderMainHidden = hidden;
    header.classList.toggle('site-header--main-hidden', hidden);
  };

  const normalizeWheelDelta = (event) => {
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
    return event.deltaY;
  };

  const addWheelIntent = (direction, distance) => {
    if (direction !== wheelIntentDirection) {
      wheelIntentDirection = direction;
      wheelIntentDistance = 0;
    }

    wheelIntentDistance += distance;
    return wheelIntentDistance;
  };

  const resetWheelIntent = () => {
    wheelIntentDirection = 0;
    wheelIntentDistance = 0;
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY <= HEADER_TOGGLE_OFFSET) {
      setHeaderMainHidden(false);
      resetWheelIntent();
    }
  }, { passive: true });

  if (prefersReducedMotion || !finePointer) return;

  window.addEventListener('wheel', (event) => {
    const wheelDistance = Math.abs(normalizeWheelDelta(event));

    if (wheelDistance >= 4) {
      const scrollingDown = event.deltaY > 0;
      const direction = scrollingDown ? 1 : -1;

      if (window.scrollY <= HEADER_TOGGLE_OFFSET) {
        setHeaderMainHidden(false);
        resetWheelIntent();
      } else {
        const intentDistance = addWheelIntent(direction, wheelDistance);

        if (scrollingDown && !isHeaderMainHidden && intentDistance >= WHEEL_INTENT_THRESHOLD) {
          setHeaderMainHidden(true);
          resetWheelIntent();
        }

        if (!scrollingDown && isHeaderMainHidden && intentDistance >= WHEEL_INTENT_THRESHOLD) {
          setHeaderMainHidden(false);
          resetWheelIntent();
        }
      }
    }
  }, { passive: true });
});
