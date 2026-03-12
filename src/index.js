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
    this.viewToggleBtn = document.getElementById('viewToggle');
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
    const row = this.createTableRow(item, itemNo);
    const card = this.createCard(item, itemNo);

    return {
      ...item,
      no: itemNo,
      row,
      card,
      searchText: `${item.task} ${item.name}`.toLowerCase(),
      category: item.asrama, // Use asrama as the primary category
    };
  }

  /**
   * Creates a table row element for a supervisor.
   * @param {Object} item The supervisor data.
   * @param {number} no The display number.
   * @return {HTMLTableRowElement} The created row.
   */
  createTableRow(item, no) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="col-no">${no}</td>
      <td class="col-jabatan"></td>
      <td class="col-nama"></td>
    `;

    const cellTask = row.querySelector('.col-jabatan');
    const cellName = row.querySelector('.col-nama');

    cellTask.appendChild(this.createCellWrapper(item.task));
    cellName.appendChild(this.createCellWrapper(item.name));

    return row;
  }

  /**
   * Creates a card element for a supervisor.
   * @param {Object} item The supervisor data.
   * @param {number} no The display number.
   * @return {HTMLDivElement} The created card.
   */
  createCard(item, no) {
    const card = document.createElement('div');
    card.className = 'pembimbing-card';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-no">#${no}</span>
        <span class="card-asrama">${item.asrama}</span>
      </div>
      <div class="card-content">
        <h3>Tugas / Kamar</h3>
        <p>${item.task}</p>
      </div>
      <div class="card-footer">
        <div>
          <span class="label">Nama Pembimbing</span>
          <div class="cell-wrapper">
            <span class="text-content" style="font-weight:600">${item.name}</span>
            <button class="btn-copy" data-copy="${item.name}" 
                    title="Salin Nama">📄 Salin</button>
          </div>
        </div>
      </div>
    `;
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
    copyBtn.innerHTML = '📄 Salin';

    wrapper.appendChild(textSpan);
    wrapper.appendChild(copyBtn);
    return wrapper;
  }

  /**
   * Updates the dashboard statistics.
   */
  updateStats() {
    const totalPembimbing = this.dataItems.length;
    const uniqueKamar = new Set(this.dataItems.map((item) => item.task)).size;

    document.getElementById('totalPembimbing').textContent = totalPembimbing;
    document.getElementById('totalKamar').textContent = uniqueKamar;
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
    const header = document.createElement(type === 'table' ? 'tr' : 'div');
    header.className = 'group-header';
    header.innerHTML =
      type === 'table'
        ? `<td colspan="3">Asrama ${text} (${count})</td>`
        : `<span>Asrama ${text} (${count})</span>`;

    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      items.forEach((item) => {
        const el = type === 'table' ? item.row : item.card;
        el.classList.toggle('hidden');
      });
    });
    return header;
  }

  /**
   * Renders the view based on grouping mode.
   * @param {string} groupMode The grouping mode ('none' or 'category').
   */
  render(groupMode) {
    this.tbody.innerHTML = '';
    this.cardContainer.innerHTML = '';
    document.querySelectorAll('.group-header').forEach((el) => el.remove());

    if (groupMode === 'none') {
      this.dataItems.forEach((item) => {
        this.tbody.appendChild(item.row);
        this.cardContainer.appendChild(item.card);
        item.row.classList.remove('group-item', 'hidden');
        item.card.classList.remove('group-item', 'hidden');
        item.row.style.display = '';
        item.card.style.display = '';
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
          this.tbody.appendChild(
            this.createGroupHeader(category, 'table', items.length, items)
          );
          this.cardContainer.appendChild(
            this.createGroupHeader(category, 'card', items.length, items)
          );

          items.forEach((item) => {
            item.row.classList.add('group-item');
            item.card.classList.add('group-item');
            this.tbody.appendChild(item.row);
            this.cardContainer.appendChild(item.card);
          });
        });
    }

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
      const displayStyle = isVisible ? '' : 'none';
      const cardDisplayStyle = isVisible ? 'flex' : 'none';

      // If grouped and search is empty, respect the collapsed state
      if (item.row.classList.contains('hidden') && term === '') {
        item.row.style.display = '';
        item.card.style.display = '';
      } else {
        item.row.style.display = displayStyle;
        item.card.style.display = cardDisplayStyle;
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
   * Renders the "No Results" message.
   */
  renderNoResults() {
    const noResultMsg = document.createElement('div');
    noResultMsg.id = 'no-results-global';
    noResultMsg.className = 'no-results-message';
    noResultMsg.style.cssText =
      'text-align:center; padding: 40px; width: 100%; color: #999; ' +
      'grid-column: 1/-1;';
    noResultMsg.innerText = 'Hasil tidak ditemukan.';

    const activeContainer = this.tableView.classList.contains('active')
      ? this.tbody
      : this.cardContainer;
    activeContainer.appendChild(noResultMsg);
  }

  /**
   * Toggles between table and card view.
   */
  toggleView() {
    const isTableActive = this.tableView.classList.contains('active');

    if (isTableActive) {
      this.tableView.classList.remove('active');
      this.cardView.classList.add('active');
      this.viewToggleBtn.innerHTML = '📊 Mode Tabel';
    } else {
      this.cardView.classList.remove('active');
      this.tableView.classList.add('active');
      this.viewToggleBtn.innerHTML = '🗂️ Mode Kartu';
    }

    if (document.getElementById('no-results-global')) {
      this.renderNoResults();
    }
  }

  /**
   * Sets up event listeners for the dashboard.
   */
  setupEventListeners() {
    // Search Input
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // View Toggle Button
    this.viewToggleBtn.addEventListener('click', () => {
      this.toggleView();
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
        btn.innerHTML = '✅ Tersalin!';
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
