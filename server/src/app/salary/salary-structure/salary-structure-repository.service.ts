import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SalaryStructureType } from "src/app/shared/salary-structure.type";
import { SalaryStructureModel } from "./salary-structure-model";
import { DeleteSalaryStructureMutationModel } from "./service/delete-salary-structure-mutation.model";

@Injectable()
export class SalaryStructureRepositoryService {
    private Logger = new Logger();

    constructor(
        @InjectModel('SalaryStructureType') private readonly SalaryStructureModel: Model<SalaryStructureType>
    ){}

    public createSalaryField(operation: SalaryStructureModel): Promise<SalaryStructureType> {
        return new this.SalaryStructureModel({
            ...(operation.salary_meta_key !== undefined && { salary_meta_key: operation.salary_meta_key }),
            ...(operation.field_name !== undefined && { field_name: operation.field_name }),
            ...(operation.type !== undefined && { type: operation.type }),
            ...(operation.disabled !== undefined && { disabled: operation.disabled }),
        }).save();
    }

    public deleteSalaryField(operation: DeleteSalaryStructureMutationModel){
        return this.SalaryStructureModel.deleteOne({
            _id: operation.fieldId
        })
    }
    public readSalaryMetaFields(): Promise<SalaryStructureType[]> {
        return this.SalaryStructureModel.find({}).exec();
    }
}