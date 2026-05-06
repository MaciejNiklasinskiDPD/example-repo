import getRobotTypeByCode from "../../domain/features/getRobotTypeByCode";
import { getServer } from "../../services";

const server = getServer();

server.route("get", "/robot-type/:robotTypeCode", async (req, res) => {
    const robotTypeCode = req.params.robotTypeCode;
    const robotType = await getRobotTypeByCode(robotTypeCode);
    res.json(robotType);
});

server.start(8080);