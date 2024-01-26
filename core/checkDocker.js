import net from 'net'

export default async function checkDocker(timeout = 2000) {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket()

        socket.setTimeout(timeout)

        socket.on('connect', () => {
            socket.destroy()
            resolve(true) // Successfully connected
        })

        socket.on('timeout', () => {
            socket.destroy()
            reject(new Error('Connection timeout'))
        })

        socket.on('error', (err) => {
            socket.destroy()
            reject(err)
        })

        socket.connect(2375, "127.0.0.1")
    })
}