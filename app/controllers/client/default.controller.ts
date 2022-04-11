export default class clientDefaultController {
    public index = (req:any, res:any) => {
        console.log("Hello user");
        res.send("Hello user")
    }
}