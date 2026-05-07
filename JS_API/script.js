/* this is a fake api just for larning and testing 

there is a difference between api and api key so please read the md file for it 


When an API sends data over the internet, it sends it as JSON text, which is just a string in a standardized format, not a real JavaScript object that JS can directly use. A JavaScript object is an actual usable data structure where you can access properties and manipulate data, but JSON is only a text representation of that object used for transferring data between systems. So when fetch() gets a response, the data is still in JSON text form inside the response body, and response.json() converts that JSON text into a real JavaScript object or array so your program can actually use, display, loop through, or manipulate the data on the UI.


Final understanding (very important)

After .json():

Data is NOT a string anymore ❌
Data becomes JavaScript object/array ✔
typeof shows "object" (even for arrays

*/
fetch("https://jsonplaceholder.typicode.com/users").then((res) => {

    //  if we console.log(typeof(res)) this will return a js object but we want a 


    return res.json()
}).then((data) => {

    // after the conversion json it covert to array but it stiil shoe that the typeof data is object beacuse internally js treat array as a object type

    console.log(typeof(data))
}).catch(() => {
    console.log("something wnet wrong")
}) 

fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
    console.log(res)
})


// thsi is one of the way we can do this but we donot use Promise in produuction leeve systemw e usually use async and await


async function APi_Call(){
/*     
    Real-life analogy 🧠
    Without await:

    You order food and immediately check the box:
    “Where is my food?” → “still cooking (Promise)”

    With await:

    You wait until food is ready:
    “Here is your food” → actual result
 */
    const urls = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await urls.json()
    console.log(data)

}

// this is the best way to do this is how the production code is written with async function awaait}

APi_Call()