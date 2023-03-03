export const rounding = (v) => {
    if (v === 100) return v
    return parseFloat(v).toFixed(2)
};