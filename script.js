const container = document.querySelector('.container');
const resetBtn = document.getElementById('reset-btn');

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

function colorSquare(square) {
  // First time the square is touched - pick a random color
  if (square.dataset.baseRed === undefined) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Remember this color for later
    square.dataset.baseRed = red;
    square.dataset.baseGreen = green;
    square.dataset.baseBlue = blue;
    square.dataset.touches = 0;
  }

  // Count how many times this square has been touched
  square.dataset.touches = parseInt(square.dataset.touches) + 1;
  const touches = parseInt(square.dataset.touches);

  // Get the original random color we picked
  let red = parseInt(square.dataset.baseRed);
  let green = parseInt(square.dataset.baseGreen);
  let blue = parseInt(square.dataset.baseBlue);

  // Make the color darker - multiply by 0.9 for each touch
  // This makes it 10% darker each time, fully black after 10 touches
  for (let i = 0; i < touches; i++) {
    red = red * 0.9;
    green = green * 0.9;
    blue = blue * 0.9;
  }

  // Round down to whole numbers
  red = Math.floor(red);
  green = Math.floor(green);
  blue = Math.floor(blue);

  // Set the darkened color
  square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
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
  styleSheet.textContent = `.grid-square { flex: 1 1 calc(100% / ${gridSize}); }`;
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
