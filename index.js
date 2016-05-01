const reservedKeywords = ['channel', 'group', 'everyone', 'here']

const indexBy = (prop, items) =>
  items.reduce((index, item) => (index[item[prop]] = item, index), {})

module.exports = function makeRemoveFormatting (state) {
  const users = indexBy('id', state.users)
  const channels = indexBy('id', state.channels)

  return function removeFormatting (text) {
    text = text.replace(/<([@#!])?([^>|]+)(?:\|([^>]+))?>/g, (m, type, link, label) => {
      switch (type) {
        case '@':
          if (label) return label
          const user = users[link]
          if (user) return `@${user.name}`
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
