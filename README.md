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

## contribute
this project was created to solve a problem during the development of [from africa with love](https://fromafri.ca), but contributions are welcome. please keep in mind this is going to remain extremely simple to avoid tech debt and to ensure maintinence is easy as it's maintained long into the future.