//CONSTANTS
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 700;
const SPEED = 1; // The higher the slower
const HIGHLIGHT_COLOUR = "red"
const STROKE_COLOUR = "black"
const COLOUR = "green"

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.border = "solid 1px black"

class Rectangle { // template for all "bars"
    constructor(xPos, yPos, width, height, fillColour, strokeColour) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.fillColour = fillColour;
        this.strokeColour = strokeColour;
    }

    draw(ctx) { // function to draw bar
        ctx.beginPath();
        ctx.fillStyle = this.fillColour;
        ctx.fillRect(this.xPos, this.yPos - this.height, this.width, this.height); // adjust for bottom alignment
        ctx.strokeStyle = this.strokeColour;
        ctx.strokeRect(this.xPos, this.yPos - this.height, this.width, this.height);
        ctx.closePath();
    }
}

let rectangles = []; // array to store bars
let sortingInterval = null; // interval taken to animate sorting

const getNumber = () => { // get number of elements
    return Number(document.querySelector('.inputNumber').value);
};

const getArray = () => { // get array from input
    const inputElement = document.querySelector('.inputElements');
    const inputString = inputElement.value;

    const numbersArray = inputString.split(' ').map(Number);
    return numbersArray.filter(num => !isNaN(num));
};

const drawRectangles = (array, highlightIndices = []) => { // draw bars
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;

    for (let i = 0; i < array.length; i++) {
        const height = (canvas.height * array[i]) / Math.max(...array); // scale height to canvas
        const rect = new Rectangle(
            i * barWidth, // xPos
            canvas.height, // yPos
            barWidth, // width
            height, // height based on value
            highlightIndices.includes(i) ? HIGHLIGHT_COLOUR : COLOUR,
            STROKE_COLOUR
        );
        rect.draw(ctx);
    }
};

const bubbleSortVisualize = (array) => {
    let i = 0;
    let j = 0;

    sortingInterval = setInterval(() => {
        if (i < array.length) {
            if (j < array.length - i - 1) {
                drawRectangles(array, [j, j + 1]); // highlight current comparison
                if (array[j] > array[j + 1]) {
                    // Swap values
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            clearInterval(sortingInterval); // stop sorting animation
            drawRectangles(array); // sorted array
        }
    }, SPEED); // Adjust the delay for animation speed
};

const start = () => {
    const numberOfElements = getNumber();
    const unsortedArray = getArray();

    if (unsortedArray.length !== numberOfElements) {
        alert("Number of elements doesn't match the specified count!");
        return;
    }

    // Draw unsorted rectangles
    drawRectangles(unsortedArray);

    // Start sorting visualization after a short delay
    setTimeout(() => {
        bubbleSortVisualize(unsortedArray);
    }, 1000); // Delay before sorting starts
};

// EXAMPLE (160 elements)
/*
89 714 44 907 219 606 930 345 151 324 82 292 382 530 983 153 373 288 578 23 674 846 507 59 768 118 468 205 65 213 417 814 704 527 569 990 60 555 34 93 121 424 317 450 168 83 776 283 297 381 154 528 856 261 573 830 193 220 479 227 160 557 694 749 972 564 834 235 364 71 280 391 746 460 586 355 274 735 438 281 943 588 848 820 712 674 580 857 957 524 416 108 822 484 508 908 616 343 287 282 284 632 781 549 963 102 271 957 124 498 756 643 289 118 904 745 314 839 283 207 535 823 981 390 503 743 862 506 129 591 17 980 686 74 983 317 258 531 671 517 106 423 657 678 618 515 167 191 264 551 382 947 613 54 168 912 756 23 274 89
*/

// EXAMPLE: (100 elements)
/* 
89 714 44 907 219 606 930 345 151 324 82 292 382 530 983 153 373 288 578 23 674 846 507 59 768 118 468 205 65 213 417 814 704 527 569 990 60 555 34 93 121 424 317 450 168 83 776 283 297 381 154 528 856 261 573 830 193 220 479 227 160 557 694 749 972 564 834 235 364 71 280 391 746 460 586 355 274 735 438 281 943 588 848 820 712 674 580 857 957 524 416 108 822 484 508 908 616 343 287 282
*/

//EXAMPLE: (50 elements)
/*
284 632 781 549 963 102 271 957 124 498 756 643 289 118 904 745 314 839 283 207 535 823 981 390 503 743 862 506 129 591 17 980 686 74 983 317 258 531 671 517 106 423 657 678 618 515 167 191 264 551
*/

//EXAMPLE: (10 elements)
/*
382 947 613 54 168 912 756 23 274 89
*/