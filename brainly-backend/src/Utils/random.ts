export const random = ()=>{
    const options = "abcdefghijklmnopqrstuvwxyz1234567890"
    let ans = ""

    for(let i = 0;i<10;i++){
        ans += options[Math.floor(Math.random()*options.length)]
    }

    return ans
}