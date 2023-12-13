

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let query = document.getElementById('searchInput').value.toLowerCase();
    let content = document.body.innerText.toLowerCase();
    let index = content.indexOf(query);
    if (index !== -1) {
      let wordsBefore = content.substring(0, index).split(' ').length;
      let words = query.split(' ').length;
      let wordsToScroll = wordsBefore + words;
      let wordsToScrollArray = content.split(' ').slice(0, wordsToScroll);
      let wordsToScrollString = wordsToScrollArray.join(' ');
      let tempDiv = document.createElement('div');
      tempDiv.innerHTML = wordsToScrollString;
      document.body.appendChild(tempDiv);
      window.scrollTo(0, tempDiv.offsetHeight);
      tempDiv.remove();
    } else {
      alert('La palabra no se encontró en la página');
    }
  });