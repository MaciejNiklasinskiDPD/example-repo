import { IDatabase } from "../../../common";

const table = "robot_type";

export const getRobotTypeByCode = async (db: IDatabase, robotTypeCode: string): Promise<any> => {
    const [robotType] = await db.run<string>({
        sql: `
          SELECT
            rt.robot_type_code AS robotTypeCode,
            rt.total_compartments AS totalCompartments,
            rt.refill_stop_time AS refillStopTime
          FROM
            ${table} rt
          WHERE
            rt.robot_type_code = @robotTypeCode
        `,
        params: {
            robotTypeCode,
        },
    });

    return robotType;
};

module.exports = {
    getRobotTypeByCode,
};
