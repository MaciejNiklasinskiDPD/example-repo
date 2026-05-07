import getRobotTypeByCode from "../../domain/features/getRobotTypeByCode";
import { getLogger } from "../../infrastructure";
import { getServer } from "../";

const logger = getLogger();
const server = getServer();

server.route("get", "/robot-type/:robotTypeCode", async (req, res) => {
    const robotTypeCode = req.params.robotTypeCode;

    logger.log("info", `Received robotTypeCode ${robotTypeCode}`);

    const robotType = await getRobotTypeByCode(robotTypeCode);

    logger.log("info", `Robot type ${robotType} has been found for robotTypeCode ${robotTypeCode}`);

    res.json(robotType);
});

server.start(8080);