import getRobotTypeByCode from "../../domain/features/getRobotTypeByCode";

const printRobotType = async (message: any) => {
    let robotTypeCode: string | undefined;
    if (message?.data) {
        const decoded = Buffer.from(message.data, "base64").toString("utf-8");
        try {
            const payload = JSON.parse(decoded) as any;
            robotTypeCode = payload.robotTypeCode;
        } catch {
            robotTypeCode = decoded.trim();
        }
    }

    robotTypeCode = robotTypeCode || message?.attributes?.robotTypeCode;

    if (!robotTypeCode) {
        console.error("robotTypeCode is required");
        return;
    }

    const robotType = await getRobotTypeByCode(robotTypeCode);
    console.log(JSON.stringify(robotType));
};
export default printRobotType;
