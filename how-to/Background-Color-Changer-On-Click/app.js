const btn = document.getElementById("btn");
let randonNum = () => {
    return Math.floor(Math.random() * 256);
}
let changeColor = () => {
    let randomColor = `rgb(${randonNum()}, ${randonNum()}, ${randonNum()})`;
    document.body.style.backgroundColor = randomColor;
}
btn.addEventListener("click", changeColor);
window.addEventListener("load",changeColor);