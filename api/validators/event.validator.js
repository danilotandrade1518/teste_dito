module.exports = function(event) {
    if(!event) {
        throw Error('Os dados não foram informados!')
    }else if(!event.event) {
        throw Error('É necessário informar o campo event!')
    }
}