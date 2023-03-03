
const onResponse = (res, commitFn = null, actionName = null) => {
    if (res.error()) {
        console.dir(res.error())
    } else {
        if (commitFn !== null && actionName !== null) {
            commitFn(actionName, res.data());
            return res.data()
        }
    }

    return null
}

export const getPropertyVal = (attr) => {
    let res = '';
    for (let key in attr) res += attr[key]
    return res
}

export const expenseVal = exp => {
    const val = Number.parseFloat(getPropertyVal(exp.PROPERTY_143))
    return Number.isNaN(val) ? 0 : val
}

export default onResponse
