import { ResponseErrorObject } from "@tsed/common";
import { BadRequest } from "@tsed/exceptions";

/**
 * For handling Custom Validation Exception
 */
export class ValidationException extends BadRequest implements ResponseErrorObject {
  // headers: {};
  errors: [];

  constructor(errors: never) {
    super("Validation error");

    this.errors = errors;
  }
}
