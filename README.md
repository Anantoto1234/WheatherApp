# Weather App - Angular

Ứng dụng thời tiết được xây dựng bằng Angular 17, hiển thị thời tiết hiện tại và dự báo ngắn hạn.

## Tính năng

- 🌤️ Hiển thị thời tiết hiện tại
- 📅 Dự báo 5 ngày tới
- 🔍 Tìm kiếm theo tên thành phố
- 📱 Responsive design
- 🌍 Hỗ trợ tiếng Việt

## Cài đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Lấy API Key từ OpenWeatherMap
1. Truy cập [OpenWeatherMap](https://openweathermap.org/api)
2. Đăng ký tài khoản miễn phí
3. Lấy API Key từ dashboard

### 3. Cấu hình API Key
Mở file `src/app/services/weather.service.ts` và thay thế `YOUR_API_KEY` bằng API key thực tế:

```typescript
private apiKey = 'your_actual_api_key_here';
```

### 4. Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:4200`

## Sử dụng

1. Nhập tên thành phố vào ô tìm kiếm
2. Nhấn Enter hoặc click nút "Tìm kiếm"
3. Xem thông tin thời tiết hiện tại và dự báo

## Công nghệ sử dụng

- Angular 17
- TypeScript
- OpenWeatherMap API
- CSS3 với Flexbox và Grid
- RxJS

## Cấu trúc project

```
src/
├── app/
│   ├── models/
│   │   └── weather.model.ts      # Interface cho dữ liệu thời tiết
│   ├── services/
│   │   └── weather.service.ts    # Service gọi API
│   ├── app.component.ts          # Component chính
│   ├── app.component.html        # Template
│   ├── app.component.css         # Styles
│   └── app.module.ts            # Module chính
├── index.html
└── main.ts
```

## Lưu ý

- Cần có kết nối internet để gọi API
- API key miễn phí có giới hạn 1000 requests/ngày
- Ứng dụng hỗ trợ tìm kiếm bằng tên thành phố tiếng Việt và tiếng Anh
