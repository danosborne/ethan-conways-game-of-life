/*
 Plans and ideas:

 1. Remove the hard coding of the 20x20 grid everywhere:
   - main.css board size calc - do it in JS instead
   - initial game state - should be algorithmic, like createInitialState(200,200).then(addSpider(0,0)).then(addGlider(150, 175)); etc.
   - wrap() function encapsulates the grid size too - :grimacing:
   - tick() and render() functions

2. Add functions to programatically build initial states at a given top/left coordinate, say.

3. 

*/
import board from 'components/board';
import lifeform from 'components/lifeform';
import 'main.css';

const X = 'x';
const O = 'O';

let ANIM_ID = undefined;

let gameState = 
  [
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, X, O, O, X, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, X, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, X, O, O, O, X, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, X, X, X, X, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O]
  ];

let boardElement;

const game = () => {
  boardElement = board();

  document.body.onclick = () => {
    console.log('handling body click. anim id:', ANIM_ID);
    if (ANIM_ID) {
      clearInterval(ANIM_ID)
      ANIM_ID = undefined;
    } else {
      ANIM_ID = setInterval(loop, 200);
    }
  }
};

const loop = () => {
  tick();
  render();
};

const wrap = (x) => (x%20 + 20)%20;

const isAlive = (l) => l === X;

const countNeighbours = (i, j) => {
  const neighbourPositions = [
    [wrap(i-1), wrap(j-1)], [wrap(i-1), wrap(j)], [wrap(i-1), wrap(j+1)],
    [wrap(i), wrap(j-1)], [wrap(i), wrap(j+1)],
    [wrap(i+1), wrap(j-1)], [wrap(i+1), wrap(j)], [wrap(i+1), wrap(j+1)]
  ];
  return neighbourPositions.reduce((acc, [x, y]) => {
    return acc + (isAlive(gameState[x][y]) ? 1 : 0);
  }, 0);
};

const tick = () => {
  // console.log('TICK1:', gameState);
  const nextGameState = [];
  for (let i = 0; i < 20; i++) {
    let row = gameState[i];
    nextGameState[i] = [...row];
    let nextGameStateRow = nextGameState[i];
    for (let j = 0; j < 20; j++) {
      let cell = row[j];
      const count = countNeighbours(i, j);
      console.log('tick', i, j, count);
      if (isAlive(cell)) {
        if (count === 2 || count === 3) {
          nextGameStateRow[j] = X; // STAYS ALIVE 
        } else {
          nextGameStateRow[j] = O; // DIES
        }
      } else if (count === 3) {
        nextGameStateRow[j] = X; // REVIVES
      }
    }
  }
  // console.log('TICK2:', nextGameState);
  gameState = nextGameState;
};

const render = () => {
  // console.log('rendering game state');
  removeAllChildNodes(boardElement);
  for (let i = 0; i < 20; i++) {
    let row = gameState[i];
    for (let j = 0; j < 20; j++) {
      let cell = row[j];
      boardElement.appendChild(lifeform(row[j] === X, {top: i * 25, left: j * 25}));
    }
  }
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

game();