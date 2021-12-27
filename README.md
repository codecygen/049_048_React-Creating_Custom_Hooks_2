# Searchable Keywords
Here in this project, there are 2 components such as  "BackwardCounter.js" and "ForwardCounter.js". They countain exactly the same code. The only difference is one of them has "+" and the other has "-" sign. So refactoring this code and having a custom hook is necessary in here.

- React-Custom_Hooks_Function_File

- React-Custom_Hooks_Function-Calling_Custom_Hook_From_Component

Here in "NewTask.js", bind method is used to take second parameter into a function. Check out how it is done in "NewTask.js" and go to this link to learn more about bind method in Javascript.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

```Javascript
const arg1 = 'Aras';

const arg2 = 'Songul';

const arg3 = 'Nafiz';

const makeSentence = (a, b) => {
	console.log(`Names are ${a} and ${b}.`);
};

// Here we say that make a new function, bind to "makeSentence" function
// then assign "arg2" as a first parameter
const boundFunction = makeSentence.bind(null, arg2);

// This is a preset function and it is bound to "makeSentence"
// function and the first parameter "a" is always "arg2 = 'Songul'"
// Even though, here we set 2 parameters for "boundFunction", since the first parameter
// is set to "Songul" already for "makeSentence", the second parameter "b" will be assigned
// as "arg1 = 'Aras'" for "makeSentence" function. Since first parameter is "Songul" and second
// parameter is "Aras" the output will be like this:

// Output: "Names are Songul and Aras."
boundFunction(arg1, arg3);
```