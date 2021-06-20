import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EmployeeSalaryFieldsType } from "../shared/employee-salary-fields.type";
import { EmployeeSalaryCreateMutationModel } from "./service/create-employee-salary-mutation.model";
import { EmployeeSalaryCreateMutationService } from "./service/create-employee-salary-mutation.service";
import { ReadEmployeeSalaryDto } from "./service/dto/employee-salary.dto";
import { ReadEmployeeSalaryQueryModel } from "./service/read-employee-salary-query.model";
import { ReadEmployeeSalaryQueryService } from "./service/read-employee-salary-query.service";

@Resolver()
export class EmployeeSalariesResolver {
    constructor(
        private employeeSalariesCreateMutationService: EmployeeSalaryCreateMutationService,
        private readEmployeeSalaryQueryService: ReadEmployeeSalaryQueryService,
    ){}

  @Mutation(() => EmployeeSalaryCreateMutationModel)
  public async employeeMetaSalaryCreate(@Args() arguments_: EmployeeSalaryCreateMutationModel): Promise<EmployeeSalaryFieldsType> {
    const operation = new EmployeeSalaryCreateMutationModel(arguments_);

    return await this.employeeSalariesCreateMutationService.serve(operation).then(data => data);
  }

  @Query(() => [ReadEmployeeSalaryDto])
  public async employeeMetaSalaryRead(@Args() arguments_: ReadEmployeeSalaryQueryModel): Promise<EmployeeSalaryFieldsType[]> {
    const operation = new ReadEmployeeSalaryQueryModel(arguments_);

    return await this.readEmployeeSalaryQueryService.serve(operation).then(data => data);
  }
}