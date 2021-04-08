import { MaxLength, MinLength, Required } from "@tsed/schema";


export class StudentInput implements TInput {

  @Required()
  @MaxLength(50)
  @MinLength(2)
  first_name: string;

  @Required()
  @MinLength(2)
  @MaxLength(50)
  middle_name: string;

  @Required()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;
  
}