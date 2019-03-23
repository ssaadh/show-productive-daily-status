const config = () => {
  const initial = 'menubar=0,titlebar=0,toolbar=0';

  const width = 500;
  const height = 500;
  const left = window.screenX + ( window.innerWidth - width ) / 3;
  const top = window.screenY + ( window.innerHeight - height ) / 3;    
  const dimensions = `width=${ width },height=${ height },top=${ top },left=${ left }`;

  return `${ initial },${ dimensions }`;
};

const popup = ( url, name, specs = null ) => {
  if ( !specs ) {
    specs = config();
  }
  return window.open( url, name, specs );
}

export default popup;
