import type { FastifyPluginAsync } from "fastify";
import type { FastifyInstanceMod } from "../../types";


const router:FastifyPluginAsync = async function (app:FastifyInstanceMod, opts) {
    
    // this will send message that you will send to it (/api/printmessage/<message>)
    app.get("/:message", { schema: { params: { $ref: "printmessageparams#"}} } , async (req, res) => {
        return { message: req.params.message };
    });


};


export const autoPrefix = "/" + import.meta.url.split(/(\\|\/)/g).pop()?.replace(".ts", "")
export default router