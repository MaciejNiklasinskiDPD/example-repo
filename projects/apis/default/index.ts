import { getServer } from "apis";
import { services } from "domains";
import { getDatabase, getLogger } from "resources";

const logger = getLogger();
const server = getServer();

server.route("get", "/robot-type/:robotTypeCode", async (req, res) => {
    
    // This instance would be created at the top of the routing when the api is span up.
    const db = getDatabase();

    await db.connect();

    const robotTypeCode = req.params.robotTypeCode;

    if (robotTypeCode === undefined) {
        res.status(400).json({ error: "robotTypeCode is required" });
        return;
    }

    logger.log("info", `Received robotTypeCode ${robotTypeCode}`);

    const robotType = await services.getRobotTypeByCode(db, robotTypeCode);

    logger.log("info", `Robot type ${robotType} has been found for robotTypeCode ${robotTypeCode}`);

    res.json(robotType);
});

server.start(8080);