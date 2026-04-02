/* ============================================================
   智能体进化平台 – 交互逻辑
   ============================================================ */

(function () {
  'use strict';

  const mainLayout = document.querySelector('.main-layout');

  // ── Group mapping: which groups should co-highlight ──
  // When hovering an element with data-group X, also highlight
  // any elements whose data-group is in linkedGroups[X].
  const linkedGroups = {
    'ext-L3':         ['ext-L3'],          // left bar 1 ↔ external L3
    'ext-L2':         ['ext-L2'],          // left bar 2 ↔ external L2
    'ext-L4':         ['ext-L4'],          // left bar 3 ↔ external L4
    'ext-researcher': ['ext-researcher'],  // left bar 4 ↔ external researcher
    'ext-title':      ['ext-title'],
    'ext-L1':         ['ext-L1'],
    'ext-L5':         ['ext-L5'],
    'int-title':      ['int-title'],
    'int-L1':         ['int-L1'],
    'int-L2':         ['int-L2'],
    'int-L3':         ['int-L3'],
    'int-L4':         ['int-L4'],
    'int-L5':         ['int-L5'],
    'int-researcher': ['int-researcher'],
  };

  // Migration arrows link both ext and int layers
  const migrationLinks = {
    'L1': ['ext-L1', 'int-L1'],
    'L2': ['ext-L2', 'int-L2'],
    'L3': ['ext-L3', 'int-L3'],
    'L4': ['ext-L4', 'int-L4'],
    'L5': ['ext-L5', 'int-L5'],
  };

  // Collect all interactive elements
  const groupEls = document.querySelectorAll('[data-group]');
  const migrateEls = document.querySelectorAll('[data-migrate]');

  function highlightGroup(groups) {
    mainLayout.classList.add('dimmed');
    groups.forEach(g => {
      document.querySelectorAll(`[data-group="${g}"]`).forEach(el => {
        el.classList.add('highlight');
      });
    });
  }

  function clearAll() {
    mainLayout.classList.remove('dimmed');
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
  }

  // Attach listeners to data-group elements
  groupEls.forEach(el => {
    const group = el.dataset.group;
    const linked = linkedGroups[group] || [group];

    el.addEventListener('mouseenter', () => {
      clearAll();
      highlightGroup(linked);
    });
    el.addEventListener('mouseleave', () => {
      clearAll();
    });
  });

  // Attach listeners to migration arrows
  migrateEls.forEach(el => {
    const layer = el.dataset.migrate;
    const linked = migrationLinks[layer] || [];

    el.addEventListener('mouseenter', () => {
      clearAll();
      el.classList.add('highlight');
      highlightGroup(linked);
    });
    el.addEventListener('mouseleave', () => {
      clearAll();
    });
  });

  // ── Action tags inside researchers ──
  // Hovering an action tag highlights its target group
  document.querySelectorAll('.action-tag[data-action-target]').forEach(tag => {
    const target = tag.dataset.actionTarget;

    tag.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      clearAll();
      highlightGroup([target]);
      // also highlight the parent researcher
      const researcher = tag.closest('.researcher');
      if (researcher) researcher.classList.add('highlight');
    });
    tag.addEventListener('mouseleave', () => {
      clearAll();
    });
  });

})();
