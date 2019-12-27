const DEVELOPMENT = 'development';
const STYLE = 'padding-left: 2px; background: #222; color: #ccc; border-radius: 2px'

console.dev = function(){
  if (process.env.NODE_ENV === DEVELOPMENT) console.log.apply(this, ['%cDEV:', STYLE, ...arguments]);
};
