# kebele

a simple way to start docker containers and watch for updates to the source image

think of it as an easy way to interface with `docker` & `cron`

## install

`npm install -g kebele`

*the alias* `kb` *will be added if available on your system*

## usage
`kebele config` - configure runtime settings

`kebele add` - setup a new container

`kebele status` - list all docker containers


## features
- [x] Start new container with user provided settings
- [x] Get currently running docker containers
- [ ] Get currently running cron jobs
- [ ] Create cron job based on user schedule
- [ ] Display summary of commands that were run for docker + cron during init
- [ ] Send http webhook when container upgrade done
- [ ] Modify running cron jobs

## os support
- [x] Linux
- [ ] macOS
- [ ] Windows

## security
communication with docker is done by enabling the REST API on TCP port 2375. 

this poses security concerns if exposed to the public internet and without other security configuration in place. 

the `config` wizard will do what it can to detect environment settings and suggest changes.

once the kebele nears **v1.0**, work will be done to automate the process of creating a CA and installing certificates so your server that is running the docker containers adheres to the [security best practices](https://docs.docker.com/engine/security/protect-access/) recommended by the docker team. there will also be testing done to ensure kebele works if the server is setup to [run docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).

if you have any recommendations for security best practices that can be incorporated into this cli tool, [please submit an issue](https://github.com/fromafrica/kebele/issues).

## contribute
this project was created to solve a problem during the development of [from africa with love](https://fromafri.ca), but contributions are welcome. please keep in mind this is going to remain extremely simple to avoid tech debt and to ensure maintinence is easy as it's maintained long into the future.