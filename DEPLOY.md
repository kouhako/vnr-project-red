# Hướng dẫn Deploy lên Vercel

## 📋 Checklist trước khi deploy

- [ ] Đã tạo file `config.js` từ `config.example.js` (cho local development)
- [ ] Đã thêm `config.js` vào `.gitignore`
- [ ] Đã commit code lên Git
- [ ] Đã có tài khoản GitHub
- [ ] Đã có tài khoản Vercel

## 🚀 Các bước deploy

### Bước 1: Setup Git Repository

```bash
# 1. Khởi tạo Git (nếu chưa có)
git init

# 2. Kiểm tra file .gitignore đã có chưa
cat .gitignore

# 3. Thêm tất cả files (trừ config.js đã được ignore)
git add .

# 4. Commit
git commit -m "Initial commit: Trang web lịch sử Đảng"

# 5. Tạo repository trên GitHub
# Vào https://github.com/new và tạo repo mới

# 6. Kết nối và push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy lên Vercel

#### Phương pháp 1: Qua Vercel Dashboard (Khuyên dùng)

1. **Đăng nhập Vercel**
   - Vào https://vercel.com
   - Đăng nhập bằng GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Chọn repository vừa push lên GitHub
   - Click "Import"

3. **Cấu hình Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (mặc định)
   - **Build Command**: (để trống)
   - **Output Directory**: (để trống)
   - **Install Command**: (để trống)

4. **Thêm Environment Variable**
   - Click "Environment Variables"
   - Thêm biến mới:
     ```
     Name: GEMINI_API_KEY
     Value: [API key của bạn]
     ```
   - Chọn tất cả môi trường: Production, Preview, Development
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Chờ quá trình deploy hoàn tất (1-2 phút)

6. **Cập nhật chat.js để đọc từ environment variable**
   - Sau khi deploy, Vercel sẽ tự động inject environment variables
   - Code trong `chat.js` đã được cập nhật để đọc từ `window.GEMINI_API_KEY`

#### Phương pháp 2: Qua Vercel CLI

```bash
# 1. Cài đặt Vercel CLI
npm i -g vercel

# 2. Đăng nhập
vercel login

# 3. Deploy
vercel

# 4. Thêm environment variable
vercel env add GEMINI_API_KEY
# Nhập API key khi được hỏi
# Chọn môi trường: Production, Preview, Development

# 5. Deploy production
vercel --prod
```

### Bước 3: Cấu hình Custom Domain (Tùy chọn)

1. Vào Vercel Dashboard → Project → Settings → Domains
2. Thêm domain của bạn
3. Làm theo hướng dẫn để cấu hình DNS

## 🔧 Cấu hình API Key trên Vercel

### Cách 1: Qua Dashboard

1. Vào Project → Settings → Environment Variables
2. Thêm:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: API key của bạn
   - **Environment**: Chọn Production, Preview, Development
3. Click "Save"
4. Redeploy project

### Cách 2: Qua CLI

```bash
vercel env add GEMINI_API_KEY production
vercel env add GEMINI_API_KEY preview
vercel env add GEMINI_API_KEY development
```

## 🔄 Cập nhật code sau khi deploy

```bash
# 1. Sửa code local
# 2. Commit changes
git add .
git commit -m "Update: mô tả thay đổi"

# 3. Push lên GitHub
git push

# 4. Vercel sẽ tự động deploy lại (nếu đã bật Auto-deploy)
# Hoặc vào Vercel Dashboard → Deployments → Redeploy
```

## 🐛 Troubleshooting

### Lỗi: API key không hoạt động

**Nguyên nhân**: Environment variable chưa được set hoặc chưa được inject vào frontend.

**Giải pháp**:
1. Kiểm tra Environment Variables trong Vercel Dashboard
2. Đảm bảo đã chọn đúng môi trường (Production/Preview/Development)
3. Redeploy project sau khi thêm environment variable

### Lỗi: 404 khi truy cập trang

**Nguyên nhân**: Vercel không nhận diện được file HTML.

**Giải pháp**:
- Kiểm tra file `vercel.json` đã có chưa
- Đảm bảo các file HTML nằm ở root directory

### Lỗi: Video/Image không load

**Nguyên nhân**: Đường dẫn file không đúng.

**Giải pháp**:
- Kiểm tra đường dẫn trong HTML (phải là relative path)
- Đảm bảo các file trong thư mục `Image/` và `Video/` đã được commit

## 📝 Lưu ý

1. **API Key**: Không bao giờ commit API key vào Git. Luôn sử dụng Environment Variables.

2. **File size**: Vercel có giới hạn file size. Nếu video quá lớn, cân nhắc:
   - Upload lên cloud storage (Cloudinary, AWS S3)
   - Sử dụng CDN
   - Compress video

3. **Build time**: Vercel sẽ tự động detect changes và deploy lại khi bạn push code lên GitHub (nếu bật Auto-deploy).

4. **Preview deployments**: Mỗi pull request sẽ tạo một preview deployment riêng để test.

## 🔗 Links hữu ích

- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Integration](https://vercel.com/docs/concepts/git)

