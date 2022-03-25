const btn = document.getElementById('backword');
btn.style.backgroundColor = "#004f40";

btn.addEventListener('click', function onClick() {
    btn.removeEventListener("click", onClick);
    btn.style.backgroundColor = 'salmon';
}, true);


/*var start = 97,
    end = 122,
    button;

while (start <= end) {
    button = document.createElement("button");
    button.id = button.textContent = String.fromCharCode(start);
    document.body.appendChild(button);
    start += 1;
}

document.addEventListener("keypress", function onKeypress(evt) {
    var element = document.getElementById(String.fromCharCode(evt.charCode || evt.char));

    if (element) {
        document.addEventListener("keyup", function onKeyup() {
            document.removeEventListener("keyup", onKeyup);

            element.style.backgroundColor = "yellow";
        }, false);

        element.style.backgroundColor = "#004f40";
    }
}, false);*/