window.addEventListener( 'load', function() {
    let zoom = 1;
    let box = document.getElementById('scale-wrap');

    document.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
            box.style.transform = `scale(${(zoom += 0.02)})`;
        } else if (box.getBoundingClientRect().width >= 30) {
            box.style.transform = `scale(${(zoom -= 0.02)})`;
        }
    });
}, false);
