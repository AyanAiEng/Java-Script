/* go to this link to learn more  
https://www.notion.so/API-JSON-2e9c7e18e5628055ae03f7c8eb105809
and the markdon file also

this is a post request in which we have the menu and now ewe are giving the order

async function Post_request() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Ayan",
            email: "ayan@example.com"
        })
    })
    
    const data = await res.json()
    console.log(data)
    
}

Post_request()

we are editing the profile mean we have order the food and now we asking the waiter to changing the food

async function Put_request() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Updated Name",
            email: "updated@email.com"
        })
    })
    
    const data = await res.json()
    console.log(data)
}

Put_request()

Now we deleting the order

async function delete_request() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1",{
        method:"DELETE"
    })
    console.log("Deleted",res.status)
    const data = await res.json()
    console.log(data)
}

delete_request()
*/