# kebele

a simple way to start docker containers and watch for updates to the source image

think of it as a simple way to interface with `docker run` & `cron`

## install

`npm install -g kebele`

## usage
start a wizard to launch docker container + set cron schedule

`kebele init`

## features
- [x] Start new container with user provided settings

## planned
- [ ] Get currently running docker containers
- [ ] Get currently running cron jobs
- [ ] Create cron job based on user schedule
- [ ] Display summary of commands that were run for docker + cron during init
- [ ] Send http webhook when container upgrade done
- [ ] Modify running cron jobs


## contribute
this project was created to solve a problem during the development of [from africa with love](https://fromafri.ca), but contributions are welcome. please keep in mind this is going to remain extremely simple to avoid tech debt and to ensure maintinence is easy as it's maintained long into the future.