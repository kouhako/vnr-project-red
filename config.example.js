// File mẫu - Copy file này thành config.js và điền API key của bạn
// File config.js sẽ được .gitignore để bảo vệ API key

// Cách 1: Sử dụng CONFIG object (cho local development)
const CONFIG = {
    GEMINI_API_KEY: "YOUR_API_KEY_HERE"
};

// Cách 2: Hoặc inject trực tiếp vào window (tương thích với cả local và production)
window.GEMINI_API_KEY = "YOUR_API_KEY_HERE";
