export default class Counter {
  constructor(count, countDisplay, historyDiv) {
    this.count = count;
    this.countDisplay = countDisplay;
    this.historyDiv = historyDiv;
    this.track = [];
    this.trackUndo = [];
  }

  increment(value) {
    let previousValue = this.count;
    this.count += value;
    this.track.push({
      operation: "plus",
      value: value,
    });
    this.countDisplay.innerText = this.count;
    this.showHistory(value, "+", previousValue);
  }

  decrement(value) {
    let previousValue = this.count;
    this.count -= value;
    this.track.push({
      operation: "minus",
      value: value,
    });
    this.countDisplay.innerText = this.count;
    this.showHistory(value, "-", previousValue);
  }

  undo() {
    let previousValue = this.count;

    if (this.track.length > 0) {
      let last = this.track.pop();
      this.trackUndo.push(last);
      if (last.operation === "minus") {
        this.count += last.value;
        this.showHistory(last.value, "+", previousValue);
      } else {
        this.count -= last.value;
        this.showHistory(last.value, "-", previousValue);
      }
      countDisplay.innerText = this.count;
    }

    this.disableRedo();
  }

  redo() {
    let previousValue = this.count;

    if (this.trackUndo.length > 0) {
      let last = this.trackUndo.pop();
      this.track.push(last);
      if (last.operation === "minus") {
        this.count -= last.value;
        this.showHistory(last.value, "-", previousValue);
      } else {
        this.count += last.value;
        this.showHistory(last.value, "+", previousValue);
      }
      countDisplay.innerText = this.count;
    }
    this.disableRedo();
  }

  showHistory(value, operator, previousValue) {
    let historyContainer = document.getElementById("historyContainer");

    historyContainer.classList.add("showHistory");
    historyContainer.classList.remove("hideHistory");
		
    let historyContent = document.createElement("p");
    historyContent.setAttribute("style", "padding: 0.5em; text-align: center");
    historyContent.innerText = `${operator}${value}   (${previousValue} => ${this.count})`;
    this.historyDiv.prepend(historyContent);
  }

  disableRedo() {
    let redoButton = document.getElementById("redo");
    if (this.trackUndo.length > 0) {
      redoButton.classList.remove("disableButton");
    } else {
      redoButton.classList.add("disableButton");
    }
  }
}
