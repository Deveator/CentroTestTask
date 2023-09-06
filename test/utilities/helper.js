

export async function verifyPageTitle(title) {

    await $('//title').waitUntil(async function () {
        return (await this.getHTML(false)).includes(title);
    }, {
        timeout: 30000,
        timeoutMsg: 'Actual title is not as expected'
    });
};

export async function getAttributes(elements, attributeVal) {
    let arr = [];
    for (let element of elements) {
        arr.push(await element.getAttribute(attributeVal))
    }
    return arr;
};

export async function getText(elements) {
    let arr = [];
    for (let element of elements) {
        arr.push(await element.getText())
    }
    return arr;
};

export async function containsDuplicates(arr) {
    return new Set(arr).size !== arr.length;
};

export async function convertArrayInNumbers(arr) {
    return arr.map(Number);
};

export const arrayWithNumberInRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );