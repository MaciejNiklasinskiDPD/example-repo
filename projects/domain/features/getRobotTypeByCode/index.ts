import { getDatabase } from "../../../infrastructure/database";
import { getRobotTypeByCode } from "../../store/operations/robot_type";

export default async (robotTypeCode: string): Promise<any> => {
    const db = getDatabase();

    await db.connect();

    return await getRobotTypeByCode(db, robotTypeCode);
}