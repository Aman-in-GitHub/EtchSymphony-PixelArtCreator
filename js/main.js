import domtoimage from 'dom-to-image';

const container = document.querySelector('.container');
const bgColor = document.querySelector('.background');

const brushColor = document.querySelector('.brush');
const eraser = document.querySelector('.eraser');
const clear = document.querySelector('.clear');
const range = document.querySelector('.range');
const lines = document.querySelector('.grid-lines');
const click = document.querySelector('.click');

let mousedown = false;

function styleContainer() {
  const val = range.value;
  let width = 550;
  container.style.width = width + 'px';
  container.style.height = width + 'px';
  container.style.backgroundColor = `${bgColor.value}`;

  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${val}, 1fr)`;

  const num = val;

  for (let a = 0; a < num; a++) {
    for (let i = 0; i < num; i++) {
      const div = document.createElement('div');
      div.className = 'boxes';
      div.style.height = width / num + 'px';
      div.style.width = width / num + 'px';
      div.style.border = '1px solid rgb(200,200,200,0.3)';
      container.append(div);
    }
  }
}

styleContainer();

container.addEventListener('pointerdown', () => {
  mousedown = true;
});

container.addEventListener('pointerleave', () => {
  mousedown = false;
});

container.addEventListener('pointerup', () => {
  mousedown = false;
});

container.addEventListener('mousemove', (e) => {
  if (mousedown == false) return;
  if (!e.target.matches('.boxes')) return;
  const box = e.target;
  box.style.backgroundColor = `${brushColor.value}`;
});

container.addEventListener('click', (e) => {
  if (!e.target.matches('.boxes')) return;
  const box = e.target;
  box.style.backgroundColor = `${brushColor.value}`;
});

bgColor.addEventListener('change', () => {
  container.style.backgroundColor = `${bgColor.value}`;
});

let eraseActive = false;

function eraseeee() {
  if (!eraseActive) {
    container.addEventListener('mousemove', eraseBits);
    eraser.style.backgroundColor = 'rgb(156 163 175)';
  } else {
    container.removeEventListener('mousemove', eraseBits);
    eraser.style.backgroundColor = 'rgb(243 244 246)';
  }

  eraseActive = !eraseActive;
}

eraser.addEventListener('click', eraseeee);

clear.addEventListener('click', () => {
  const box = document.querySelectorAll('.boxes');
  box.forEach((element) => {
    element.style.backgroundColor = 'transparent';
  });
});

function clearCanvas() {
  container.innerHTML = '';
}

range.addEventListener('change', () => {
  clearCanvas();
  styleContainer();
});

range.addEventListener('input', () => {
  lines.innerText = `Size: ${range.value} X ${range.value}`;
});

function eraseBits(e) {
  if (!e.target.matches('.boxes')) return;
  const box = e.target;
  box.style.backgroundColor = '';
}

function takePhoto() {
  const box = document.querySelectorAll('.boxes');
  box.forEach((item) => {
    item.style.border = '';
  });
  domtoimage
    .toJpeg(document.querySelector('.container'), { quality: 1 })
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'EtchSymphony.jpeg';
      link.href = dataUrl;
      link.click();

      box.forEach((item) => {
        item.style.border = '1px solid rgb(200,200,200,0.3)';
      });
    });
}

click.addEventListener('click', takePhoto);

if (window.matchMedia('(max-width: 1200px)').matches) {
  document.body.innerHTML = '';
  document.body.style.fontSize = '3.8rem';
  document.body.style.fontWeight = '600';
  document.body.style.padding = '0 15px';
  document.body.innerText = 'Please visit using a computer :)';
}
