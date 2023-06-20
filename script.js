const grid = document.querySelector("#grid");
const divs = [];
const colorPicker = document.querySelector("#colorPicker");
const slider = document.querySelector("#myRange");
const p = document.querySelector("#cellNumber");
const eraser = document.querySelector("#eraser");
const reset = document.querySelector("#reset");



colorPicker.value = '#000000';
let color = colorPicker.value
let drawing = false ;

grid.setAttribute("draggable","false");
slider.value = 16 ;
p.textContent = `${slider.value} x ${slider.value} `;
drawGrid(16);

slider.addEventListener("input",(event) => {
    p.textContent = `${slider.value} x ${slider.value} ` ;
    drawGrid(slider.value);
});

colorPicker.addEventListener('input',(event) => color = event.target.value);


function drawGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    removeAllChildNodes(grid);
    for (let i = 0; i < size * size; i++) {
        let div = document.createElement('div');
        div.classList.add("cell");
        div.setAttribute("draggable","false")
        div.addEventListener('mousedown',(event) => {
            drawing = true;
            event.target.style.backgroundColor = color ;
        } )
        div.addEventListener('mouseup',() => drawing = false )
        div.addEventListener('mousemove',(event) => changeColor(event.target))
        divs.push(div);
        grid.appendChild(div);
    }
}

function changeColor(target) {
    if ( drawing ) {
        target.style.backgroundColor = color ;
    }
    
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

grid.addEventListener("mouseleave",(event) => drawing = false)


reset.addEventListener("click", (event) => {
    colorPicker.value = '#000000';
    color = colorPicker.value
    drawing = false ;
    slider.value = 16 ;
    p.textContent = `${slider.value} x ${slider.value} `;
    drawGrid(16);
})


eraser.addEventListener("click", (event) => {
    colorPicker.value = '#ffffff';
    color = colorPicker.value
})