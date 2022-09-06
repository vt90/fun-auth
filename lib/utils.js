export const splitInterval = (left, right, parts) => {
    const result = [];
    const delta = (right - left) / (parts - 1);
    while (left < right) {
        result.push(left.toFixed(2));
        left += delta;
    }
    result.push(right);
    return result;
}
