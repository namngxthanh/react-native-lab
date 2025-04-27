import { StyleSheet, Text, View, ScrollView } from "react-native"; // Thêm ScrollView
import React, { useState } from "react"; // Import useState gọn hơn
import Button from "./Button"; // Giả sử Button component đã đúng

// Component Máy tính
const Mykeyboard = () => {
    // --- State Variables ---
    const [displayValue, setDisplayValue] = useState<string>("0"); // Giá trị hiển thị chính
    const [firstOperand, setFirstOperand] = useState<string | null>(null); // Toán hạng thứ nhất
    const [operator, setOperator] = useState<string | null>(null); // Toán tử đang chờ
    const [waitingForSecondOperand, setWaitingForSecondOperand] =
        useState<boolean>(false); // Cờ chờ toán hạng thứ hai

    // --- Helper Functions ---
    const performCalculation = (
        num1Str: string | null,
        num2Str: string,
        op: string | null
    ): number | null => {
        if (num1Str === null || op === null) return parseFloat(num2Str); // Nếu chưa có toán hạng 1 hoặc toán tử, trả về số hiện tại

        const num1 = parseFloat(num1Str);
        const num2 = parseFloat(num2Str);
        let res: number | null = null;

        // Hàm GCD để dùng cho LCM
        const gcd = (a: number, b: number): number => {
            a = Math.abs(a);
            b = Math.abs(b);
            while (b) {
                [a, b] = [b, a % b];
            }
            return a;
        };

        switch (op) {
            case "+":
                res = num1 + num2;
                break;
            case "-":
                res = num1 - num2;
                break;
            case "×":
                res = num1 * num2;
                break;
            case "÷":
                res = num2 !== 0 ? num1 / num2 : Infinity;
                break; // Trả về Infinity thay vì null để có thể hiển thị
            case "%":
                res = num1 % num2;
                break;
            case "^":
                res = Math.pow(num1, num2);
                break;
            case "max":
                res = Math.max(num1, num2);
                break;
            case "min":
                res = Math.min(num1, num2);
                break;
            case "avg":
                res = (num1 + num2) / 2;
                break;
            case "gcd":
                res = gcd(num1, num2);
                break;
            case "lcm":
                const commonDivisor = gcd(num1, num2);
                res =
                    commonDivisor !== 0
                        ? Math.abs(num1 * num2) / commonDivisor
                        : 0;
                break;
            case "mod":
                res = num1 % num2;
                break;
            case "random":
                res = Math.random() * (num2 - num1) + num1;
                break; // Random trong khoảng [num1, num2]
            default:
                break; // Các toán tử khác không thuộc loại này
        }
        // Làm tròn kết quả để tránh lỗi dấu phẩy động nhỏ
        return res !== null && Number.isFinite(res)
            ? parseFloat(res.toPrecision(15))
            : res;
    };

    const performUnaryOperation = (
        numStr: string,
        op: string
    ): number | null => {
        const num = parseFloat(numStr);
        let res: number | null = null;

        // Hàm tính giai thừa
        const factorial = (n: number): number | null => {
            if (n < 0 || !Number.isInteger(n)) return null; // Giai thừa chỉ xác định cho số nguyên không âm
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
                if (!Number.isFinite(result)) return Infinity; // Tránh tràn số
            }
            return result;
        };

        switch (op) {
            case "sqrt":
                res = num >= 0 ? Math.sqrt(num) : null;
                break; // Căn bậc hai số không âm
            case "1÷x":
                res = num !== 0 ? 1 / num : Infinity;
                break;
            case "x^2":
                res = Math.pow(num, 2);
                break;
            case "x^3":
                res = Math.pow(num, 3);
                break;
            case "x!":
                res = factorial(num);
                break;
            case "sin":
                res = Math.sin(num * (Math.PI / 180));
                break; // Giả sử input là độ
            case "cos":
                res = Math.cos(num * (Math.PI / 180));
                break;
            case "tan":
                // Tránh tan(90), tan(270), etc.
                const degrees = num % 360;
                res =
                    degrees % 180 === 90 || degrees % 180 === -90
                        ? Infinity
                        : Math.tan(num * (Math.PI / 180));
                break;
            case "log":
                res = num > 0 ? Math.log10(num) : null;
                break; // Log cơ số 10 số dương
            case "ln":
                res = num > 0 ? Math.log(num) : null;
                break; // Log tự nhiên số dương
            case "exp":
                res = Math.exp(num);
                break;
            case "abs":
                res = Math.abs(num);
                break;
            case "floor":
                res = Math.floor(num);
                break;
            case "ceil":
                res = Math.ceil(num);
                break;
            case "round":
                res = Math.round(num);
                break;
            case "sqrt2":
                res = Math.SQRT2;
                break; // Đây là hằng số, xử lý riêng bên dưới
            case "sqrt1÷2":
                res = Math.SQRT1_2;
                break; // Hằng số
            // case "sqrt1_3": res = Math.sqrt(1 / 3); break; // Nếu muốn thêm
            // case "sqrt1_10": res = Math.sqrt(1 / 10); break;// Nếu muốn thêm
            // case "sqrt2_2": res = Math.SQRT2 / 2; break;// Nếu muốn thêm
            default:
                break;
        }
        // Làm tròn kết quả
        return res !== null && Number.isFinite(res)
            ? parseFloat(res.toPrecision(15))
            : res;
    };

    // --- Event Handlers ---

    const handleNumberPress = (num: string) => {
        let nextValue: string;
        if (waitingForSecondOperand) {
            nextValue = num;
            setWaitingForSecondOperand(false);
        } else {
            // Ngăn nhập nhiều số 0 ở đầu hoặc nhiều dấu chấm
            if (num === "." && displayValue.includes(".")) return;
            if (displayValue === "0" && num !== ".") {
                nextValue = num;
            } else {
                nextValue = displayValue + num;
            }
        }
        // Giới hạn độ dài hiển thị (tùy chọn)
        if (nextValue.length > 15) return;
        setDisplayValue(nextValue);
    };

    const handleOperatorPress = (op: string) => {
        const currentValue = parseFloat(displayValue);

        // Xử lý toán tử một ngôi ngay lập tức
        const unaryOps = [
            "sqrt",
            "1÷x",
            "x^2",
            "x^3",
            "x!",
            "sin",
            "cos",
            "tan",
            "log",
            "ln",
            "exp",
            "abs",
            "floor",
            "ceil",
            "round",
        ];
        if (unaryOps.includes(op)) {
            if (!Number.isFinite(currentValue)) return; // Không tính toán trên Infinity/NaN
            const result = performUnaryOperation(displayValue, op);
            if (result !== null) {
                const resultStr = String(result);
                setDisplayValue(resultStr);
                // Tùy chọn: reset firstOperand nếu muốn bắt đầu lại sau phép toán một ngôi
                // setFirstOperand(null);
                // setOperator(null);
            } else {
                setDisplayValue("Error"); // Hoặc giá trị lỗi khác
            }
            setWaitingForSecondOperand(true); // Đặt cờ này để lần nhập số tiếp theo sẽ ghi đè
            return; // Kết thúc sớm cho toán tử một ngôi
        }

        // Xử lý toán tử hai ngôi
        if (firstOperand === null) {
            setFirstOperand(displayValue); // Lưu toán hạng đầu tiên
        } else if (operator && !waitingForSecondOperand) {
            // Thực hiện phép tính trước đó nếu người dùng nhập chuỗi liên tiếp (vd: 5 + 3 *)
            const result = performCalculation(
                firstOperand,
                displayValue,
                operator
            );
            if (result !== null) {
                const resultStr = String(result);
                setDisplayValue(resultStr);
                setFirstOperand(resultStr); // Kết quả trở thành toán hạng đầu tiên cho phép tính tiếp theo
            } else {
                setDisplayValue("Error");
                setFirstOperand(null); // Reset nếu có lỗi
            }
        }

        setWaitingForSecondOperand(true); // Chờ toán hạng thứ hai
        setOperator(op); // Lưu toán tử mới
    };

    const handleConstantPress = (constantKey: string) => {
        let value: number | null = null;
        switch (constantKey) {
            case "pi":
                value = Math.PI;
                break;
            case "e":
                value = Math.E;
                break;
            case "sqrt2":
                value = Math.SQRT2;
                break;
            case "sqrt1÷2":
                value = Math.SQRT1_2;
                break;
            // Thêm hằng số khác nếu cần
        }
        if (value !== null) {
            const valueStr = String(value);
            setDisplayValue(valueStr);
            setWaitingForSecondOperand(true); // Cho phép ghi đè ở lần nhập số tiếp theo
        }
    };

    const handleEqualsPress = () => {
        if (
            operator === null ||
            firstOperand === null ||
            waitingForSecondOperand
        ) {
            // Không làm gì nếu chưa đủ thông tin hoặc đang chờ số thứ hai
            return;
        }

        const result = performCalculation(firstOperand, displayValue, operator);
        if (result !== null) {
            setDisplayValue(String(result));
        } else {
            setDisplayValue("Error");
        }

        // Reset trạng thái sau khi nhấn "="
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false); // Cho phép bắt đầu nhập số mới
    };

    const clear = () => {
        setDisplayValue("0");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const toggleSign = () => {
        if (displayValue === "0") return; // Không đổi dấu số 0
        setDisplayValue((prev) =>
            prev.startsWith("-") ? prev.substring(1) : `-${prev}`
        );
        // Nếu đang chờ toán hạng 2, cập nhật luôn firstOperand nếu nó là cái vừa đổi dấu
        // (Hành vi này có thể cần điều chỉnh tùy theo logic máy tính mong muốn)
        // if (waitingForSecondOperand && firstOperand === (displayValue.startsWith("-") ? displayValue.substring(1) : `-${displayValue}`)) {
        //    setFirstOperand(displayValue);
        // }
    };

    const deleteLastDigit = () => {
        if (waitingForSecondOperand) return; // Không xóa nếu đang chờ nhập số mới
        setDisplayValue((prev) => {
            if (
                prev.length === 1 ||
                (prev.startsWith("-") && prev.length === 2)
            ) {
                return "0"; // Nếu chỉ còn 1 chữ số (hoặc dấu trừ + 1 chữ số) thì về 0
            }
            return prev.slice(0, -1); // Xóa ký tự cuối
        });
    };

    // --- Render ---
    return (
        // Bọc trong ScrollView nếu nội dung có thể vượt quá màn hình
        <ScrollView contentContainerStyle={styles.container}>
            {/* Màn hình hiển thị */}
            <View style={styles.display}>
                <Text
                    style={styles.resultText}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    {/* Hiển thị giá trị hiện tại */}
                    {displayValue}
                </Text>
                {/* (Tùy chọn) Hiển thị phép toán đang chờ */}
                {/* <Text style={styles.historyText}>
                     {firstOperand} {operator} {waitingForSecondOperand ? '...' : ''}
                 </Text> */}
            </View>

            {/* Hàng nút */}
            <View style={styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="±" isGray onPress={toggleSign} />
                <Button
                    title="%"
                    isGray
                    onPress={() => handleOperatorPress("%")}
                />
                <Button
                    title="÷"
                    isBlue
                    onPress={() => handleOperatorPress("÷")}
                />{" "}
                {/* isBlue cho toán tử chính */}
            </View>
            {/* ... các hàng nút khác tương tự ... */}
            <View style={styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button
                    title="×"
                    isBlue
                    onPress={() => handleOperatorPress("×")}
                />
            </View>
            <View style={styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button
                    title="-"
                    isBlue
                    onPress={() => handleOperatorPress("-")}
                />{" "}
                {/* Đổi title thành "-" */}
            </View>
            <View style={styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button
                    title="+"
                    isBlue
                    onPress={() => handleOperatorPress("+")}
                />
            </View>
            <View style={styles.row}>
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="⌫" isGray onPress={deleteLastDigit} />
                {/* Chuyển nút xóa lên đây */}
                <Button title="=" isBlue onPress={handleEqualsPress} />
            </View>
            {/* Hàng toán tử một ngôi / hằng số */}
            <View style={styles.row}>
                <Button
                    title="sin"
                    isGray
                    onPress={() => handleOperatorPress("sin")}
                />
                <Button
                    title="cos"
                    isGray
                    onPress={() => handleOperatorPress("cos")}
                />
                <Button
                    title="tan"
                    isGray
                    onPress={() => handleOperatorPress("tan")}
                />
                <Button
                    title="x!"
                    isGray
                    onPress={() => handleOperatorPress("x!")}
                />
            </View>
            <View style={styles.row}>
                <Button
                    title="√"
                    isGray
                    onPress={() => handleOperatorPress("sqrt")}
                />
                {/* Dùng ký hiệu √ */}
                <Button
                    title="x²"
                    isGray
                    onPress={() => handleOperatorPress("x^2")}
                />
                {/* Dùng ký hiệu mũ */}
                <Button
                    title="x³"
                    isGray
                    onPress={() => handleOperatorPress("x^3")}
                />
                <Button
                    title="1/x"
                    isGray
                    onPress={() => handleOperatorPress("1÷x")}
                />
            </View>
            <View style={styles.row}>
                <Button
                    title="log"
                    isGray
                    onPress={() => handleOperatorPress("log")}
                />
                <Button
                    title="ln"
                    isGray
                    onPress={() => handleOperatorPress("ln")}
                />
                <Button
                    title="exp"
                    isGray
                    onPress={() => handleOperatorPress("exp")}
                />
                <Button
                    title="abs"
                    isGray
                    onPress={() => handleOperatorPress("abs")}
                />
            </View>
            <View style={styles.row}>
                <Button
                    title="floor"
                    isGray
                    onPress={() => handleOperatorPress("floor")}
                />
                <Button
                    title="ceil"
                    isGray
                    onPress={() => handleOperatorPress("ceil")}
                />
                <Button
                    title="round"
                    isGray
                    onPress={() => handleOperatorPress("round")}
                />
                <Button
                    title="mod"
                    isGray
                    onPress={() => handleOperatorPress("mod")}
                />
            </View>
            <View style={styles.row}>
                <Button
                    title="max"
                    isGray
                    onPress={() => handleOperatorPress("max")}
                />
                <Button
                    title="min"
                    isGray
                    onPress={() => handleOperatorPress("min")}
                />
                <Button
                    title="avg"
                    isGray
                    onPress={() => handleOperatorPress("avg")}
                />
                <Button
                    title="gcd"
                    isGray
                    onPress={() => handleOperatorPress("gcd")}
                />
            </View>
            <View style={styles.row}>
                <Button
                    title="lcm"
                    isGray
                    onPress={() => handleOperatorPress("lcm")}
                />
                <Button
                    title="rand"
                    isGray
                    onPress={() => handleOperatorPress("random")}
                />
                <Button
                    title="π"
                    isGray
                    onPress={() => handleConstantPress("pi")}
                />
                <Button
                    title="e"
                    isGray
                    onPress={() => handleConstantPress("e")}
                />
            </View>
            {/* Xóa Text thừa ở đây */}
        </ScrollView>
    );
};

// 1. Export đúng component
export default Mykeyboard;

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Cho phép ScrollView hoạt động đúng
        // backgroundColor: '#202020', // Ví dụ màu nền tối
        paddingBottom: 20, // Thêm padding dưới cùng
    },
    display: {
        backgroundColor: "#f0f0f0", // Màu nền màn hình sáng hơn
        paddingHorizontal: 20,
        paddingVertical: 15,
        minHeight: 100, // Chiều cao tối thiểu
        justifyContent: "flex-end", // Đẩy text xuống dưới
        alignItems: "flex-end", // Căn phải text
        marginBottom: 15,
        borderRadius: 10,
        marginHorizontal: 10, // Thêm margin ngang
        marginTop: 20, // Thêm margin trên
    },
    resultText: {
        fontSize: 50, // Tăng cỡ chữ hiển thị chính
        fontWeight: "300", // Font nhẹ hơn
        color: "#333", // Màu chữ tối hơn
    },
    // historyText: { // Style cho phần hiển thị lịch sử (tùy chọn)
    //    fontSize: 20,
    //    color: '#888',
    // },
    row: {
        flexDirection: "row",
        justifyContent: "space-around", // Phân bố đều khoảng cách
        marginBottom: 10,
        paddingHorizontal: 5, // Giảm padding ngang của hàng để nút gần nhau hơn
    },
    // Các style cho Button đã nằm trong component Button.tsx
});
