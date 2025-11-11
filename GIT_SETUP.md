# Hướng dẫn Setup Git và Deploy lên Vercel

## 📦 Bước 1: Setup Git Repository

### 1.1. Khởi tạo Git (nếu chưa có)

```bash
# Kiểm tra xem đã có Git chưa
git status

# Nếu chưa có, khởi tạo
git init
```

### 1.2. Tạo file config.js cho local development

```bash
# Copy file mẫu
copy config.example.js config.js

# Hoặc trên Linux/Mac:
# cp config.example.js config.js
```

Sau đó mở `config.js` và thay `YOUR_API_KEY_HERE` bằng API key Gemini của bạn.

### 1.3. Kiểm tra .gitignore

Đảm bảo file `.gitignore` đã có và bao gồm:
- `config.js` (file chứa API key)
- `.env` files
- `node_modules/` (nếu có)

### 1.4. Commit code lần đầu

```bash
# Xem các file sẽ được commit
git status

# Thêm tất cả files (config.js sẽ tự động bị bỏ qua)
git add .

# Commit
git commit -m "Initial commit: Trang web lịch sử Đảng với AI chatbot"
```

## 🔗 Bước 2: Tạo Repository trên GitHub

### 2.1. Tạo repository mới

1. Vào https://github.com/new
2. Điền thông tin:
   - **Repository name**: `vnr-project-red` (hoặc tên bạn muốn)
   - **Description**: "Trang web lịch sử Đảng Cộng sản Việt Nam"
   - **Visibility**: Public hoặc Private (tùy bạn)
   - **KHÔNG** tích vào "Initialize with README" (vì đã có code local)

3. Click "Create repository"

### 2.2. Kết nối và push code

```bash
# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/vnr-project-red.git

# Đổi tên branch thành main (nếu đang dùng master)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

**Lưu ý**: Nếu được hỏi username/password, bạn có thể cần tạo Personal Access Token thay vì dùng password.

## 🚀 Bước 3: Deploy lên Vercel

### 3.1. Đăng ký/Đăng nhập Vercel

1. Vào https://vercel.com
2. Click "Sign Up" hoặc "Log In"
3. Chọn "Continue with GitHub" để đăng nhập bằng GitHub account

### 3.2. Import Project

1. Trong Vercel Dashboard, click "Add New..." → "Project"
2. Tìm và chọn repository `vnr-project-red` vừa tạo
3. Click "Import"

### 3.3. Cấu hình Project

**Framework Preset**: Chọn "Other" hoặc để mặc định

**Root Directory**: `./` (mặc định)

**Build and Output Settings**:
- **Build Command**: (để trống - không cần build)
- **Output Directory**: (để trống)
- **Install Command**: (để trống)

### 3.4. Thêm Environment Variable

**QUAN TRỌNG**: Đây là bước quan trọng để API key hoạt động trên Vercel.

1. Trong phần "Environment Variables", click "Add"
2. Thêm biến:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: API key Gemini của bạn (ví dụ: `AIzaSyD9PWB2T4K5EpRpOR-sEKkFXu12dPxDpno`)
   - **Environment**: Chọn tất cả (Production, Preview, Development)
3. Click "Save"

### 3.5. Deploy

1. Click "Deploy"
2. Chờ quá trình deploy hoàn tất (1-2 phút)
3. Sau khi deploy xong, bạn sẽ nhận được URL như: `https://vnr-project-red.vercel.app`

## 🔄 Bước 4: Cập nhật code sau này

Khi bạn muốn cập nhật code:

```bash
# 1. Sửa code local
# ... làm việc với code ...

# 2. Kiểm tra thay đổi
git status

# 3. Thêm các file đã thay đổi
git add .

# 4. Commit
git commit -m "Update: mô tả thay đổi"

# 5. Push lên GitHub
git push

# 6. Vercel sẽ tự động deploy lại (nếu đã bật Auto-deploy)
```

## 🔐 Bảo mật API Key

### ✅ Đã làm:
- File `config.js` đã được thêm vào `.gitignore`
- File `config.example.js` là file mẫu (an toàn để commit)
- API key được lưu trong Vercel Environment Variables (không commit lên Git)

### ⚠️ Lưu ý:
- **KHÔNG BAO GIỜ** commit file `config.js` lên Git
- **KHÔNG BAO GIỜ** hardcode API key trực tiếp trong code
- Luôn sử dụng Environment Variables trên Vercel

## 🐛 Troubleshooting

### Lỗi: "config.js not found" trên Vercel

**Giải pháp**: Đây là bình thường! File `config.js` không được commit. Trên Vercel, API key sẽ được load từ `/api/config.js` (serverless function).

### Lỗi: API key không hoạt động trên Vercel

**Kiểm tra**:
1. Environment Variable `GEMINI_API_KEY` đã được thêm chưa?
2. Đã chọn đúng môi trường (Production/Preview/Development)?
3. Đã redeploy sau khi thêm environment variable?

**Giải pháp**:
1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Kiểm tra `GEMINI_API_KEY` đã có chưa
3. Nếu chưa có, thêm mới
4. Vào Deployments → Chọn deployment mới nhất → Redeploy

### Lỗi: Git push bị từ chối

**Nguyên nhân**: Repository trên GitHub chưa được tạo hoặc remote URL sai.

**Giải pháp**:
```bash
# Kiểm tra remote
git remote -v

# Nếu sai, xóa và thêm lại
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/vnr-project-red.git

# Push lại
git push -u origin main
```

## 📝 Checklist cuối cùng

Trước khi deploy, đảm bảo:

- [ ] File `.gitignore` đã có và bao gồm `config.js`
- [ ] File `config.js` đã được tạo từ `config.example.js` (cho local)
- [ ] Đã commit và push code lên GitHub
- [ ] Đã tạo project trên Vercel
- [ ] Đã thêm Environment Variable `GEMINI_API_KEY` trên Vercel
- [ ] Đã deploy thành công
- [ ] Đã test website trên Vercel URL

## 🎉 Hoàn thành!

Sau khi deploy thành công, bạn sẽ có:
- ✅ Website live trên Vercel
- ✅ Auto-deploy khi push code lên GitHub
- ✅ API key được bảo vệ an toàn
- ✅ Preview deployments cho mỗi pull request

Chúc bạn thành công! 🚀

