import Counter from "./counter.js";

let count = 0;

let countDisplay = document.getElementById("countDisplay");
let historyDiv = document.getElementById("history");

let undoButton = document.getElementById("undo");
let redoButton = document.getElementById("redo");

let plus1 = document.getElementById("plusOne");
let plus10 = document.getElementById("plusTen");
let plus100 = document.getElementById("plusHundred");

let minus1 = document.getElementById("minusOne");
let minus10 = document.getElementById("minusTen");
let minus100 = document.getElementById("minusHundred");

let instance = new Counter(count, countDisplay, historyDiv);

plus1.addEventListener("click", () => {
  instance.increment(1);
});

plus10.addEventListener("click", () => {
  instance.increment(10);
});

plus100.addEventListener("click", () => {
  instance.increment(100);
});

minus1.addEventListener("click", () => {
  instance.decrement(1);
});

minus10.addEventListener("click", () => {
  instance.decrement(10);
});

minus100.addEventListener("click", () => {
  instance.decrement(100);
});

undoButton.addEventListener("click", () => {
  instance.undo();
});

redoButton.addEventListener("click", () => {
  instance.redo();
});
