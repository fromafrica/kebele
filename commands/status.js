// @ts-nocheck
import fetch from 'node-fetch'
import chalk from 'chalk'

export default {
    command: ['status'],
    describe: 'list all docker containers',
    handler:  async () => {
        try {
            try {
                const response = await fetch('http://127.0.0.1:2375/containers/json?all=true')

                if (!response.ok) {
                    throw ({ message: 'error: unusual response from Docker daemon'})
                }
                const containers = await response.json()
                const containerCount = containers.length
                if (containerCount === 0) {
                    console.log('No containers found')
                }

                console.log('Containers')
                containers.forEach(container => {
                    let currentVersion = container.Labels['org.opencontainers.image.version'] ?? 'unknown'
                    let currentStatus = container.Status.startsWith("Up") ? chalk.green(container.Status) : chalk.red(container.Status)
                    let currentPorts = []
                    container.Ports.forEach(port => { if (port.IP === '0.0.0.0' || port.IP === '127.0.0.1' || port.IP === 'localhost'){ currentPorts.push(port) } })
                    let portInfo = ''
                    if (currentPorts.length === 0) {
                        portInfo = 'none exposed'

                    } else if (currentPorts.length === 1) {

                        portInfo = currentPorts[0].IP +':'+ currentPorts[0].PublicPort + '->' + currentPorts[0].PrivatePort + '/' + currentPorts[0].Type + ' '
                    
                    } else {
                        portInfo = 'Multiple'
                    }
                    console.log('ID: '+ chalk.blue(container.Id.substr(0, 8)) + 
                                ' - Image: '+ chalk.blue(container.Image) +  
                                ' ('+ chalk.magenta(currentVersion) +')' +
                                ' - Ports: '+ chalk.blue(portInfo) +' - Status: '+ currentStatus
                                )
                    console.log('')
                })
            } catch (error) { 
                throw ({ message: 'error: unable to communicate with Docker daemon'})
            }

            // Future implementations can go here for local images and cron jobs
        } catch (error) {
            console.error(error.message ?? 'operation failed.')
            console.log('')
            console.log('please try again or report issues at https://kebele.dev')
            console.log('')
            process.exit(1)
        }
    }
}