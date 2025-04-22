document.getElementById("close-banner-btn").addEventListener("click", function() {
    const banner = document.getElementById("cookie-banner");
    banner.style.display = "none"; // Ẩn thanh tác vụ
  });
  // ========= Chuyển hướng khi click vào logo =========
  document.getElementById("logo").addEventListener("click", function () {
    window.location.href = "index.html"; // Điều chỉnh URL nếu cần
  });

  // ========= Hàm hiển thị/ẩn Modal =========
  function showModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
  }
  function hideModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  // ========= Sự kiện cho nút Đăng ký & Đăng nhập =========
  document
    .getElementById("register-btn")
    .addEventListener("click", () => showModal("register-modal"));
  document
    .getElementById("login-btn")
    .addEventListener("click", () => showModal("login-modal"));
  document
    .getElementById("close-register-modal")
    .addEventListener("click", () => hideModal("register-modal"));
  document
    .getElementById("close-login-modal")
    .addEventListener("click", () => hideModal("login-modal"));

  // ========= Form Đăng ký & Đăng nhập (giả lập) =========
  document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Đăng ký thành công!");
    hideModal("register-modal");
    // Sau khi đăng ký, bạn có thể tự động đăng nhập:
    showUserMenu();
  });
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Đăng nhập thành công!");
    hideModal("login-modal");
    showUserMenu();
  });

  // ========= Hàm chuyển đổi giao diện khi đăng nhập thành công =========
  function showUserMenu() {
    // Ẩn nút đăng ký & đăng nhập
    document.getElementById("register-btn").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
    // Hiển thị User Menu (nút icon người dùng)
    document.getElementById("user-menu").classList.remove("hidden");
  }

  // ========= Xử lý dropdown menu cho User Menu =========
  document.getElementById("user-btn").addEventListener("click", function () {
    const dropdown = document.getElementById("user-dropdown");
    dropdown.classList.toggle("hidden");
  });

  // ========= Cookie Banner: Ẩn khi nhấn nút "Đã hiểu" =========
  document.getElementById("close-banner-btn").addEventListener("click", function () {
    document.getElementById("cookie-banner").style.display = "none";
  });

  // ========= Modal cho Cookie Policy =========
  document.getElementById("cookie-policy-link").addEventListener("click", function (e) {
    e.preventDefault();
    showModal("cookie-modal");
  });
  document.getElementById("close-cookie-modal").addEventListener("click", function () {
    hideModal("cookie-modal");
  });

  // ========= Lọc game =========
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const gameItems = Array.from(document.querySelectorAll(".game-item"));

  function filterGames() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Tìm nút active, nếu chưa có thì mặc định là "all"
    const activeBtn = document.querySelector(".filter-btn.active");
    const categoryFilter = activeBtn ? activeBtn.dataset.category.toLowerCase() : "all";

    gameItems.forEach((item) => {
      const title = item.dataset.title.toLowerCase();
      const categories = item.dataset.category.toLowerCase();
      const matchSearch = title.includes(searchTerm);
      let matchCategory = false;
      if (categoryFilter === "all" || categoryFilter === "tat-ca") {
        matchCategory = true;
      } else {
        matchCategory = categories.includes(categoryFilter);
      }
      item.style.display = matchSearch && matchCategory ? "block" : "none";
    });
  }

  searchInput.addEventListener("input", filterGames);
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterGames();
    });
  });

  // ========= Nút "Game Mới": Khi click sẽ refresh lại trang =========
  document.getElementById("new-game-btn").addEventListener("click", function () {
    window.location.reload();
  });

  // ========= Nút "Thể loại": Hiển thị modal chọn thể loại =========
  document.getElementById("category-btn").addEventListener("click", function () {
    showModal("category-modal");
  });
  document.getElementById("close-category-modal").addEventListener("click", function () {
    hideModal("category-modal");
  });

  // ========= Hiển thị tên game cho từng game trong grid =========
  // Sau khi trang được tải xong, duyệt qua tất cả game-item và chèn phần tên
  document.addEventListener("DOMContentLoaded", function () {
    gameItems.forEach((item) => {
      // Kiểm tra nếu phần hiển thị tên chưa tồn tại để tránh trùng lặp
      if (!item.querySelector(".game-title")) {
        const titleElement = document.createElement("div");
        titleElement.className = "game-title text-center mt-1 text-sm font-medium";
        titleElement.innerText = item.dataset.title;
        item.appendChild(titleElement);
      }
    });
  }); 
