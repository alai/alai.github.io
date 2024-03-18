window.addEventListener("DOMContentLoaded", function() { // on page DOMContentLoaded
  // console.log('plugins loaded.')
  const sups = document.querySelectorAll('sup')
  sups.forEach(s => {
    s.addEventListener('click', event=> {
      alignSideNote(event.target);
    })
  });
});

function getOffset(el) {
  // get element's postion, left & top
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function alignSideNote(t_footnote) {
  // align the side note y position according to the clicking footnote
  // and show it using style.opacity attrubute for fade-in effect
  let side_note_id = "footnote-" + t_footnote.innerText;
  //console.log('displaying', side_note_id)
  el_side_note = document.getElementById(side_note_id);
  align_position_top = (getOffset(t_footnote).top-10).toString() + "px";
  el_side_note.style.top = align_position_top;
  console.log(el_side_note)
  if (el_side_note.style.opacity == "" || el_side_note.style.opacity == "0") {
    el_side_note.style.opacity = "1";
  } else {
    el_side_note.style.opacity = "0";
  }
}

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