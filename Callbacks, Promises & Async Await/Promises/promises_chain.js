const getdata = (dataid,) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("hey", dataid)
            resolve("success")

        }, 2000);
    })
}
/* 
this is doing the same things as the call backs hell is doing but it is the better way to wrote not the best the best is async and await
 */

getdata(1).then((res) => {
    console.log(res)
    getdata(2).then((res) => {
        console.log(res)
        getdata(2).then((res) => {
            console.log(res)
            getdata(2).then((res) => {
                console.log(res)
            })
        })
    })
})