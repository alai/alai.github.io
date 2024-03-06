// 当文档加载完毕时执行
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有class为note的元素
  var buttons = document.querySelectorAll(".show-quote");

  // 为每个button添加点击事件监听器
  buttons.forEach(function (bu) {
    bu.addEventListener("click", function () {
      // 从button的父级元素id中获取编号
      var noteId = this.parentElement.parentElement.id; // 例如 "cha1no1"
      // 构造对应的quote的id
      var quoteId = noteId.replace("no", "qo"); // 将 "cha1no1" 替换为 "cha1qo1"
      // 获取对应的quote元素
      var quote = document.getElementById(quoteId);

      // 切换quote的显示/隐藏状态
      if (quote.style.display === "none") {
        // 如果quote是隐藏的，则显示它
        quote.style.display = "block";
        this.textContent = "Hide Original Text";
      } else {
        // 如果quote是显示的，则隐藏它
        quote.style.display = "none";
        this.textContent = "Show Original Text";
      }
    });
  });
});

// 当文档加载完毕时执行
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有 class 为 card-content 的元素
  var noteIcons = document.querySelectorAll('.tag[data-tag="Note"]');

  // 为每个 card-content 元素添加点击事件监听器
  noteIcons.forEach(function (noteIcon) {
    noteIcon.addEventListener("click", function () {
      // 获取对应的 link-to-note 元素
      var linkToNote = this.parentElement.parentElement.querySelector(".link-to-note");

      // 切换 link-to-note 元素的显示/隐藏状态
      if (linkToNote.style.display === "none") {
        linkToNote.style.display = "inline";
      } else {
        linkToNote.style.display = "none";
      }
    });

    // 获取 link-to-note 元素
    var linkToNote = noteIcon.parentElement.parentElement.querySelector(".link-to-note");

    // 为 link-to-note 元素添加点击事件监听器
    linkToNote.addEventListener("click", function (event) {
      event.stopPropagation(); // 阻止事件冒泡

      // 获取元素的文本内容
      var linkText = this.textContent;

      // 构造锚点链接
      var anchorLink = linkText;

      // 获取当前页面的完整 URL如果其中已经有锚点链接，则去除它
      var currentUrl = window.location.href.replace(/#.*$/, "");

      // 构造完整的锚点链接
      var fullAnchorLink = currentUrl + anchorLink;

      // 复制完整的锚点链接到剪贴板
      navigator.clipboard
        .writeText(fullAnchorLink)
        .then(function () {
          // 创建一个提示框元素
          var tooltip = document.createElement("div");
          tooltip.className = "tooltip";
          tooltip.textContent = "链接已复制到剪贴板";

          // 将提示框附加到 body 上
          document.body.appendChild(tooltip);

          // 在 2 秒后移除提示框
          setTimeout(function () {
            document.body.removeChild(tooltip);
          }, 1000);
        })
        .catch(function (err) {
          console.error("无法复制链接到剪贴板:", err);
        });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    const moonButton = document.querySelector('.floating-bar button:first-child');
    const upButton = document.querySelector('.floating-bar button:nth-child(2)');
    const downButton = document.querySelector('.floating-bar button:last-child');
  
    // 1. 实现 Dark Mode 切换功能
    moonButton.addEventListener('click', function() {
      const htmlElement = document.documentElement;
      htmlElement.dataset.theme = htmlElement.dataset.theme === 'dark' ? 'light' : 'dark';
      // 1.1 切换到 Dark Mode 时，将按钮的background-color设置为 #f1c40f
        if (htmlElement.dataset.theme === 'dark') {
            moonButton.style.backgroundColor = '#181818';
            upButton.style.backgroundColor = '#181818';
            downButton.style.backgroundColor = '#181818';
        } else {
            moonButton.style.backgroundColor = '#aaa';
            upButton.style.backgroundColor = '#aaa';
            downButton.style.backgroundColor = '#aaa';
        }
    });
  
    // 2. 实现页面滚动到页顶功能
    upButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // 3. 实现页面滚动到页尾功能
    downButton.addEventListener('click', function() {
       window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
  });