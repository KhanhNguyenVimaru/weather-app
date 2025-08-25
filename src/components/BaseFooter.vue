<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <!-- Left: Socials -->
      <div class="footer-left">
        <a
          href="https://www.facebook.com/nguyen.khanh.201930/"
          class="social"
          aria-label="Facebook"
          target="_blank"
          rel="noopener"
        >
          <!-- Facebook SVG -->
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.02H7.9v-2.92h2.54V9.67c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.92h-2.3V22C18.34 21.2 22 17.06 22 12.06z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a
          href="https://github.com/KhanhNguyenVimaru/WeatherApp"
          class="social"
          aria-label="GitHub"
          target="_blank"
          rel="noopener"
        >
          <!-- GitHub SVG -->
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.2-3.07-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.17a11.07 11.07 0 0 1 5.83 0c2.22-1.48 3.2-1.17 3.2-1.17.63 1.6.23 2.78.11 3.07.75.8 1.2 1.82 1.2 3.07 0 4.41-2.68 5.39-5.24 5.67.42.37.81 1.1.81 2.22v3.29c0 .3.21.67.8.55A11.5 11.5 0 0 0 12 .5z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>

      <!-- Right: Brand / Copy -->
      <div class="footer-right">
        <span class="brand">WeatherApp</span>
        <span class="dot">•</span>
        <span>© 2025</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer không có logic
</script>

<!-- Scoped styles -->
<style lang="scss" scoped>
.app-footer {
  background: #ffffff; /* nền trắng */
  border-top: 1px solid #e5e7eb;
  min-height: 20vh; /* cao ít nhất 20% chiều cao màn hình */
  display: flex;
  align-items: center; /* căn giữa nội dung theo chiều dọc */
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  color: #0b1220;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
}
.social:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-color: transparent;
  background: #f3f4f6;
}

.brand {
  color: #0b1220;
  letter-spacing: 0.2px;
}
.dot {
  color: #6b7280;
}
.footer-right span:last-child {
  color: #6b7280;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .footer-right {
    justify-content: space-between;
  }
}
</style>
