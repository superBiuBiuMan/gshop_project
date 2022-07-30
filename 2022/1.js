// // // const paddingNum = num => (num).toLocaleString('en-US')

// // // var a = paddingNum(100000);
// // // console.log(a);

// // // var a = "123456"
// // // console.log(a.slice(-3));

// // var b = paddingNum(9123456);
// // console.log(b);
// // function paddingNum(inputNum){
// //     let flag = inputNum > 0 ? true : false;
// //     let numArr = Math.abs(inputNum).toString().split('.');
// //     let right = numArr[1] ? '.'+numArr[1] : '';
// //     let left = numArr[0];
// //     let temp = '';
// //     while(left.length > 3){
// //         temp = ',' + left.slice(-3) + temp;
// //         console.log(temp);
// //         console.log(left.slice(-3));
// //         left = left.slice(0,left.length-3);
// //     }
// //     return flag? left+temp + right : '-'+left+temp+right;
// // }

// function getNumber() {
//     let number = [];
//     let i = 1;
//     while (i <= 200) {
//         if (i % 3 == 0 && i % 5 == 0) {
//             number.push(i);
//         }
//         i++;
//     }
//     return number;
// }
// var a = getNumber();
// console.log(a);

// console.log(null ==undefined);

console.log(reverse("the	sky	is												blue!"));

function reverse(str){
    console.log(Array.join);
    // var a= Array.join.call(str," ");
    // console.log(a);
}