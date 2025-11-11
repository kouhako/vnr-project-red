# Trang web Lịch sử Đảng Cộng sản Việt Nam

Trang web trình bày các mốc lịch sử quan trọng trong quá trình Đảng lãnh đạo cả nước quá độ lên Chủ nghĩa xã hội và tiến hành công cuộc đổi mới (1975 - 2018).

## Tính năng

- 📚 9 mốc lịch sử quan trọng với giao diện tương tác
- 🧠 Quiz trắc nghiệm với 3 chế độ (10, 15, 20 câu)
- 🤖 AI Chatbot hỗ trợ trả lời câu hỏi về lịch sử
- 🎬 Video giới thiệu
- 📖 Flipbook tương tác
- 📱 Responsive design

## Cài đặt và chạy local

1. Clone repository:
```bash
git clone <your-repo-url>
cd VNR_Project_red
```

2. Cấu hình API key:
   - Copy file `config.example.js` thành `config.js`
   - Mở `config.js` và thay `YOUR_API_KEY_HERE` bằng API key Gemini của bạn

3. Mở file `index.html` trong trình duyệt hoặc sử dụng local server:
```bash
# Sử dụng Python
python -m http.server 8000

# Hoặc sử dụng Node.js (nếu có http-server)
npx http-server
```

4. Truy cập: `http://localhost:8000`

## Deploy lên Vercel

### Bước 1: Chuẩn bị Git Repository

1. Khởi tạo Git repository (nếu chưa có):
```bash
git init
```

2. Thêm tất cả files:
```bash
git add .
```

3. Commit:
```bash
git commit -m "Initial commit: Trang web lịch sử Đảng"
```

4. Tạo repository trên GitHub:
   - Vào https://github.com/new
   - Tạo repository mới (ví dụ: `vnr-project-red`)
   - **KHÔNG** tích vào "Initialize with README"

5. Kết nối và push code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/vnr-project-red.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy lên Vercel

#### Cách 1: Deploy qua Vercel Dashboard

1. Đăng nhập/Đăng ký tại [vercel.com](https://vercel.com)

2. Click "Add New Project"

3. Import Git Repository:
   - Chọn repository vừa tạo trên GitHub
   - Click "Import"

4. Cấu hình Project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (mặc định)
   - **Build Command**: (để trống - không cần build)
   - **Output Directory**: (để trống)

5. Environment Variables:
   - Click "Environment Variables"
   - Thêm biến:
     - **Name**: `GEMINI_API_KEY`
     - **Value**: API key Gemini của bạn
     - Chọn môi trường: Production, Preview, Development

6. Click "Deploy"

#### Cách 2: Deploy qua Vercel CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Đăng nhập:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Thêm environment variable:
```bash
vercel env add GEMINI_API_KEY
# Nhập API key khi được hỏi
```

5. Deploy production:
```bash
vercel --prod
```

### Bước 3: Cấu hình API Key trên Vercel

Sau khi deploy, cần cập nhật `chat.js` để đọc từ environment variable:

1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Thêm `GEMINI_API_KEY` với giá trị API key của bạn
3. Redeploy project

## Cấu trúc thư mục

```
VNR_Project_red/
├── index.html          # Trang chủ
├── moc1.html - moc9.html  # Các trang mốc lịch sử
├── quiz.html          # Trang quiz
├── report.html        # Trang báo cáo
├── styles.css         # CSS chính
├── chat.css          # CSS cho chatbot
├── script.js         # JavaScript chính
├── chat.js           # JavaScript cho chatbot
├── config.js         # Config API key (không commit)
├── config.example.js # File mẫu config
├── Image/            # Thư mục hình ảnh
├── Video/            # Thư mục video
└── .gitignore        # Git ignore file
```

## Lưu ý bảo mật

⚠️ **QUAN TRỌNG**: 
- File `config.js` đã được thêm vào `.gitignore` để bảo vệ API key
- Khi deploy lên Vercel, sử dụng Environment Variables thay vì hardcode API key
- Không commit file `config.js` lên Git

## Công nghệ sử dụng

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Google Gemini API (AI Chatbot)
- Vercel (Hosting)


## License

© 2025 - Trang web lịch sử

