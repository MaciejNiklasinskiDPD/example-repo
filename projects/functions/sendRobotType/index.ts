import { getLogger, getMessagePublisher } from "../../infrastructure";
import getRobotTypeByCode from "../../domain/features/getRobotTypeByCode";

const messagePublisher = getMessagePublisher();
const logger = getLogger();

const sendRobotType = async (message: any) => {
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
        logger.log("error", "robotTypeCode is required");
        return;
    }

    const robotType = await getRobotTypeByCode(robotTypeCode);
    logger.log("info", `robotType ${robotType} found for robotTypeCode ${robotTypeCode}`);

    await messagePublisher.publishMessage("SOME_TOPIC_NAME", { attributes: { robotType, robotTypeCode } });


};
export default sendRobotType;
