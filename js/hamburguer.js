
document.addEventListener('DOMContentLoaded', function() {
    let showBtn = document.querySelector(".show");
    let hiddenList = document.querySelector(".hidden-list");
   
 
    showBtn.addEventListener('click', function() {
      if (hiddenList.style.display === 'none') {
        hiddenList.style.display = 'block';
      } else {
        hiddenList.style.display = 'none';
      }
    });
 
   document.addEventListener('click', function(event) {
      if (event.target !== showBtn && !showBtn.contains(event.target) && event.target !== hiddenList && !hiddenList.contains(event.target)) {
       hiddenList.style.display = 'none';
      }
   });
  });