const randomNum = () => Math.floor(Math.random() * 255);
const componentToHex = () => {
    var hex = randomNum().toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export const randomHex = () => "#" + componentToHex() + componentToHex() + componentToHex() + "99";

export const getMainColour = (isDarkMode: boolean, isSelected: boolean) => {
    if (isDarkMode) {
        return isSelected ? "#A78DFF" : "white";
    }

    return isSelected ? "#01B0E6" : "black"
}
