// This script enhances the MOC debug panel by tracking scroll events, checking for sticky behavior, and analyzing parent constraints.
// add <script src="/assets/moc_debug.js"></script> to enable this script
document.addEventListener("DOMContentLoaded", function () {
  const mocElement = document.querySelector(".moc");

  if (!mocElement) {
    console.error("MOC element not found!");
    return;
  }

  // Create debug panel
  const debugPanel = document.createElement("div");
  debugPanel.style.cssText =
    "position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 10px; font-family: monospace; z-index: 9999; max-width: 300px; font-size: 12px; max-height: 80vh; overflow-y: auto;";
  document.body.appendChild(debugPanel);

  // Track previous values to detect changes
  let prevScrollY = 0;
  let prevMocTop = 0;
  let prevMocBottom = 0;
  let isFollowing = true;
  let stickyStopped = false;
  let stoppedAtScrollY = null;

  // Position history to track patterns
  const positionHistory = [];
  const historyLimit = 5;

  // Function to update debug info
  function updateDebugInfo() {
    const mocRect = mocElement.getBoundingClientRect();
    const mocParent = mocElement.parentElement;
    const parentRect = mocParent.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(mocElement);

    // Check for changes
    const scrollYChanged = window.scrollY !== prevScrollY;
    const mocTopChanged = mocRect.top !== prevMocTop;

    // Check if MOC is still following the scroll
    // If scroll changes but MOC position doesn't, it's likely not following anymore
    if (scrollYChanged && !mocTopChanged && window.scrollY > 100) {
      if (isFollowing) {
        isFollowing = false;
        stickyStopped = true;
        stoppedAtScrollY = window.scrollY;
        console.warn(
          "MOC appears to have stopped following at scroll Y:",
          window.scrollY
        );
      }
    } else if (scrollYChanged && mocTopChanged) {
      // It's following again
      if (!isFollowing) {
        isFollowing = true;
        console.log(
          "MOC is following scroll again at scroll Y:",
          window.scrollY
        );
      }
    }

    // Store position history
    if (scrollYChanged) {
      positionHistory.unshift({
        scrollY: window.scrollY,
        mocTop: mocRect.top,
        mocBottom: mocRect.bottom,
        isFollowing: isFollowing,
      });

      // Keep history to a reasonable size
      if (positionHistory.length > historyLimit) {
        positionHistory.pop();
      }
    }

    // Update previous values
    prevScrollY = window.scrollY;
    prevMocTop = mocRect.top;
    prevMocBottom = mocRect.bottom;

    // Create history display
    const historyDisplay = positionHistory
      .map((item, index) => {
        return `<span style="opacity:${
          1 - index * 0.2
        }">Scroll: ${item.scrollY.toFixed(0)}px | Top: ${item.mocTop.toFixed(
          1
        )}px | ${item.isFollowing ? "✓" : "✗"}</span>`;
      })
      .join("<br>");

    debugPanel.innerHTML = `
      <strong>MOC Debug ${
        isFollowing ? "(Following ✓)" : "(Not Following ✗)"
      }</strong><br>
      <span style="color:${scrollYChanged ? "#ff9966" : "#7fffd4"}">Scroll Y: ${
      window.scrollY
    }px ${scrollYChanged ? "⟳" : ""}</span><br>
      <span style="color:${
        mocTopChanged ? "#ff9966" : "#7fffd4"
      }">MOC Top: ${mocRect.top.toFixed(1)}px ${
      mocTopChanged ? "⟳" : ""
    }</span><br>
      <span style="color:#7fffd4">Position: ${computedStyle.position}</span><br>
      <span style="color:#7fffd4">Parent: ${mocParent.tagName}</span><br>
      <span style="color:#7fffd4">Parent Height: ${
        parentRect.height
      }px</span><br>
      <span style="color:#7fffd4">Parent Overflow: ${
        window.getComputedStyle(mocParent).overflow
      }</span><br>
      ${
        stickyStopped
          ? `<span style="color:#ff6666">Sticky behavior stopped at: ${stoppedAtScrollY}px</span><br>`
          : ""
      }
      <br><strong>Recent Positions:</strong><br>
      ${historyDisplay}
    `;
  }

  // Track scroll events
  window.addEventListener("scroll", updateDebugInfo);
  window.addEventListener("resize", updateDebugInfo);

  // Add button to check parent constraints
  const checkButton = document.createElement("button");
  checkButton.innerText = "Check Sticky Constraints";
  checkButton.style.cssText = "margin-top: 10px; padding: 5px;";
  checkButton.onclick = function () {
    const mocParent = mocElement.parentElement;
    const mocStyle = window.getComputedStyle(mocElement);
    const parentStyle = window.getComputedStyle(mocParent);
    const htmlContent = `
      <strong>Sticky Constraint Analysis:</strong><br>
      - MOC top: ${mocStyle.top}<br>
      - MOC bottom: ${mocStyle.bottom}<br>
      - Parent position: ${parentStyle.position}<br>
      - Containing block height: ${mocParent.offsetHeight}px<br>
      - Is viewport constrained: ${
        !["absolute", "relative", "fixed", "sticky"].includes(
          parentStyle.position
        )
          ? "Yes"
          : "No"
      }<br>
    `;

    alert(htmlContent.replace(/<br>/g, "\n").replace(/<\/?strong>/g, ""));
  };
  debugPanel.appendChild(checkButton);

  // Initial debug info
  updateDebugInfo();
  console.log("Enhanced MOC Debug initialized");
});
