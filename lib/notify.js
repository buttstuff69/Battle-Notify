'use strict'

const colors = {
    red: '#ee1c24',
    green: '#40fb40',
    blue: '#44ddff',

    darkblue: '#0196ff',
    lightblue: '#00ffff',

    violet: '#ff7eff',
    white: '#ffffff',
    yellow: '#ffcc00',
    orange: '#ff7d00',

    grey: '#c8c8b6',
    gray: '#c8c8b6'
}
const msRemaining = uts => uts - Date.now()
const sRemaining = uts => Math.round(msRemaining(uts) / 1000)
const duration = uts => sRemaining(uts) + 's'
const colorStr = hex => `</FONT><FONT COLOR="${hex}">`

const defaults = {
    chat: true,
    alert: true,
    notice: false,
    prepend: colorStr(colors.red)
}

module.exports = function Notify(mod) {
    const notifyTypes = {
        notice: function (message) {
            mod.send('S_CHAT', 3, {
                channel: 21,
                name: '',
                message: message,
            })
        },
        chat: function chat(message) {
            mod.send('S_CHAT', 3, {
                channel: 203,
                name: '',
                message: message,
            })
        },
        alert: function alert(message) {
            mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
                type: 51,
                chat: false,
                channel: 0,
                message,
            })
        }
    }

    function* tags(message) {
        yield* (message.match(/\{.*?\}/ig) || [])
            .map(raw => {
                const tag = raw
                    .replace(RegExp(/[\{\}]/, 'g'), '')
                    .toLowerCase()
                return [tag, raw]
            })
    }
    function processTags(message) {
        let msg = message
        let args = {}
    
        for (const [tag, raw] of tags(message)) {
            let replace
    
            if (colors[tag]) {
                replace = colorStr(colors[tag])
            } else if (tag.includes('#')) {
                const hex = /#.{6}/g.exec(tag)
                replace = colorStr(hex)
            } else if (notifyTypes[tag]) {
                args[tag] = true
                replace = ''
            }
            if (typeof replace === typeof undefined) {
                mod.warn(new Error(`[battle-notify] warning: unhandled or unknown tag "${raw}\nmessage: ${msg}`))
                replace = ''
            }
            message = message.replace(raw, replace)
        }
        return [message, args]
    }

    function notify(message) {
        let [msg, args] = processTags(message)
        if (Object.keys(args).length === 0) args = defaults
        msg = defaults.prepend + msg

        Object.keys(args)
            .filter(key => (notifyTypes[key] && args[key]))
            .forEach(key => notifyTypes[key](msg))

    }
    
    this.testColors = function () {
        let str = ''
        for (const name of Object.keys(colors)) {
            if (str.length > 30) {
                notify(str)
                str = ''
            }
            str = str + `{${name}}${name} `
        }
        if (str !== '') notify(str)
    }
    this.setDefaults = function (str) {
        if (!str) return
        const [message, args] = processTags(str)
        Object.keys(defaults).forEach(key => {
            defaults[key] = args[key] ? args[key] : false
        })
        defaults.prepend = message
    }
    this.skillReset = function (message, info) {
        if (info) {
            message = message.replace('{icon}', info.icon)
        }
        notify(message)
    }
    this.abnormal = function (message, entity, info) {
        if (info) {
            message = message.replace('{duration}', duration(info.expires))
            message = message.replace('{stacks}', info.stacks)
            message = message.replace('{icon}', info.icon)
        }
        if (entity) {
            message = message.replace('{name}', entity.name)
            message = message.replace('{nextEnrage}', entity.nextEnrage + '%')
        }
        notify(message)
    }
    this.cooldown = function (message, info) {
        if (info) {
            message = message.replace('{duration}', duration(info.expires))
            message = message.replace('{icon}', info.icon)
        }
        notify(message)
    }
    this.notify = notify
}
