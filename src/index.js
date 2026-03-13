/**
 * @fileoverview Main script for Pembimbing Andalus dashboard.
 * Handles data initialization, view toggling, searching, and grouping.
 */

/**
 * Manages the Pembimbing Andalus dashboard UI and data.
 */
class AndalusDashboard {
  /**
   * Initializes the dashboard.
   */
  constructor() {
    // DOM Elements
    this.tbody = document.querySelector('#dataTable tbody');
    this.cardContainer = document.getElementById('cardContainer');
    this.searchInput = document.getElementById('searchInput');
    this.viewBtns = document.querySelectorAll('.view-btn');
    this.groupSelect = document.getElementById('groupSelect');
    this.tableView = document.getElementById('tableView');
    this.cardView = document.getElementById('cardView');

    /** @type {Array<Object>} */
    this.dataItems = [];

    this.init();
  }

  /**
   * Initial setup of the dashboard.
   */
  init() {
    if (!this.tbody) return;

    // Check if SUPERVISORS data is loaded
    if (typeof SUPERVISORS === 'undefined') {
      console.error('SUPERVISORS data not found. Please check src/data.js');
      return;
    }

    // 1. Initialize Data & DOM Elements from SUPERVISORS
    this.dataItems = SUPERVISORS.map((item, index) => this.createDataItem(item, index));

    // 2. Initial Render
    this.updateStats();
    this.render('none');

    // 3. Setup Listeners
    this.setupEventListeners();
  }

  /**
   * Creates a data item object containing DOM elements and metadata.
   * @param {Object} item The raw supervisor data.
   * @param {number} index The index in the supervisors array.
   * @return {Object} The processed data item.
   */
  createDataItem(item, index) {
    const itemNo = index + 1;
    
    // We'll defer DOM creation to render time or first use for better initial load
    return {
      ...item,
      no: itemNo,
      row: null, // Lazy initialized
      card: null, // Lazy initialized
      searchText: `${item.task} ${item.name}`.toLowerCase(),
      category: item.asrama,
      index
    };
  }

  /**
   * Gets or creates the table row element for a data item.
   * @param {Object} item The data item.
   * @return {HTMLTableRowElement} The row element.
   */
  getTableRow(item) {
    if (item.row) return item.row;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="col-jabatan">
        <div class="cell-wrapper">
          <span class="text-content">${item.task}</span>
          <button class="btn-copy" data-copy="${item.task}" 
                  title="Salin Tugas" aria-label="Salin ${item.task}">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </td>
      <td class="col-nama">
        <div class="cell-wrapper">
          <span class="text-content">${item.name}</span>
          <button class="btn-copy" data-copy="${item.name}" 
                  title="Salin Nama" aria-label="Salin ${item.name}">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </td>
    `;

    row.classList.add('animate-in', 'stagger-item');
    row.style.setProperty('--item-index', item.index);
    
    item.row = row;
    return row;
  }

  /**
   * Gets or creates the card element for a data item.
   * @param {Object} item The data item.
   * @return {HTMLDivElement} The card element.
   */
  getCard(item) {
    if (item.card) return item.card;

    const card = document.createElement('div');
    card.className = 'pembimbing-card';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-asrama">${item.asrama}</span>
      </div>
      <div class="card-content">
        <p class="room-text">${item.task}</p>
        <div class="cell-wrapper">
          <span class="text-content name-text">${item.name}</span>
          <button class="btn-copy" data-copy="${item.name}" 
                  title="Salin Nama" aria-label="Salin nama ${item.name}">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </div>
    `;

    card.classList.add('animate-in', 'stagger-item');
    card.style.setProperty('--item-index', item.index);

    item.card = card;
    return card;
  }

  /**
   * Creates a wrapper element with text and a copy button.
   * @param {string} text The text to be displayed and copied.
   * @return {HTMLDivElement} The wrapper element.
   */
  createCellWrapper(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'cell-wrapper';

    const textSpan = document.createElement('span');
    textSpan.className = 'text-content';
    textSpan.textContent = text;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-copy';
    copyBtn.dataset.copy = text;
    copyBtn.title = 'Salin teks ini';
    copyBtn.setAttribute('aria-label', `Salin ${text}`);
    copyBtn.innerHTML = `
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
    `;

    wrapper.appendChild(textSpan);
    wrapper.appendChild(copyBtn);
    return wrapper;
  }

