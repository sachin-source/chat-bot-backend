export default class adminDefaultController {
    public index = (req:any, res:any) => {
        console.log("Hello Admin");
        res.send("Hello Admin")
    }
}