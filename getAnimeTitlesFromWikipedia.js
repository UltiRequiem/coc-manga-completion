/* eslint-disable no-undef */
// Wikipedia uses jquery

let anime = '';

$('#mw-pages li').each(() => {
  anime += `${$(this).text()}\n`;
});

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

download(`${$('#firstHeading').text()}.txt`, anime);

// Credits: https://anime.stackexchange.com/questions/31426
