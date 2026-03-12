document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#dataTable tbody");
  const searchInput = document.getElementById("searchInput");
  const viewToggleBtn = document.getElementById("viewToggle");
  const groupSelect = document.getElementById("groupSelect");
  const tableView = document.getElementById("tableView");
  const cardView = document.getElementById("cardView");
  const cardContainer = document.getElementById("cardContainer");

  if (!tbody) return;

  // Store original data
  const originalRows = Array.from(tbody.querySelectorAll("tr"));
  const dataItems = [];

  // Helper: Buat Cell Wrapper untuk Copy
  const createCellWrapper = (text) => {
    const wrapper = document.createElement("div");
    wrapper.className = "cell-wrapper";

    const textSpan = document.createElement("span");
    textSpan.className = "text-content";
    textSpan.textContent = text;

    const copyBtn = document.createElement("button");
    copyBtn.className = "btn-copy";
    copyBtn.dataset.copy = text;
    copyBtn.title = "Salin teks ini";
    copyBtn.innerHTML = "📄 Salin";

    wrapper.appendChild(textSpan);
    wrapper.appendChild(copyBtn);
    return wrapper;
  };

  // 1. Inisialisasi Data & Elemen Kartu
  originalRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const no = cells[0].innerText;
    const tugas = cells[1].innerText.trim();
    const nama = cells[2].innerText.trim();

    // Update Tabel dengan Wrapper Copy (Modifikasi DOM asli)
    cells[1].innerHTML = "";
    cells[1].appendChild(createCellWrapper(tugas));
    cells[2].innerHTML = "";
    cells[2].appendChild(createCellWrapper(nama));

    // Buat Elemen Kartu
    const card = document.createElement("div");
    card.className = "pembimbing-card";
    card.innerHTML = `
            <div class="card-header">
                <span class="card-no">#${no}</span>
            </div>
            <div class="card-content">
                <h3>Tugas / Kamar</h3>
                <p>${tugas}</p>
            </div>
            <div class="card-footer">
                <div>
                    <span class="label">Nama Pembimbing</span>
                    <div class="cell-wrapper">
                        <span class="text-content" style="font-weight:600">${nama}</span>
                        <button class="btn-copy" data-copy="${nama}" title="Salin Nama">📄 Salin</button>
                    </div>
                </div>
            </div>
        `;

    dataItems.push({
      no,
      tugas,
      nama,
      row,
      card,
      searchText: `${tugas} ${nama}`.toLowerCase(),
      category: getCategory(tugas),
    });
  });

  // 1b. Update Statistik Dashboard
  const updateStats = () => {
    const totalPembimbing = dataItems.length;
    const uniqueKamar = new Set(dataItems.map((item) => item.tugas)).size;

    document.getElementById("totalPembimbing").textContent = totalPembimbing;
    document.getElementById("totalKamar").textContent = uniqueKamar;
  };
  updateStats();

  // Helper: Kategori Sederhana
  function getCategory(tugas) {
    const t = tugas.toLowerCase();
    if (t.includes("bahasa")) return "Kamar Bahasa";
    if (t.includes("tahfidz")) return "Kamar Tahfidz";
    if (t.includes("imam")) return "Kamar Imam (Kitab)";
    if (t.includes("ibnu")) return "Kamar Ibnu (Kitab)";
    if (t.includes("abu daud")) return "Kamar Abu Daud";
    if (t.includes("granada")) return "Kamar Granada (PDF)";
    if (t.includes("deza")) return "Kamar Deza";
    return "Lainnya";
  }

  // 2. Fungsi Render (Grouping & No-Grouping)
  function renderView(groupMode) {
    // Kosongkan container
    tbody.innerHTML = "";
    cardContainer.innerHTML = "";

    // Hapus header lama jika ada
    document.querySelectorAll(".group-header").forEach((el) => el.remove());

    if (groupMode === "none") {
      dataItems.forEach((item) => {
        tbody.appendChild(item.row);
        cardContainer.appendChild(item.card);
        // Reset visibility (kecuali jika sedang dicari, akan dihandle search listener)
        item.row.classList.remove("group-item", "hidden");
        item.card.classList.remove("group-item", "hidden");
      });
    } else {
      // Grouping Logic
      const groups = {};
      dataItems.forEach((item) => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
      });

      // Sort category keys explicitly if needed, or just standard object iteration
      Object.keys(groups)
        .sort()
        .forEach((category) => {
          const items = groups[category];

          // Buat Header
          const createHeader = (text, type) => {
            const header = document.createElement(
              type === "table" ? "tr" : "div",
            );
            header.className = "group-header";
            header.innerHTML =
              type === "table"
                ? `<td colspan="3">${text} (${items.length})</td>`
                : `<span>${text} (${items.length})</span>`;

            // Accordion Event
            header.addEventListener("click", () => {
              header.classList.toggle("collapsed");
              items.forEach((item) => {
                if (type === "table") item.row.classList.toggle("hidden");
                else item.card.classList.toggle("hidden");
              });
            });
            return header;
          };

          tbody.appendChild(createHeader(category, "table"));
          cardContainer.appendChild(createHeader(category, "card"));

          items.forEach((item) => {
            item.row.classList.add("group-item");
            item.card.classList.add("group-item");
            tbody.appendChild(item.row);
            cardContainer.appendChild(item.card);
          });
        });
    }
    // Re-apply search filter
    searchInput.dispatchEvent(new Event("input"));
  }

  // Initial Render (Card container needs population)
  renderView("none");

  // 3. Event Listener: Group Select
  if (groupSelect) {
    groupSelect.addEventListener("change", (e) => {
      renderView(e.target.value);
    });
  }

  // 4. Logika Pencarian
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      let hasVisibleItem = false;

      // Reset "No Results" msg
      const existingMsg = document.getElementById("no-results-global");
      if (existingMsg) existingMsg.remove();

      dataItems.forEach((item) => {
        const isVisible = item.searchText.includes(searchTerm);

        // Handle visibility while respecting group collapse state?
        // Simplification: Search expands everything or works independently.
        // For now: Just toggle display property, but we must check if parent group is collapsed.
        // Better: Search overrides collapse.

        const displayStyle = isVisible ? "" : "none";
        const cardDisplayStyle = isVisible ? "flex" : "none";

        // Check if currently hidden by group (class 'hidden')
        // If searching, we usually want to show matches regardless of group state.
        // But let's respect group structure if visible.

        if (item.row.classList.contains("hidden") && searchTerm === "") {
          // Keep hidden if grouped-collapsed and no search
          item.row.style.display = ""; // Reset inline style, let class handle it
          item.card.style.display = "";
        } else {
          item.row.style.display = displayStyle;
          item.card.style.display = cardDisplayStyle;
        }

        if (isVisible) hasVisibleItem = true;
      });

      // Handle Headers Visibility during Search
      const headers = document.querySelectorAll(".group-header");
      headers.forEach((header) => {
        // If search is active, maybe hide headers? Or show only if children visible?
        // Simple approach: Show header if at least one child is visible
        if (searchTerm !== "") {
          header.style.display = "none"; // Hide headers during search for cleaner view
        } else {
          header.style.display = ""; // Show headers when not searching
        }
      });

      // Notifikasi "Tidak Ditemukan"
      if (!hasVisibleItem) {
        const noResultMsg = document.createElement("div");
        noResultMsg.id = "no-results-global";
        noResultMsg.style.cssText =
          "text-align:center; padding: 40px; width: 100%; color: #999; grid-column: 1/-1;";
        noResultMsg.innerText = "Hasil tidak ditemukan.";

        const activeContainer = tableView.classList.contains("active")
          ? tbody
          : cardContainer;
        activeContainer.appendChild(noResultMsg);
      }
    });
  }

  // 5. View Toggler
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener("click", () => {
      const isTableActive = tableView.classList.contains("active");

      if (isTableActive) {
        tableView.classList.remove("active");
        cardView.classList.add("active");
        viewToggleBtn.innerHTML = "📊 Mode Tabel";
      } else {
        cardView.classList.remove("active");
        tableView.classList.add("active");
        viewToggleBtn.innerHTML = "🗂️ Mode Kartu";
      }

      // Move "No Results" msg if exists
      const noResultMsg = document.getElementById("no-results-global");
      if (noResultMsg) {
        const activeContainer = tableView.classList.contains("active")
          ? tbody
          : cardContainer;
        activeContainer.appendChild(noResultMsg);
      }
    });
  }

  // 6. Event Delegation (Copy)
  document.addEventListener("click", async (e) => {
    const btn = e.target?.closest(".btn-copy");
    if (!btn) return;

    const textToCopy = btn.dataset.copy;

    try {
      await navigator.clipboard.writeText(textToCopy);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = "✅ Tersalin!";
      btn.classList.add("copied");

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove("copied");
      }, 2000);
    } catch (err) {
      alert("Gagal menyalin teks.");
    }
  });
});
