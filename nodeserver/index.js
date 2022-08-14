const server = require('http').createServer();
const io = require('socket.io')(server);
io.listen(8000);
const users = {}

io.on('connection',socket=>{

    // if new_user join eveyone about know about him
    socket.on('new_user',name=>{
        console.log("newuser",name)
        users[socket.id]=name;
        socket.broadcast.emit('user_join',name)
    })

    // send the message eveyone
    socket.on('send',message=>{
        console.log("message",message,users[socket.id])
            socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
        })
console.log(users)
        // disconnect member show left
        socket.on("disconnect",message=>{
            console.log("disconnect",message)
                socket.broadcast.emit('left',users[socket.id])

                delete users[socket.id]
            })
})
