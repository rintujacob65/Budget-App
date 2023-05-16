console.log('utils is running');

 const square = (x) => x * x;

 const add = (a,b) => a + b;

 const isSenior = (a) => a >= 65;



// const square = (x) => x * x;

// const add = (a,b) => a + b;

const subtract = (a, b) => a - b;

//export default subtract;

export { square, add, subtract ,isSenior as default};

//export { square, add };

//exports - default export - named exports