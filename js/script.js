// Đợi cho toàn bộ giao diện HTML tải xong mới chạy code JS
document.addEventListener("DOMContentLoaded", function () {
    
    /* ==========================================================================
       1. XỬ LÝ POPUP ĐĂNG NHẬP (DÙNG CHO TRANG CHỦ)
       ========================================================================== */
    const modal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.getElementById("closeBtn");

    // Nếu tồn tại nút Đăng nhập trên trang thì mới gán sự kiện
    if (loginBtn && modal) {
        // Mở popup khi click vào chữ Đăng Nhập trên Menu
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Ngăn trang web nhảy trang hoặc cuộn lên đầu
            modal.style.display = "flex";
        });

        // Đóng popup khi click vào dấu X
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                modal.style.display = "none";
            });
        }

        // Đóng popup khi click ra ngoài vùng form đăng nhập
        window.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Xử lý khi người dùng nhấn nút "Vào hệ thống" trong Form Đăng nhập
    const loginForm = document.querySelector("#loginModal form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn load lại trang
            const email = loginForm.querySelector("input[type='email']").value;
            
            alert(`Chào mừng thành viên ${email} đã đăng nhập thành công!`);
            modal.style.display = "none"; // Ẩn popup đi
            
            // Đổi chữ "Đăng Nhập" trên menu thành "Tài Khoản"
            if (loginBtn) loginBtn.textContent = "Tài Khoản";
        });
    }


    /* ==========================================================================
       2. XỬ LÝ THÊM BÌNH LUẬN ĐỘNG (DÙNG CHO TRANG CHI TIẾT)
       ========================================================================== */
    const commentForm = document.querySelector(".comment-form");
    const commentList = document.querySelector(".comment-list");

    if (commentForm && commentList) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn trình duyệt load lại trang khi gửi form

            const textarea = commentForm.querySelector("textarea");
            const commentText = textarea.value.trim(); // Lấy nội dung bình luận và xóa khoảng trắng thừa

            if (commentText === "") {
                alert("Vui lòng nhập nội dung phản hồi trước khi gửi!");
                return;
            }

            // Tạo một khối div mới cho bình luận vừa nhập
            const newComment = document.createElement("div");
            newComment.classList.add("comment-item");
            
            // Chèn cấu trúc HTML chứa tên người dùng (mặc định Bạn) và nội dung bình luận
            newComment.innerHTML = `
                <strong style="color: #ff3366;">Bạn (Vừa xong):</strong>
                <p style="font-size: 14px; margin-top: 5px;">${commentText}</p>
            `;

            // Đưa bình luận mới lên đầu danh sách bình luận cũ
            commentList.insertBefore(newComment, commentList.firstChild);

            // Xóa sạch nội dung trong ô nhập liệu sau khi gửi thành công
            textarea.value = "";
            alert("Bình luận của bạn đã được hiển thị công khai!");
        });
    }


    /* ==========================================================================
       3. TỰ ĐỘNG ĐỔI CÁC LINK LIÊN QUAN (MÔ PHỎNG SỰ KIỆN CLICK BÀI VIẾT)
       ========================================================================== */
    const relatedLinks = document.querySelectorAll(".related-links a");
    relatedLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            // Nếu link chưa có trang thật (đang để dấu #), mô phỏng tải bài viết mới
            if(this.getAttribute("href") === "#") {
                e.preventDefault();
                alert(`Hệ thống đang chuyển hướng bạn sang bài viết: "${this.innerText}"`);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn mượt lên đầu trang
            }
        });
    });
});