// 全局变量，用于存储 sidenote 的位置
let sidenotePositions = [];

// 初始化 sidenote 的位置
function initializeSidenotes() {
  const sidenotes = document.querySelectorAll(".side-note");
  const footnotes = document.querySelectorAll("sup");

  // 清空之前的 sidenote 位置
  sidenotePositions = [];

  let lastSidenoteBottom = 0; // 用于记录上一个 sidenote 的底部位置

  sidenotes.forEach((sidenote, index) => {
    const footnote = footnotes[index];
    if (!footnote) return;

    // 获取脚注的位置
    const footnoteOffset = getOffset(footnote).top;

    // 确定 sidenote 的初始位置，减去偏移量以对齐脚注
    let sidenoteTop = footnoteOffset - 50; // 默认的计算结果有一定的偏移量，减去 50px (向上调整)后正好

    // 确保 sidenote 不与上一个 sidenote 重叠
    if (sidenoteTop < lastSidenoteBottom) {
      sidenoteTop = lastSidenoteBottom + 10; // 添加 10px 的间距
    }

    // 记录 sidenote 的位置
    sidenotePositions.push({
      sidenote,
      top: sidenoteTop,
      height: sidenote.offsetHeight,
    });

    // 更新 sidenote 的样式
    sidenote.style.top = `${sidenoteTop}px`;
    sidenote.style.opacity = "0"; // 初始隐藏
    sidenote.style.position = "absolute";

    // 更新最后一个 sidenote 的底部位置
    lastSidenoteBottom = sidenoteTop + sidenote.offsetHeight;

    // 自动将 URL 转换为链接
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (!sidenote.dataset.processed) {
      sidenote.innerHTML = sidenote.innerHTML.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
      sidenote.dataset.processed = "true"; // 标记为已处理
    }

    // 添加鼠标事件，切换编号为关闭操作符
    const originalText = sidenote.innerHTML; // 保存原始内容
    const closeButton = `<span class="close-btn">[X]</span>`;

    sidenote.addEventListener("mouseenter", () => {
      const match = originalText.match(/^\[.*?\]/); // 匹配编号部分
      if (match) {
        sidenote.innerHTML = originalText.replace(match[0], closeButton);
        sidenote.querySelector(".close-btn").addEventListener("click", () => {
          sidenote.style.opacity = "0"; // 隐藏 sidenote
        });
      }
    });

    sidenote.addEventListener("mouseleave", () => {
      sidenote.innerHTML = originalText; // 恢复原始内容
    });
  });
}

// 获取元素的偏移位置
function getOffset(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
  };
}

// 显示对应的 sidenote
function showSidenote(footnote) {
  const sidenoteIndex = Array.from(document.querySelectorAll("sup")).indexOf(
    footnote
  );
  const sidenote = sidenotePositions[sidenoteIndex]?.sidenote;

  if (sidenote) {
    sidenote.style.opacity = "1";
  }
}

// 初始化逻辑
window.addEventListener("DOMContentLoaded", () => {
  initializeSidenotes();

  // 绑定脚注点击事件
  const footnotes = document.querySelectorAll("sup");
  footnotes.forEach((footnote) => {
    footnote.addEventListener("click", (event) => {
      showSidenote(event.target);
    });
  });
});

// 监听窗口大小变化
window.addEventListener("resize", () => {
  // 隐藏所有 sidenote
  document.querySelectorAll(".side-note").forEach((sidenote) => {
    sidenote.style.opacity = "0";
  });

  // 重新初始化 sidenote 的位置
  initializeSidenotes();
});

// ** A top reading progress bar **
let processScroll = () => {
  let docElem = document.documentElement,
    docBody = document.body,
    scrollTop = docElem["scrollTop"] || docBody["scrollTop"],
    scrollBottom =
      (docElem["scrollHeight"] || docBody["scrollHeight"]) - window.innerHeight,
    scrollPercent = (scrollTop / scrollBottom) * 100 + "%";

  // console.log(scrollTop + ' / ' + scrollBottom + ' / ' + scrollPercent);

  document
    .getElementById("progress-bar")
    .style.setProperty("--scrollAmount", scrollPercent);
};

document.addEventListener("scroll", processScroll);

// ** Dark mode toggle functionality **
document.addEventListener("DOMContentLoaded", function () {
  const sunIcon = document.querySelector(".fa-sun-o");
  const moonIcon = document.querySelector(".fa-moon-o");

  // Function to switch highlight.js theme
  function switchHighlightTheme(isDark) {
    const currentLink = document.querySelector(
      'link[href*="highlight/styles/base16/solarized-"]'
    );
    if (currentLink) {
      const theme = isDark
        ? "solarized-dark.min.css"
        : "solarized-light.min.css";
      const newHref = currentLink.href.replace(
        /solarized-(light|dark)\.min\.css/,
        theme
      );
      currentLink.href = newHref;

      // Re-highlight code blocks after theme change
      if (window.hljs) {
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    }
  }

  // Function to enable dark mode
  function enableDarkMode() {
    document.documentElement.classList.remove("light-mode");
    document.documentElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    switchHighlightTheme(true);
  }

  // Function to enable light mode
  function enableLightMode() {
    document.documentElement.classList.remove("dark-mode");
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    switchHighlightTheme(false);
  }

  // Check for saved user preference first, then system preference
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    enableDarkMode();
  } else if (savedTheme === "light") {
    enableLightMode();
  } else {
    // If no saved preference, check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }

  // Add event listeners to the icons
  sunIcon.addEventListener("click", function () {
    enableLightMode();
  });

  moonIcon.addEventListener("click", function () {
    enableDarkMode();
  });
});

// ** Stack subtitles when they are in the viewport **
// Select all of the subtitles that you want to track
// const subtitles = document.querySelectorAll('.subtitle');

// // Select the area where you want to stack the subtitles
// const stack = document.querySelector('.moc_level1');

// // Create a new Intersection Observer instance
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     // If the element is in the viewport
//     if (entry.isIntersecting) {
//       // Move the subtitle to the stack
//       stack.appendChild(entry.target);
//     }
//   });
// }, {
//   rootMargin: '0px',
//   threshold: 0.5
// });

// // Observe each of the subtitles
// subtitles.forEach(subtitle => {
//   observer.observe(subtitle);
// });
