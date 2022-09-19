let x = 1233211

let isPalindrome = function (x) {
    let arr = new Array ((x + '').length)
    for (let i = (x + '').length; i >= 0; i--) {
        arr[i] = Math.abs(x % 10)
        x = (x - x % 10) /10
        console.log(x)
    }
    let rarr = arr.reverse()
    return arr == rarr
}

console.log(isPalindrome())