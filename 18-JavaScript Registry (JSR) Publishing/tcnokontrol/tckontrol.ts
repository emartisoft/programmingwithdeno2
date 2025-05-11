/**
* Turkish ID Number (TC No) validation function
* @param tcNo - The TC No to validate
* @returns Whether the TC No is valid
*
* @example
* ```ts
* import { kontrolEt } from "./tckontrol.ts";
* const tcNo = "11111111110"; // Example (invalid) TC No
* console.log(`Is valid? ${kontrolEt(tcNo) ? "Yes" : "No"}`);
* ```
*/
export function kontrolEt(tcNo: string): boolean {
    // 1. Must be 11 digits
    if (tcNo.length !== 11) return false;
    // 2. First digit cannot be '0'
    if (tcNo[0] === "0") return false;
    // Convert each character to a number
    const digits = tcNo.split("").map(Number);
    // 3. Sum of first 10 digits modulo 10 must equal the 11th digit
    const sumFirstTen = digits.slice(0, 10).reduce((a, b) => a + b, 0);
    if (sumFirstTen % 10 !== digits[10]) return false;
    // 4. (Sum of odd-positioned digits * 7 − sum of even-positioned digits) % 10 === 10th digit
    const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
    if (((sumOdd * 7 - sumEven) % 10) !== digits[9]) return false;
    return true;
}

// If run as a script, test with a sample TC No
if (import.meta.main) {
    const tcNo = "11111111110";
    console.log(`Is valid? ${kontrolEt(tcNo) ? "Yes" : "No"}`);
}
