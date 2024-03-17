// JavaScript代码
function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBox");
    filter = input.value.toUpperCase();
    table = document.getElementById("termsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // 搜索第一列
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// 排序函数
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("termsTable");
    switching = true;
    // 设置排序方向为升序
    dir = "asc";
    // 循环直到没有进行排序的行
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            // 获取比较的元素
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // 检查是否需要根据方向进行排序
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // 如果需要进行排序，标记为已排序，并继续循环
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            // 如果在升序排序中没有需要排序的行，且没有进行排序，则设置为降序排序，然后继续循环
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// 给表头添加点击事件监听器来排序
document.addEventListener("DOMContentLoaded", function() {
    var th = document.getElementsByTagName("th");
    for (var i = 0; i < th.length; i++) {
        th[i].addEventListener("click", function() {
            sortTable(this.cellIndex);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // 获取按钮元素
    const moonButton = document.querySelector(".floating-bar button:first-child");
  
    // 1. 实现 Dark Mode 切换功能
    moonButton.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
    });
});