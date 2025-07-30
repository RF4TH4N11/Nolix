
class Controller {
static async test(req,res){
    try {
        send.res('test!')
    } catch (err) {
        console.log(err);
        send.res(err)
    }
}
}
module.exports = Controller;