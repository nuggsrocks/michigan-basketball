export const findPerGame = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b) / arr.length) * 10) / 10;
};

export const findFieldGoalPercentage = (fieldGoalsMadeArr, fieldGoalsAttemptedArr) => {
    return Math.round((fieldGoalsMadeArr.reduce((a, b) => a + b) / fieldGoalsAttemptedArr.reduce((a, b) => a + b)) * 1000) / 10;
};

export const findPer40Mins = (valueArr, minsArr) => {
    let valueSum = valueArr.reduce((a, b) => a + b);
    let minsSum = minsArr.reduce((a, b) => a + b);
    return Math.round((valueSum / (minsSum / 40)) * 10) / 10;
};

export const findMedian = (arr) => {
    let res;
    let sortedArr = arr.sort((a, b) => b - a);
    if (sortedArr.length % 2 !== 0) {
        res = sortedArr[(sortedArr.length - 1) / 2];
    } else {
        res = (sortedArr[sortedArr.length / 2] + sortedArr[(sortedArr.length / 2) - 1]) / 2;
    }
    return res;
};

export const standardDeviation = (data) => {
    let mean = data.reduce((a, b) => a + b) / data.length;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push(Math.pow(data[i] - mean, 2));
    }
    return Math.sqrt(arr.reduce((a, b) => a + b) / data.length);
};