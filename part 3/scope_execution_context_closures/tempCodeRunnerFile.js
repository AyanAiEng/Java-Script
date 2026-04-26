
function lexical_scoping() {
    let a = 12;
    function inneer() {
        console.log(a)
    }
    inneer()
}

