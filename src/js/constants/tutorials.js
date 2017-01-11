const { all } = require('./probabilities.js')

const size2 = { size: 3 }
const hidden = { visible: false }
const visible = { visible: true }
const disabled = { disabled: true }
const allSeedling = { probabilities: all.seedlings }

const beginning = {
  steps: [
    {
      text:
        [ 'Welcome Traveller'
        ],
      board:
        { ...hidden
        , ...allSeedling
        , ...size2
        },
      order:
        [ 'text'
        , 'next'
        ]
    },

    {
      text:
        [ 'You have embarked on a journey'
        , 'Across mountains, deserts, meadows and forests'
        , 'To find the seeds of our dying world'
        , 'And assemble a great seed bank for our new world'
        ],
      board:
        { ...hidden },
      order:
        [ 'text'
        , 'next'
        ]
    },

    {
      text:
        [ 'These are seedlings'
        , 'They are ready to burst into seed pods'
        ],
      board:
        { ...visible
        , ...disabled
        },
      order:
        [ 'text'
        , 'board'
        , 'next'
        ]
    },

    {
      text:
        [ 'connect them to grow them into seed pods'
        , 'you can connect them in all directions'
        ],
      board:
        { ...visible },
      order:
        [ 'text'
        , 'board'
        , 'next'
        ]
    },

    {
      text:
        [ 'your first journey awaits'
        ],
      board:
        { ...hidden },
      order:
        [ 'text'
        , 'next'
        ]
    }
  ]
}

module.exports = [ beginning ]
