//window.alert("Welcome to Aplus Academy!");
 console.log("Script loaded successfully.");
console.warn("This is a warning message."); 

let height = 25;
let width = 15;
let area= height * width;
console.log("the area of rectangle is " + area);


document.body.style.backgroundColor = "lightblue";

let submitbutton = document.getElementById("mybutton");
 let age = document.getElementById("age");
// Event listener for button click
submitbutton.addEventListener("click", function() {
   
    let ageValue = age.value;
  if (ageValue >15 && ageValue <60) {
        alert("you are eligiable for our academy.");
    } else {
        alert("Sorry, you are not eligible for our academy.");
    }
});

let x = 100;
let y = 6;
console.log(x + y)
console.log("enter 10 numbers");
let numbers = [];
for (let i=0; i<10; i++){
    numbers.push(i);   
}
console.log(" the numbers you entered are : " + numbers);
