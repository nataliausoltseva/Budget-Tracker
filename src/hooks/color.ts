const randomNum = () => Math.floor(Math.random() * 255);
const componentToHex = () => {
    var hex = randomNum().toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export const randomHex = () => "#" + componentToHex() + componentToHex() + componentToHex() + "99"