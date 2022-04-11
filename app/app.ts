import { app } from "./config/express.config";
const clientRoutes = require('./routers/client/index.route');
const adminRoutes = require('./routers/admin/index.route');
import { authenticate } from "./services/admin/common.service";
import clientMessageReceiver from "./services/client/messageReceiver"
// import { debuggerEnabled, debuggerString } from "./config/constants.config"

// debuggerEnabled && (process.env['DEBUG'] = debuggerString);
// const debug = debuggerEnabled ? require('debug')(debuggerString) : console.log;
const ClientMessageReceiver = new clientMessageReceiver();

// Client api routes
app.use('/api', clientRoutes);

// Admin api routes
app.use('/admin-api', authenticate, adminRoutes);

app.listen(3500, ()=>{
    console.log("The server is listening on port 3500")
    // debug('listening on port 3500');
});
