const reservedKeywords = ['channel', 'group', 'everyone', 'here']

const indexBy = (prop, items) =>
  items.reduce((index, item) => (index[item[prop]] = item, index), {})

module.exports = function makeRemoveFormatting (users, channels) {
  users = indexBy('id', users)
  channels = indexBy('id', channels)

  return function removeFormatting (text) {
    text = text.replace(/<([@#!])?([^>|]+)(?:\|([^>]+))?>/g, (m, type, link, label) => {
      switch (type) {
        case '@':
          if (label) return label
          const user = users[link]
          if (user) return `@${user.real_name}`
          break

        case '#':
          if (label) return label
          const channel = channels[link]
          if (channel) return `#${channel.name}`
          break

        case '!':
          if (reservedKeywords.includes(link)) return `@${link}`
          break

        default:
          link = link.replace(/^mailto:/, '')
          if (label && link.indexOf(label) === -1) return `${label} (${link})`
          else return link
      }
    })

    text = text.replace(/&lt;/g, '<')
    text = text.replace(/&gt;/g, '>')
    text = text.replace(/&amp;/g, '&')

    return text
  }
}
