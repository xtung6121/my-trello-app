# Antigravity Design & Development Guidelines

Tài liệu này định nghĩa các quy tắc đóng gói, thiết kế và luồng làm việc (workflow) cho dự án dựa trên các giải pháp đã triển khai. Mục tiêu hàng đầu là Giữ code tối giản (Minimalist), Sạch sẽ (Clean), và Giao diện cao cấp (Premium UI).

## 1. Triết Lý Phát Triển (Core Philosophy)
- **Tối giản (Minimalism):** Code gọn gàng, không dư thừa. Component chỉ làm đúng chức năng của nó.
- **Sạch sẽ (Clean Code):** Dễ đọc, dễ bảo trì. Tách biệt rõ ràng logic và UI.
- **Cao cấp (Premium Aesthetics):** Giao diện phải hiện đại, có các hiệu ứng mượt mà (transitions, hover, glassmorphism) thay vì thiết kế phẳng nhàm chán.
## 2. Quy Tắc Bắt Buộc (Mandatory Rules)
- **Screenshot & Review:** Sau mỗi thay đổi lớn về UI/UX hoặc tính năng, bắt buộc phải chụp ảnh màn hình (screenshot) và so sánh, đối chiếu với thiết kế (design) gốc.
- **Mobile-Friendly:** Website phải responsive, hiển thị và hoạt động mượt mà trên thiết bị di động. Ưu tiên kiểm tra kỹ giao diện trên màn hình nhỏ.

## 3. Cấu Trúc Thư Mục (Folder Structure)
Tuân thủ flow hiện tại của source code:
```text
src/
├── apis/       # Xử lý gọi API, không chứa logic UI
├── components/ # Các components dùng chung trên toàn app (AppBar, Modals, Buttons)
├── pages/      # Các trang chính của app (Boards, BoardDetail, Auth)
│   └── ComponentName/
│       ├── index.jsx        # Điểm vào chính của page, chứa layout tổng
│       ├── SubComponent.jsx # Component con phục vụ riêng cho page này
│       └── style.css        # CSS tùy chỉnh, hiệu ứng đặc thù
├── utils/      # Func helper, formatting
└── theme.js    # Cấu hình Material-UI custom theme
```

## 4. Quy Tắc Code & Đóng Gói (Coding Rules)

### 4.1. Chia Nhỏ Component (Component Decomposition)
- Không viết index.jsx quá dài (quá 150-200 dòng).
- Bất kỳ khối UI nào lặp lại hoặc có logic độc lập (ví dụ: `BoardCard`, `SidebarItem`) phải được tách ra thành sub-component.
- Sử dụng Arrow Functions cho các component đơn giản hoặc SubComponents nội bộ.

### 4.2. Cân Bằng Giữa MUI & Custom CSS
- **Mui `sx` prop:** Dùng cho các styling cơ bản (margin, padding, flexbox, layout).
- **Custom `.css` files:** Dành riêng cho các hiệu ứng phức tạp mà viết trong `sx` sẽ làm code rối rắm (ví dụ: CSS Grid phức tạp, Keyframes animations, Gradients, Hover transforms, Glassmorphism).
- Đóng gói file `.css` cùng thư mục với component để tiện quản lý (module scoping).

### 4.3. Clean Data Flow
- Tuân thủ quy trình xử lý lỗi và fetching an toàn (vd: Validate `Array.isArray(data)` trước khi map render).
- Tách biệt API calls ra thư mục `apis/`, sử dụng `useEffect` chỉ để trigger và update state.

## 5. Workflow (Luồng Hoạt Động)

Khi cần phát triển thêm một tính năng hoặc một luồng làm việc mới, hãy theo các bước sau:

1. **Phân tích Khung (Layout Skeleton):**
   - Sử dụng MUI `Box`, `Container`, `Grid` dàn bố cục tổng thể.
   - Luôn chú ý tính Responsive ngay từ bước này.
2. **Tách Component (Component Breakdown):**
   - Cắt giao diện thành các phần nhỏ gọn.
   - Khởi tạo file riêng cho từng Component con.
3. **Thêm Dữ liệu Dummy (Mock Data):**
   - Đảm bảo UI hoạt động với dữ liệu tĩnh trước khi liên kết Backend.
4. **Áp dụng Design Cao cấp (Polishing UI):**
   - Thêm Gradients, Typography và Bóng đổ hiện đại (Shadows).
   - Bổ sung Micro-animations (hover effects, scale).
5. **Đấu nối Dữ Liệu Thực (API Integration):**
   - Thay mock data bằng functions từ `apis/`.
   - Bọc các trạng thái (Loading, Error, Empty State).

## 6. Quy Tắc Bắt Buộc (Mandatory Rules)

Screenshot & Review: Sau mỗi thay đổi lớn về UI/UX hoặc tính năng, bắt buộc phải chụp ảnh màn hình (screenshot) và so sánh, đối chiếu với thiết kế (design) gốc.
Mobile-Friendly: Website phải responsive, hiển thị và hoạt động mượt mà trên thiết bị di động. Ưu tiên kiểm tra kỹ giao diện trên màn hình nhỏ.
---
*Mọi thay đổi trong tương lai liên quan đến Component, Page hay Architecture đều phải đối chiếu qua các quy tắc này để duy trì sự nhất quán.*
