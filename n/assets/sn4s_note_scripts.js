// 当文档加载完毕时执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有class为note的元素
    var notes = document.querySelectorAll('.note');

    // 为每个note添加点击事件监听器
    notes.forEach(function(note) {
        note.addEventListener('click', function() {
            // 从note的id中获取编号
            var noteId = this.id; // 例如 "cha1no1"
            // 构造对应的quote的id
            var quoteId = noteId.replace('no', 'qo'); // 将 "cha1no1" 替换为 "cha1qo1"
            // 获取对应的quote元素
            var quote = document.getElementById(quoteId);

            // 切换quote的显示/隐藏状态
            if (quote.style.display === 'none') {
                // 如果quote是隐藏的，则显示它
                quote.style.display = 'block';
            } else {
                // 如果quote是显示的，则隐藏它
                quote.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleMode');
    toggleButton.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            // 如果当前是夜间模式，切换到日间模式
            document.body.removeAttribute('data-theme');
            toggleButton.textContent = '🌚';
        } else {
            // 如果当前是日间模式，切换到夜间模式
            document.body.setAttribute('data-theme', 'dark');
            toggleButton.textContent = '😎';
        }
    });
});


// ** A top reading progress bar **
let processScroll = () => {
    let docElem = document.documentElement, 
      docBody = document.body,
      scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
      scrollPercent = scrollTop / scrollBottom * 100 + '%';
    
    // console.log(scrollTop + ' / ' + scrollBottom + ' / ' + scrollPercent);
    
      document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent); 
  }
  
  document.addEventListener('scroll', processScroll);
