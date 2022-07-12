import apiServer from "./api/apiServer";
import { WebsocketController } from "./websocket";

// Dependency Injection
const wsController = new WebsocketController();

wsController.setUpHandlers();
apiServer.serve();
