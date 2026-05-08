import { robotType  } from "../../store";
import { IDatabase } from "common";

export default async (
    db: IDatabase,
    robotTypeCode: string,
): Promise<any> => {
    // do business logic
    // make db calls
    // more business logic
    return await robotType.getRobotTypeByCode(db, robotTypeCode);
}