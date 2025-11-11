// API Configuration - Sử dụng config.js hoặc environment variable
let API_KEY = "";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Load API key từ config.js hoặc environment variable
(function() {
    // Ưu tiên 1: Từ window object (được inject từ config.js local hoặc /api/config.js trên Vercel)
    if (window.GEMINI_API_KEY && window.GEMINI_API_KEY !== '') {
        API_KEY = window.GEMINI_API_KEY;
    }
    // Ưu tiên 2: Từ CONFIG object (cho local development với config.js)
    else if (typeof CONFIG !== 'undefined' && CONFIG.GEMINI_API_KEY) {
        API_KEY = CONFIG.GEMINI_API_KEY;
    }
    // Fallback: sử dụng API key cũ (chỉ để demo, nên thay bằng environment variable)
    else {
        API_KEY = "AIzaSyD9PWB2T4K5EpRpOR-sEKkFXu12dPxDpno";
        console.warn("⚠️ Đang sử dụng API key mặc định. Vui lòng cấu hình API key trong config.js (local) hoặc Vercel environment variable (production).");
    }
})();

// Check if we're on quiz page
const isQuizPage = window.location.pathname.includes('quiz.html') || 
                   window.location.href.includes('quiz.html');

// Initialize chat widget
let chatWidget, chatIcon, chatToggle, chatBody, userInput, sendBtn;
let isChatOpen = false;
let isInitialized = false; // Flag to prevent multiple initializations
let observer = null;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Try initialization once, then retry after delays for dynamically loaded content
  if (!isInitialized) {
    initializeChat();
  }
  setTimeout(() => {
    if (!isInitialized) {
      initializeChat();
    }
  }, 500);
  setTimeout(() => {
    if (!isInitialized) {
      initializeChat();
    }
  }, 1500);
});

// Use MutationObserver to detect when chat HTML is dynamically loaded (only once)
if (!observer) {
  observer = new MutationObserver(function(mutations) {
    if (isInitialized) {
      observer.disconnect(); // Stop observing once initialized
      return;
    }
    
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length && !isInitialized) {
        const hasChatWidget = Array.from(mutation.addedNodes).some(node => {
          if (node.nodeType === 1) { // Element node
            return node.id === 'chat-widget' || 
                   node.id === 'chat-icon' ||
                   (node.querySelector && (node.querySelector('#chat-widget') || node.querySelector('#chat-icon')));
          }
          return false;
        });
        if (hasChatWidget && !isInitialized) {
          setTimeout(() => {
            if (!isInitialized) {
              initializeChat();
            }
          }, 200);
        }
      }
    });
  });

  // Start observing when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (!isInitialized) {
        observer.observe(document.body, { childList: true, subtree: true });
      }
    });
  } else {
    if (!isInitialized) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
}

function initializeChat() {
  // Prevent multiple initializations
  if (isInitialized) {
    return;
  }

  // Hide chat on quiz page
  if (isQuizPage) {
    const chatContainer = document.getElementById('chat-container');
    const chatIconEl = document.getElementById('chat-icon');
    const chatWidgetEl = document.getElementById('chat-widget');
    if (chatContainer) chatContainer.style.display = 'none';
    if (chatIconEl) chatIconEl.style.display = 'none';
    if (chatWidgetEl) chatWidgetEl.style.display = 'none';
    isInitialized = true; // Mark as initialized even on quiz page
    return;
  }

  // Get elements
  chatWidget = document.getElementById("chat-widget");
  chatIcon = document.getElementById("chat-icon");
  chatToggle = document.getElementById("chat-toggle");
  chatBody = document.getElementById("chat-body");
  userInput = document.getElementById("user-input");
  sendBtn = document.getElementById("send-btn");

  // If elements don't exist, return and wait for next call
  if (!chatWidget || !chatIcon) {
    return;
  }

  // Stop observer to prevent infinite loop
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  // Mark as initialized
  isInitialized = true;

  // Ensure chat icon is visible
  if (chatIcon) {
    chatIcon.style.display = 'flex';
    chatIcon.style.visibility = 'visible';
  }

  // Reset chat state
  isChatOpen = false;
  if (chatWidget) {
    chatWidget.style.display = 'none';
    chatWidget.classList.remove('show', 'hide');
  }

  // Add welcome message if chat body is empty
  if (chatBody && chatBody.children.length === 0) {
    appendMessage("bot", "Xin chào! Bạn muốn hỏi gì nào?");
  }

  // Add event listeners (use once option to prevent duplicates)
  if (chatIcon) {
    chatIcon.addEventListener("click", toggleChat, { once: false });
  }
  
  if (chatToggle) {
    chatToggle.addEventListener("click", toggleChat, { once: false });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage, { once: false });
  }

  if (userInput) {
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    }, { once: false });
  }
}

function toggleChat() {
  // Re-get elements in case they were recreated
  chatWidget = document.getElementById("chat-widget");
  chatToggle = document.getElementById("chat-toggle");
  userInput = document.getElementById("user-input");
  
  if (!chatWidget) {
    return;
  }
  
  if (isChatOpen) {
    // Close chat with animation
    chatWidget.classList.remove('show');
    chatWidget.classList.add('hide');
    setTimeout(() => {
      chatWidget.style.display = 'none';
      chatWidget.classList.remove('hide');
    }, 250);
    isChatOpen = false;
    if (chatToggle) chatToggle.textContent = '+';
  } else {
    // Open chat with animation
    chatWidget.style.display = 'flex';
    setTimeout(() => {
      chatWidget.classList.add('show');
    }, 10);
    isChatOpen = true;
    if (chatToggle) chatToggle.textContent = '–';
    if (userInput) {
      setTimeout(() => userInput.focus(), 100);
    }
  }
}

const SYSTEM_PROMPT = `
Bạn là trợ lý AI chuyên về **Lịch sử Đảng Cộng sản Việt Nam**. 
Hãy trả lời ngắn gọn trong **3–6 câu**, rõ ý, súc tích, phù hợp học sinh – sinh viên.
Tránh viết quá dài hoặc liệt kê quá nhiều dữ kiện.
Nếu câu hỏi nằm ngoài chủ đề, hãy nhẹ nhàng hướng người dùng quay lại chủ đề lịch sử Đảng.
Ngôn ngữ trả lời: **Tiếng Việt**.
`;

async function sendMessage() {
  if (!userInput || !chatBody) return;
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  userInput.value = "";
  appendMessage("bot", "Đang suy nghĩ...");

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: SYSTEM_PROMPT + "\nCâu hỏi: " + text }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                "Xin lỗi, tôi chưa có câu trả lời cho điều này.";
    if (reply.length > 500) reply = reply.substring(0, 500).trim() + "…";

    updateLastBotMessage(reply);
  } catch (error) {
    updateLastBotMessage("⚠️ Có lỗi xảy ra, vui lòng thử lại sau.");
    console.error("Error:", error);
  }
}

function appendMessage(sender, text) {
  if (!chatBody) return;
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function updateLastBotMessage(text) {
  if (!chatBody) return;
  const messages = chatBody.getElementsByClassName("bot-message");
  if (messages.length > 0)
    messages[messages.length - 1].textContent = text;
  chatBody.scrollTop = chatBody.scrollHeight;
}
