const container = document.querySelector('.container');
const resetBtn = document.getElementById('reset-btn');

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  return color;
}

function colorSquare(square) {
  if (square.dataset.count === undefined) {
    square.style.backgroundColor = getRandomColor();
    square.dataset.count = 0;
  }

  square.dataset.count = parseInt(square.dataset.count) + 1;
  const count = parseInt(square.dataset.count);

  const opacity = 1 - count * 0.1;

  if (opacity > 0) {
    square.style.opacity = opacity;
  } else {
    square.style.opacity = 0;
  }
}

function createGrid(gridSize) {
  container.innerHTML = '';

  const totalSquares = gridSize * gridSize;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');

    // When mouse enters the square
    square.addEventListener('mouseenter', function () {
      colorSquare(square);
    });

    // When finger touches the square (mobile)
    square.addEventListener('touchstart', function () {
      colorSquare(square);
    });

    container.appendChild(square);
  }

  // Update the grid size with CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent =
    '.grid-square { flex: 1 1 calc(100% / ' + gridSize + '); }';
  document.head.appendChild(styleSheet);
}

// When the button is clicked
resetBtn.addEventListener('click', function () {
  const userInput = prompt('Enter the number of squares per side (e.g., 16):');

  if (userInput !== null) {
    const gridSize = parseInt(userInput, 10);

    if (gridSize > 0 && gridSize <= 100) {
      createGrid(gridSize);
    } else if (gridSize > 100) {
      alert('Please enter a number between 1 and 100.');
    } else {
      alert('Please enter a positive number.');
    }
  }
});

createGrid(16);
