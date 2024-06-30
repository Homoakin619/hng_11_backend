async function main(){
    const request = await fetch('http://ip-api.com/batch',{
        method: "post",
        body: JSON.stringify(['102.88.32.155'])
    })
    const response = await request.json()
    console.log(response)
}

main()