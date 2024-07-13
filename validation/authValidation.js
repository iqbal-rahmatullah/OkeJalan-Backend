import vine from "@vinejs/vine"
import { CustomError } from "../utils/CustomError.js"

vine.errorReporter = () => new CustomError()

export const signUpValidation = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(100).confirmed(),
  name: vine.string().maxLength(100),
  no_hp: vine.string().maxLength(50).minLength(10),
})