  /**
   * Updates the dashboard statistics with a counting-up animation.
   */
  updateStats() {
    const totalPembimbing = this.dataItems.length;
    const uniqueKamar = new Set(this.dataItems.map((item) => item.task)).size;

    this.animateCount('totalPembimbing', totalPembimbing);
    this.animateCount('totalKamar', uniqueKamar);
  }

  /**
   * Animates a number counting up using requestAnimationFrame for smoothness.
   * @param {string} id Element ID to update.
   * @param {number} target The target number.
   */
  animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el || target === 0) return;

    const duration = 1500; // ms
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Creates a group header element.
   * @param {string} text The header text.
   * @param {string} type The view type ('table' or 'card').
   * @param {number} count The number of items in the group.
   * @param {Array<Object>} items The items in the group.
   * @return {HTMLElement} The header element.
   */
  createGroupHeader(text, type, count, items) {
    const isTable = type === 'table';
    const header = document.createElement(isTable ? 'tr' : 'div');
    const groupId = `group-${text.replace(/\s+/g, '-').toLowerCase()}-${type}`;
    
    header.className = 'group-header';
    
    if (isTable) {
      header.innerHTML = `
        <td colspan="2">
          <button class="group-toggle-btn" 
                  aria-expanded="true" 
                  aria-controls="${groupId}">
            <span>${text}</span>
            <span style="opacity: 0.5; font-size: 0.8em;">(${count})</span>
          </button>
        </td>`;
    } else {
      header.innerHTML = `
        <button class="group-toggle-btn" 
                aria-expanded="true" 
                aria-controls="${groupId}">
          <span>${text} <span style="opacity: 0.5; font-size: 0.8em;">(${count})</span></span>
        </button>`;
    }

    const toggleBtn = header.querySelector('.group-toggle-btn');
    
    // Set IDs on items for aria-controls
    items.forEach((item, idx) => {
      const el = isTable ? this.getTableRow(item) : this.getCard(item);
      if (!el.id) {
        el.id = `${groupId}-item-${idx}`;
      }
    });

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      header.classList.toggle('collapsed');
      
      items.forEach((item) => {
        const el = isTable ? this.getTableRow(item) : this.getCard(item);
        el.classList.toggle('hidden');
      });
    });

    return header;
  }

  /**
   * Renders the view based on grouping mode using DocumentFragments.
   * @param {string} groupMode The grouping mode ('none' or 'category').
   */
  render(groupMode) {
    // Clear existing content efficiently
    while (this.tbody.firstChild) this.tbody.removeChild(this.tbody.firstChild);
    while (this.cardContainer.firstChild) this.cardContainer.removeChild(this.cardContainer.firstChild);
    
    // Remove group headers from DOM (they might be in cardContainer)
    document.querySelectorAll('.group-header').forEach(el => el.remove());

    const tableFragment = document.createDocumentFragment();
    const cardFragment = document.createDocumentFragment();

    if (groupMode === 'none') {
      this.dataItems.forEach((item) => {
        const row = this.getTableRow(item);
        const card = this.getCard(item);
        
        row.classList.add('group-item');
        card.classList.add('group-item');
        row.classList.remove('hidden');
        card.classList.remove('hidden');
        row.style.display = '';
        card.style.display = '';

        tableFragment.appendChild(row);
        cardFragment.appendChild(card);
      });
    } else {
      const groups = {};
      this.dataItems.forEach((item) => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
      });

      Object.keys(groups)
        .sort()
        .forEach((category) => {
          const items = groups[category];
          
          tableFragment.appendChild(
            this.createGroupHeader(category, 'table', items.length, items)
          );
          cardFragment.appendChild(
            this.createGroupHeader(category, 'card', items.length, items)
          );

          items.forEach((item) => {
            const row = this.getTableRow(item);
            const card = this.getCard(item);
            
            row.classList.add('group-item');
            card.classList.add('group-item');
            row.classList.remove('hidden');
            card.classList.remove('hidden');
            row.style.display = '';
            card.style.display = '';

            tableFragment.appendChild(row);
            cardFragment.appendChild(card);
          });
        });
    }

    this.tbody.appendChild(tableFragment);
    this.cardContainer.appendChild(cardFragment);

    // Trigger search to maintain filter state if any
    if (this.searchInput.value) {
      this.handleSearch(this.searchInput.value);
    }
  }

  /**
   * Handles searching through the data items.
   * @param {string} searchTerm The term to search for.
   */
  handleSearch(searchTerm) {
    const term = searchTerm.toLowerCase();
    let hasVisibleItem = false;

    // Remove existing no-results message
    const existingMsg = document.getElementById('no-results-global');
    if (existingMsg) existingMsg.remove();

    this.dataItems.forEach((item) => {
      const isVisible = item.searchText.includes(term);
      
      // Only modify DOM if elements exist
      if (item.row || item.card) {
        const row = this.getTableRow(item);
        const card = this.getCard(item);
        
        const displayStyle = isVisible ? '' : 'none';
        const cardDisplayStyle = isVisible ? 'flex' : 'none';

        if (term !== '') {
          row.style.display = displayStyle;
          card.style.display = cardDisplayStyle;
        } else {
          row.style.display = '';
          card.style.display = '';
        }
      }

      if (isVisible) hasVisibleItem = true;
    });

    // Hide group headers during search if they don't match (simplified)
    document.querySelectorAll('.group-header').forEach((header) => {
      header.style.display = term !== '' ? 'none' : '';
    });

    if (!hasVisibleItem) this.renderNoResults();
  }

  /**
   * Debounce utility for search input.
   * @param {Function} func The function to debounce.
   * @param {number} wait Delay in ms.
   * @return {Function} The debounced function.
   */
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Renders the "No Results" message with archival editorial styling.
   */
  renderNoResults() {
    const noResultMsg = document.createElement('div');
    noResultMsg.id = 'no-results-global';
    noResultMsg.className = 'no-results-message animate-in';
    noResultMsg.innerHTML = `
      <h3>Arsip Tidak Ditemukan</h3>
      <p>Pencarian Anda tidak membuahkan hasil dalam basis data kami. Silakan periksa kembali kata kunci atau gunakan istilah yang lebih umum.</p>
      <div style="margin-top: 40px; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; opacity: 0.3;">
        ERROR_CODE: 404_DATA_NOT_FOUND
      </div>
    `;

    const activeContainer = this.tableView.classList.contains('active')
      ? this.tbody
      : this.cardContainer;
    activeContainer.appendChild(noResultMsg);
  }

  /**
   * Toggles between table and card view with tactile feedback.
   * @param {string} viewMode The target view mode ('table' or 'card').
   */
  toggleView(viewMode) {
    const switcher = document.querySelector('.view-switcher');
    
    if (viewMode === 'table') {
      this.tableView.classList.add('active');
      this.cardView.classList.remove('active');
      
      document.getElementById('showTable').classList.add('active');
      document.getElementById('showTable').setAttribute('aria-checked', 'true');
      document.getElementById('showCard').classList.remove('active');
      document.getElementById('showCard').setAttribute('aria-checked', 'false');
      
      if (switcher) switcher.style.setProperty('--switch-pos', '0%');
    } else {
      this.cardView.classList.add('active');
      this.tableView.classList.remove('active');
      
      document.getElementById('showCard').classList.add('active');
      document.getElementById('showCard').setAttribute('aria-checked', 'true');
      document.getElementById('showTable').classList.remove('active');
      document.getElementById('showTable').setAttribute('aria-checked', 'false');
      
      if (switcher) switcher.style.setProperty('--switch-pos', '100%');
    }

    // Fix: Re-render no results message in the new container if needed
    const existingMsg = document.getElementById('no-results-global');
    if (existingMsg) {
      existingMsg.remove();
      this.renderNoResults();
    }
  }

  /**
   * Sets up event listeners for the dashboard.
   */
  setupEventListeners() {
    // Search Input - Debounced for performance
    const debouncedSearch = this.debounce((value) => {
      this.handleSearch(value);
    }, 150);

    this.searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });

    // View Toggle Buttons (Segmented)
    this.viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.id === 'showTable' ? 'table' : 'card';
        this.toggleView(mode);
      });
    });

    // Group Select
    this.groupSelect.addEventListener('change', (e) => {
      this.render(e.target.value);
    });

    // Copy Button (Event Delegation)
    document.addEventListener('click', async (e) => {
      const btn = e.target?.closest('.btn-copy');
      if (!btn) return;

      const textToCopy = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="square" stroke-linejoin="arcs"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        btn.classList.add('copied');

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }
}

// Initialize the dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AndalusDashboard();
});
