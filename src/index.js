/**
 * @fileoverview Main script for Pembimbing Andalus dashboard.
 * Handles data initialization, view toggling, searching, and grouping.
 */

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('#dataTable tbody');
  const searchInput = document.getElementById('searchInput');
  const viewToggleBtn = document.getElementById('viewToggle');
  const groupSelect = document.getElementById('groupSelect');
  const tableView = document.getElementById('tableView');
  const cardView = document.getElementById('cardView');
  const cardContainer = document.getElementById('cardContainer');

  if (!tbody) return;

  // Check if SUPERVISORS data is loaded
  if (typeof SUPERVISORS === 'undefined') {
    console.error('SUPERVISORS data not found. Please check src/data.js');
    return;
  }

  /** @type {Array<Object>} */
  const dataItems = [];

  /**
   * Creates a wrapper element with text and a copy button.
   * @param {string} text The text to be displayed and copied.
   * @return {HTMLDivElement} The wrapper element.
   */
  const createCellWrapper = (text) => {
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
  };

  /**
   * Determines the category of a task based on its name.
   * @param {string} task The task name.
   * @return {string} The category name.
   */
  const getCategory = (task) => {
    const t = task.toLowerCase();
    if (t.includes('bahasa')) return 'Kamar Bahasa';
    if (t.includes('tahfidz')) return 'Kamar Tahfidz';
    if (t.includes('imam')) return 'Kamar Imam (Kitab)';
    if (t.includes('ibnu')) return 'Kamar Ibnu (Kitab)';
    if (t.includes('abu daud')) return 'Kamar Abu Daud';
    if (t.includes('granada')) return 'Kamar Granada (PDF)';
    if (t.includes('deza')) return 'Kamar Deza';
    return 'Lainnya';
  };

  /**
   * Updates the dashboard statistics.
   */
  const updateStats = () => {
    const totalPembimbing = dataItems.length;
    const uniqueKamar = new Set(dataItems.map((item) => item.task)).size;

    document.getElementById('totalPembimbing').textContent = totalPembimbing;
    document.getElementById('totalKamar').textContent = uniqueKamar;
  };

  /**
   * Creates a group header element.
   * @param {string} text The header text.
   * @param {string} type The view type ('table' or 'card').
   * @param {number} count The number of items in the group.
   * @param {Array<Object>} items The items in the group.
   * @return {HTMLElement} The header element.
   */
  const createGroupHeader = (text, type, count, items) => {
    const header = document.createElement(type === 'table' ? 'tr' : 'div');
    header.className = 'group-header';
    header.innerHTML = type === 'table' ?
        `<td colspan="3">${text} (${count})</td>` :
        `<span>${text} (${count})</span>`;

    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      items.forEach((item) => {
        if (type === 'table') {
          item.row.classList.toggle('hidden');
        } else {
          item.card.classList.toggle('hidden');
        }
      });
    });
    return header;
  };

  /**
   * Renders the "No Results" message.
   */
  const renderNoResults = () => {
    const existingMsg = document.getElementById('no-results-global');
    if (existingMsg) existingMsg.remove();

    const noResultMsg = document.createElement('div');
    noResultMsg.id = 'no-results-global';
    noResultMsg.style.cssText =
        'text-align:center; padding: 40px; width: 100%; color: #999; ' +
        'grid-column: 1/-1;';
    noResultMsg.innerText = 'Hasil tidak ditemukan.';

    const activeContainer = tableView.classList.contains('active') ?
        tbody : cardContainer;
    activeContainer.appendChild(noResultMsg);
  };

  // 1. Initialize Data & DOM Elements from SUPERVISORS
  SUPERVISORS.forEach((item) => {
    // Create Table Row
    const row = document.createElement('tr');
    
    const cellNo = document.createElement('td');
    cellNo.className = 'col-no';
    cellNo.textContent = item.no;
    
    const cellTask = document.createElement('td');
    cellTask.className = 'col-jabatan';
    cellTask.appendChild(createCellWrapper(item.task));
    
    const cellName = document.createElement('td');
    cellName.className = 'col-nama';
    cellName.appendChild(createCellWrapper(item.name));
    
    row.appendChild(cellNo);
    row.appendChild(cellTask);
    row.appendChild(cellName);

    // Create Card Element
    const card = document.createElement('div');
    card.className = 'pembimbing-card';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-no">#${item.no}</span>
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

    dataItems.push({
      no: item.no,
      task: item.task,
      name: item.name,
      row,
      card,
      searchText: `${item.task} ${item.name}`.toLowerCase(),
      category: getCategory(item.task),
    });
  });

  updateStats();

  /**
   * Renders the view based on grouping mode.
   * @param {string} groupMode The grouping mode ('none' or 'category').
   */
  const renderView = (groupMode) => {
    tbody.innerHTML = '';
    cardContainer.innerHTML = '';
    document.querySelectorAll('.group-header').forEach((el) => el.remove());

    if (groupMode === 'none') {
      dataItems.forEach((item) => {
        tbody.appendChild(item.row);
        cardContainer.appendChild(item.card);
        item.row.classList.remove('group-item', 'hidden');
        item.card.classList.remove('group-item', 'hidden');
        item.row.style.display = '';
        item.card.style.display = '';
      });
    } else {
      const groups = {};
      dataItems.forEach((item) => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
      });

      Object.keys(groups).sort().forEach((category) => {
        const items = groups[category];
        tbody.appendChild(createGroupHeader(category, 'table',
            items.length, items));
        cardContainer.appendChild(createGroupHeader(category, 'card',
            items.length, items));

        items.forEach((item) => {
          item.row.classList.add('group-item');
          item.card.classList.add('group-item');
          tbody.appendChild(item.row);
          cardContainer.appendChild(item.card);
        });
      });
    }
    searchInput.dispatchEvent(new Event('input'));
  };

  renderView('none');

  // 3. Event Listener: Group Select
  if (groupSelect) {
    groupSelect.addEventListener('change', (e) => {
      renderView(e.target.value);
    });
  }

  // 4. Search Logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      let hasVisibleItem = false;

      const existingMsg = document.getElementById('no-results-global');
      if (existingMsg) existingMsg.remove();

      dataItems.forEach((item) => {
        const isVisible = item.searchText.includes(searchTerm);
        const displayStyle = isVisible ? '' : 'none';
        const cardDisplayStyle = isVisible ? 'flex' : 'none';

        if (item.row.classList.contains('hidden') && searchTerm === '') {
          item.row.style.display = '';
          item.card.style.display = '';
        } else {
          item.row.style.display = displayStyle;
          item.card.style.display = cardDisplayStyle;
        }

        if (isVisible) hasVisibleItem = true;
      });

      document.querySelectorAll('.group-header').forEach((header) => {
        header.style.display = searchTerm !== '' ? 'none' : '';
      });

      if (!hasVisibleItem) renderNoResults();
    });
  }

  // 5. View Toggler
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
      const isTableActive = tableView.classList.contains('active');

      if (isTableActive) {
        tableView.classList.remove('active');
        cardView.classList.add('active');
        viewToggleBtn.innerHTML = '📊 Mode Tabel';
      } else {
        cardView.classList.remove('active');
        tableView.classList.add('active');
        viewToggleBtn.innerHTML = '🗂️ Mode Kartu';
      }

      const noResultMsg = document.getElementById('no-results-global');
      if (noResultMsg) renderNoResults();
    });
  }

  // 6. Event Delegation (Copy)
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
});
