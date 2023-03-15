//checks if name is more than 3 characters
export const isValidName = (name) => {
    if (name.length <= 3) {
        return "Project Name should be more than 3 characters"
    }    
    return ""
}

//checks if dimension is greater than 1
export const isValidDimension = (dimension) => {
    if (dimension % 1 !== 0) {
        return "Please input a whole number"
    }
    if (dimension < 1) {
        return "Number should be greater or equal to 1"
    }
    return ""
}

//check if valid frequency
export const isValidFrequency = (frequency) => {
    const parsedFloat = parseFloat(frequency);
    if (parsedFloat < 1) {
        return "Number should be greater or equal to 1"
    }
    if (!checkDecimalPlace(parsedFloat)) {
        return "Number should be up to 1d.p."
    }
    return ""

}

//helper function to check for up to 1d.p.
function checkDecimalPlace(num) {
    return /^[0-9]+(\.[0-9]{0,1})?$/.test(num);
  }