/* // closures hote hai functions jo ki kisi parent fnc ke andar ho aur andar waala function return ho raha ho, and retyurning fnc youse kare, parent function ka koi variable

// faayde nuksaan par
// private variables
// global pollution

function abcd() {
    let b = 1;
    return function inner() {
        b++
        console.log(b)
    }
}

let fnc = abcd()

fnc()
fnc()
fnc()
fnc()
fnc()

bhai jab apna function return kia or us ko vairabel ma save kia to jo parent vairabel ho ta han wo destroy ho jata han par hum un ko use kar ka console .log kar raha ha kyun ka closures ki copy bana jati ha  or hum un copy ko use kar ka variable or other thing ko use karta ha nicha or achi tarha sa likha hua ha 
// ye sach hai fnc ke khatam hone pe aapka fnc and uske variables khtm hojaate hai, par jab bhi closure banta hai to aapka fnc aur uske variables ka ek backlink bnaya jaata hai aur uska naam hota haio [[environment]] */