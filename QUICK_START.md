# 🚀 Hướng dẫn nhanh: Deploy lên Vercel

## ⚡ Các bước nhanh (5 phút)

### 1️⃣ Setup Git và GitHub

```bash
# Khởi tạo Git
git init

# Tạo file config.js từ mẫu (cho local development)
copy config.example.js config.js
# Sau đó mở config.js và thay YOUR_API_KEY_HERE bằng API key của bạn

# Commit code
git add .
git commit -m "Initial commit"

# Tạo repo trên GitHub tại https://github.com/new
# Sau đó push code
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy lên Vercel

1. **Đăng nhập Vercel**: https://vercel.com (đăng nhập bằng GitHub)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Chọn repository vừa tạo
   - Click "Import"

3. **Cấu hình**:
   - Framework Preset: **Other**
   - Build Command: (để trống)
   - Output Directory: (để trống)

4. **Thêm Environment Variable**:
   - Click "Environment Variables"
   - Thêm:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: API key Gemini của bạn
     - Chọn: Production, Preview, Development
   - Click "Save"

5. **Deploy**: Click "Deploy" và chờ 1-2 phút

### 3️⃣ Xong! 🎉

Website của bạn sẽ có URL dạng: `https://your-project.vercel.app`

## 📝 Lưu ý quan trọng

✅ **Đã được bảo vệ**:
- File `config.js` đã có trong `.gitignore` → không bị commit
- API key được lưu trong Vercel Environment Variables → an toàn

⚠️ **Nhớ**:
- Không commit file `config.js` lên Git
- Luôn sử dụng Environment Variables trên Vercel
- Sau khi thêm environment variable, cần redeploy

## 🔄 Cập nhật code sau này

```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push
# Vercel sẽ tự động deploy lại
```

## 📚 Xem hướng dẫn chi tiết

- Xem `GIT_SETUP.md` để biết chi tiết về Git setup
- Xem `DEPLOY.md` để biết chi tiết về Vercel deployment
- Xem `README.md` để biết về dự án

