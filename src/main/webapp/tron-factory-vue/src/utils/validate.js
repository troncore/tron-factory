class Validate {
  isNumber (value) {
    return /^\d+(\.\d+)?$/.test(value)
  }
  isInteger (value) {
    return /^\d+$/.test(value)
  }
  isTwoDecimal (value) {
    return /^([1-9]\d*|0)(\.\d{1,2})$/.test(value)
  }
  isIP (value) {
    return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)
  }
}
export const validate = new Validate()

/* form rules validate */
export class FormRules {
  numEqual(num, msg, isEqual = true,) {
    return (rule, value, callback) => {
      let invalid = false

      if (!validate.isNumber(value)) invalid = true
      else if (value == num) invalid = true
      else if (!isEqual && value != num) invalid = true

      if (invalid) callback(new Error(msg))
      else callback()
    }
  }


  numMin(num, msg, isEqual = true, isInteger = true) {
    return (rule, value, callback) => {
      let invalid = false

      if (!validate.isNumber(value)) invalid = true
      else if (isInteger && !validate.isInteger(value)) invalid = true
      else if (value < num) invalid = true
      else if (!isEqual && value == num) invalid = true

      if (invalid) callback(new Error(msg))
      else callback()
    }
  }

  numMax(num, msg, isEqual = true, isInteger = true) {
    return (rule, value, callback) => {
      let invalid = false

      if (!validate.isNumber(value)) invalid = true
      else if (isInteger && !validate.isInteger(value)) invalid = true
      else if (value > num) invalid = true
      else if (!isEqual && value == num) invalid = true

      if (invalid) callback(new Error(msg))
      else callback()
    }
  }

  numTwoDecimal(msg) {
    return (rule, value, callback) => {
      let invalid = false

      if (!validate.isTwoDecimal(value)) invalid = true

      if (invalid) callback(new Error(msg))
      else callback()
    }
  }
}

export const formRules = new FormRules()

