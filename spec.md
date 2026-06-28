# Tài liệu Đặc tả Dự án: Mini Product Data Management (Mini PDM)

Dự án này được thiết kế như một ứng dụng Next.js gọn nhẹ, phục vụ mục đích demo các tính năng tự động hóa của **Antigravity Browser Agent** (như tự động điền form, kiểm thử luồng UI, xử lý logic nhiều bước và kiểm tra trạng thái DOM).

---

## 1. Công nghệ Sử dụng (Tech Stack)
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (Đảm bảo giao diện trực quan, rõ ràng để AI nhận diện)
- **State Management:** Sử dụng `localStorage` để lưu trữ dữ liệu sản phẩm tạm thời, giúp dữ liệu không bị mất khi reload trang trong quá trình test.

---

## 2. Cấu trúc Thư mục Yêu cầu
antigravity-demo-pdm/
├── app/
│   ├── layout.tsx
│   ├── page.tsx               # Trang Đăng nhập (Mặc định)
│   └── dashboard/
│       ├── page.tsx           # Trang quản lý & tìm kiếm sản phẩm
│       ├── new/
│       │   └── page.tsx       # Form thêm mới sản phẩm
│       └── wizard/
│           └── page.tsx       # Quy trình Multi-step 3 bước
├── components/
│   └── ui/                    # Các component UI cơ bản (nếu cần)
└── public/

---

## 3. Đặc tả Chi tiết các Trang và Kịch bản Test

### 3.1. Trang Đăng nhập (/)
- **Yêu cầu giao diện:**
  - Tiêu đề: "Antigravity PDM Demo - Login"
  - Input điền Tài khoản: `id="username"`, `name="username"`, placeholder="Nhập admin"
  - Input điền Mật khẩu: `id="password"`, `name="password"`, type="password", placeholder="Nhập password123"
  - Nút Đăng nhập: `id="btn-login"`, text="Đăng nhập"
  - Vùng hiển thị lỗi: `id="error-message"`, mặc định ẩn, chỉ hiện khi đăng nhập sai.
- **Logic xử lý:**
  - Tài khoản đúng: `admin` / `password123`. Nếu đúng, chuyển hướng sang trang `/dashboard`.
  - Nếu sai: Hiển thị thông báo lỗi: "Tài khoản hoặc mật khẩu không chính xác!" tại vùng `id="error-message"`.

### 3.2. Trang Dashboard Sản phẩm (/dashboard)
- **Yêu cầu giao diện:**
  - Header: Hiển thị tiêu đề "Hệ thống Quản lý Sản phẩm" và nút "Đăng xuất" (`id="btn-logout"`).
  - Thanh công cụ:
    - Ô Tìm kiếm: `id="search-input"`, placeholder="Tìm kiếm theo tên hoặc SKU..."
    - Dropdown Danh mục: `id="category-filter"` (Lựa chọn: Tất cả, Điện tử, Nội thất, Thời trang).
    - Nút Thêm mới: `id="btn-create-product"`, click sẽ chuyển sang `/dashboard/products/new`.
    - Nút Chạy Wizard: `id="btn-go-wizard"`, click sẽ chuyển sang `/dashboard/wizard`.
  - Bảng hiển thị (Data Table): `id="product-table"`
    - Các cột: Tên sản phẩm, SKU, Danh mục, Trạng thái, Hành động.
    - Trạng thái hiển thị rõ nhãn: "Đang hoạt động" hoặc "Ngừng hoạt động".
- **Logic xử lý:**
  - Tải dữ liệu ban đầu từ `localStorage` (khởi tạo sẵn 3-5 sản phẩm mẫu nếu chưa có dữ liệu).
  - Khi gõ vào ô Tìm kiếm hoặc thay đổi Dropdown, bảng dữ liệu phải tự động lọc theo thời gian thực (Real-time filtering).

### 3.3. Trang Thêm mới Sản phẩm (/dashboard/products/new)
- **Yêu cầu giao diện:**
  - Tiêu đề: "Thêm sản phẩm mới"
  - Form: `id="product-form"`
    - Input Tên sản phẩm: `id="prod-name"`, bắt buộc nhập.
    - Input Mã SKU: `id="prod-sku"`, bắt buộc nhập.
    - Dropdown Danh mục: `id="prod-category"` (Options: Điện tử, Nội thất, Thời trang).
    - Checkbox Trạng thái: `id="prod-status"`, label="Kích hoạt hoạt động".
    - Textarea Mô tả: `id="prod-description"`.
  - Nút Hủy: `id="btn-cancel"`, quay lại trang dashboard.
  - Nút Lưu: `id="btn-save"`, type="submit", text="Lưu sản phẩm".
- **Logic xử lý:**
  - Khi bấm Lưu, tiến hành validate cơ bản. Nếu hợp lệ, push đối tượng mới vào mảng sản phẩm trong `localStorage`, hiển thị alert/toast thông báo thành công và chuyển hướng về `/dashboard`.

### 3.4. Trang Multi-step Wizard (/dashboard/wizard)
Mô phỏng một quy trình cấu hình hệ thống gồm 3 bước tuần tự nhằm test khả năng click điều hướng của AI.
- **Bước 1: Chọn gói cấu hình**
  - Giao diện: Hiển thị 2 thẻ (Card) chọn lựa: "Gói Cơ Bản" (`id="plan-basic"`) và "Gói Nâng Cao" (`id="plan-pro"`).
  - Nút Tiếp tục: `id="btn-wizard-next-1"`, chỉ bật khi đã chọn 1 trong 2 gói.
- **Bước 2: Điền thông tin xác nhận**
  - Giao diện: Input "Ghi chú cấu hình" (`id="wizard-note"`).
  - Nút Quay lại: `id="btn-wizard-back-2"`.
  - Nút Tiếp tục: `id="btn-wizard-next-2"`.
- **Bước 3: Hoàn tất**
  - Giao diện: Hiển thị biểu tượng thành công lớn và thông báo `id="wizard-success-msg"` với nội dung "Cấu hình hệ thống thành công!".
  - Nút Quay về trang chủ: `id="btn-wizard-home"`.

---

## 4. Các lưu ý quan trọng để Antigravity Test dễ dàng
1. Các thành phần tương tác chính (Input, Button, Select, Checkbox) **bắt buộc phải có thuộc tính id hoặc data-testid rõ ràng** như đã chỉ định trong tài liệu này.
2. Thêm hiệu ứng loading giả lập (ví dụ: spinner chạy 0.5 giây khi bấm tìm kiếm hoặc chuyển bước trong wizard) để demo khả năng "chờ đợi thông minh" (Smart Wait) của Antigravity Agent.