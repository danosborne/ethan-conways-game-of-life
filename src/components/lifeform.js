
function lifeform(state, position) {
  const {top, left} = position;
  // console.log('lifeform => ', state, top, left);
  const lf = document.createElement('div');
  lf.className = `lifeform ${!!state ? 'on' : 'off'}`;
  lf.style.top = `${top}px`;
  lf.style.left = `${left}px`;
  return lf;
}
export default lifeform;