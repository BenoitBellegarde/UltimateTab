export const tabTypes = {
  All: 'All',
  Video: 'Video',
  Tab: 'Tabs',
  Chords: 'Chords',
  Bass: 'Bass',
  Ukulele: 'Ukulele',
}

export const tabTypeValues = {
  All: 0,
  Video: 100,
  Tab: 200,
  Chords: 300,
  Bass: 400,
  Ukulele: 800,
}

export const tabTypeColor = {
  Video: 'teal',
  Tabs: 'green',
  Chords: 'purple',
  Bass: 'red',
  Ukulele: 'orange',
}

export const Chords = {
  "C": {
      "name": "C",
      "chord": [
          [
              1,
              0
          ],
          [
              2,
              1,
              "1"
          ],
          [
              3,
              0
          ],
          [
              4,
              2,
              2
          ],
          [
              5,
              3,
              3
          ]
      ],
      "position": 0,
      "barres": []
  },
  "D": {
      "name": "D",
      "chord": [
          [
              1,
              2,
              2
          ],
          [
              2,
              3,
              3
          ],
          [
              3,
              2,
              "1"
          ],
          [
              4,
              0,
              "D"
          ],
          [
              5,
              "x"
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "E": {
      "name": "E",
      "chord": [
          [
              1,
              0,
              "E"
          ],
          [
              2,
              0
          ],
          [
              3,
              1,
              1
          ],
          [
              4,
              2,
              3
          ],
          [
              5,
              2,
              2
          ],
          [
              6,
              0,
              "E"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "G": {
      "name": "G",
      "chord": [
          [
              1,
              3,
              4
          ],
          [
              2,
              3,
              3
          ],
          [
              3,
              0,
              "G"
          ],
          [
              4,
              0
          ],
          [
              5,
              2,
              1
          ],
          [
              6,
              3,
              2
          ]
      ],
      "position": 0,
      "barres": []
  },
  "A": {
      "name": "A",
      "chord": [
          [
              1,
              0
          ],
          [
              2,
              2,
              3
          ],
          [
              3,
              2,
              2
          ],
          [
              4,
              2,
              1
          ],
          [
              5,
              0,
              "A"
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "D Minor": {
      "name": "D Minor",
      "chord": [
          [
              1,
              1,
              1
          ],
          [
              2,
              3,
              3
          ],
          [
              3,
              2,
              2
          ],
          [
              4,
              0,
              "D"
          ],
          [
              5,
              "x"
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "E Minor": {
      "name": "E Minor",
      "chord": [
          [
              1,
              0
          ],
          [
              2,
              0
          ],
          [
              3,
              0
          ],
          [
              4,
              2,
              3
          ],
          [
              5,
              2,
              2
          ],
          [
              6,
              0,
              "E"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "A Minor": {
      "name": "A Minor",
      "chord": [
          [
              1,
              0
          ],
          [
              2,
              1,
              1
          ],
          [
              3,
              2,
              3
          ],
          [
              4,
              2,
              2
          ],
          [
              5,
              0,
              "A"
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "C7": {
      "name": "C7",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              5,
              3
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D7": {
      "name": "D7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "E7": {
      "name": "E7",
      "chord": [
          [
              1,
              0
          ],
          [
              2,
              3,
              4
          ],
          [
              3,
              1,
              1
          ],
          [
              4,
              0
          ],
          [
              5,
              2,
              2
          ],
          [
              6,
              0,
              "E"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "G7": {
      "name": "G7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A7": {
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              5,
              3
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dm7": {
      "name": "Dm7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Em7": {
      "name": "Em7",
      "chord": [
          [
              1,
              0
          ],
          [
              2,
              3,
              4
          ],
          [
              3,
              0
          ],
          [
              4,
              0
          ],
          [
              5,
              2,
              1
          ],
          [
              6,
              0,
              "E"
          ]
      ],
      "position": 0,
      "barres": []
  },
  "Am7": {
      "name": "Am7",
      "chord": [
          [
              2,
              4
          ],
          [
              5,
              3
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F": {
      "name": "F",
      "chord": [
        [
            3,
            2
        ],
        [
            4,
            3
        ],
        [
            5,
            3
        ]
    ],
      "position": 1,
      "barres": [
        {
            "fromString": 6,
            "toString": 1,
            "fret": 1
        }
    ]
  },
  "Fm": {
      "name": "Fm",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F7": {
      "name": "F7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Fm7": {
      "name": "Fm7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "FMaj7": {
      "name": "FMaj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Fm7b5": {
      "name": "Fm7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "Fdim": {
      "name": "Fdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "Fsus4": {
      "name": "Fsus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F7sus4": {
      "name": "F7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F13": {
      "name": "F13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "F#Maj": {
      "name": "F#Maj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#m": {
      "name": "F#m",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#7": {
      "name": "F#7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#m7": {
      "name": "F#m7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#Maj7": {
      "name": "F#Maj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#m7b5": {
      "name": "F#m7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "F#dim": {
      "name": "F#dim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "F#sus4": {
      "name": "F#sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#7sus4": {
      "name": "F#7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#13": {
      "name": "F#13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "GbMaj": {
      "name": "GbMaj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gbm": {
      "name": "Gbm",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gb7": {
      "name": "Gb7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gbm7": {
      "name": "Gbm7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "GbMaj7": {
      "name": "GbMaj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gbm7b5": {
      "name": "Gbm7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "Gbdim": {
      "name": "Gbdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "Gbsus4": {
      "name": "Gbsus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gb7sus4": {
      "name": "Gb7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gb13": {
      "name": "Gb13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "GMaj": {
      "name": "GMaj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gm": {
      "name": "Gm",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gm7": {
      "name": "Gm7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "GMaj7": {
      "name": "GMaj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gm7b5": {
      "name": "Gm7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "Gdim": {
      "name": "Gdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "positionText": 1
  },
  "Gsus4": {
      "name": "Gsus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G7sus4": {
      "name": "G7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G13": {
      "name": "G13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "positionText": 1
  },
  "G#Maj": {
      "name": "G#Maj",
      "chord": [
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G#m": {
      "name": "G#m",
      "chord": [
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G#7": {
      "name": "G#7",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G#m7": {
      "name": "G#m7",
      "chord": [
          [
              2,
              4
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G#Maj7": {
      "name": "G#Maj7",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              1
          ]
      ],
      "position": 4
  },
  "G#m7b5": {
      "name": "G#m7b5",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "G#dim": {
      "name": "G#dim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              3,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 4,
      "positionText": 1,
      "barres": [
          {
              "fromString": 4,
              "toString": 2,
              "fret": 1
          }
      ]
  },
  "G#sus4": {
      "name": "G#sus4",
      "chord": [],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          },
          {
              "fromString": 5,
              "toString": 3,
              "fret": 3
          }
      ]
  },
  "G#7sus4": {
      "name": "G#7sus4",
      "chord": [
          [
              3,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G#13": {
      "name": "G#13",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "AbMaj": {
      "name": "AbMaj",
      "chord": [
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Abm": {
      "name": "Abm",
      "chord": [
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Ab7": {
      "name": "Ab7",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Abm7": {
      "name": "Abm7",
      "chord": [
          [
              2,
              4
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "AbMaj7": {
      "name": "AbMaj7",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              1
          ]
      ],
      "position": 4
  },
  "Abm7b5": {
      "name": "Abm7b5",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "Abdim": {
      "name": "Abdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              3,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 4,
      "positionText": 1,
      "barres": [
          {
              "fromString": 4,
              "toString": 2,
              "fret": 1
          }
      ]
  },
  "Absus4": {
      "name": "Absus4",
      "chord": [],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          },
          {
              "fromString": 5,
              "toString": 3,
              "fret": 3
          }
      ]
  },
  "Ab7sus4": {
      "name": "Ab7sus4",
      "chord": [
          [
              3,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Ab13": {
      "name": "Ab13",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "AMaj": {
      "name": "AMaj",
      "chord": [
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Am": {
      "name": "Am",
      "chord": [
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "AMaj7": {
      "name": "AMaj7",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              1
          ]
      ],
      "position": 5
  },
  "Am7b5": {
      "name": "Am7b5",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "Adim": {
      "name": "Adim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              3,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 5,
      "positionText": 1,
      "barres": [
          {
              "fromString": 4,
              "toString": 2,
              "fret": 1
          }
      ]
  },
  "Asus4": {
      "name": "Asus4",
      "chord": [],
      "position": 5,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          },
          {
              "fromString": 5,
              "toString": 3,
              "fret": 3
          }
      ]
  },
  "A7sus4": {
      "name": "A7sus4",
      "chord": [
          [
              3,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A13": {
      "name": "A13",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "A#Maj": {
      "name": "A#Maj",
      "chord": [
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A#m": {
      "name": "A#m",
      "chord": [
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A#7": {
      "name": "A#7",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A#m7": {
      "name": "A#m7",
      "chord": [
          [
              2,
              4
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A#Maj7": {
      "name": "A#Maj7",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              1
          ]
      ],
      "position": 6
  },
  "A#m7b5": {
      "name": "A#m7b5",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "A#dim": {
      "name": "A#dim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              3,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 6,
      "positionText": 1,
      "barres": [
          {
              "fromString": 4,
              "toString": 2,
              "fret": 1
          }
      ]
  },
  "A#sus4": {
      "name": "A#sus4",
      "chord": [],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          },
          {
              "fromString": 5,
              "toString": 3,
              "fret": 3
          }
      ]
  },
  "A#7sus4": {
      "name": "A#7sus4",
      "chord": [
          [
              3,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "A#13": {
      "name": "A#13",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "BbMaj": {
      "name": "BbMaj",
      "chord": [
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Bbm": {
      "name": "Bbm",
      "chord": [
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Bb7": {
      "name": "Bb7",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Bbm7": {
      "name": "Bbm7",
      "chord": [
          [
              2,
              4
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "BbMaj7": {
      "name": "BbMaj7",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              1
          ]
      ],
      "position": 6
  },
  "Bbm7b5": {
      "name": "Bbm7b5",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "Bbdim": {
      "name": "Bbdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              3,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 6,
      "positionText": 1,
      "barres": [
          {
              "fromString": 4,
              "toString": 2,
              "fret": 1
          }
      ]
  },
  "Bbsus4": {
      "name": "Bbsus4",
      "chord": [],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          },
          {
              "fromString": 5,
              "toString": 3,
              "fret": 3
          }
      ]
  },
  "Bb7sus4": {
      "name": "Bb7sus4",
      "chord": [
          [
              3,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Bb13": {
      "name": "Bb13",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "CMaj": {
      "name": "CMaj",
      "chord": [
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Cm": {
      "name": "Cm",
      "chord": [
          [
              4,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Cm7": {
      "name": "Cm7",
      "chord": [
          [
              2,
              4
          ],
          [
              5,
              3
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "CMaj7": {
      "name": "CMaj7",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              1
          ]
      ],
      "position": 8
  },
  "Cm7b5": {
      "name": "Cm7b5",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "Cdim": {
      "name": "Cdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              3,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 8,
      "positionText": 1,
      "barres": [
          {
              "fromString": 4,
              "toString": 2,
              "fret": 1
          }
      ]
  },
  "Csus4": {
      "name": "Csus4",
      "chord": [],
      "position": 8,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          },
          {
              "fromString": 5,
              "toString": 3,
              "fret": 3
          }
      ]
  },
  "C7sus4": {
      "name": "C7sus4",
      "chord": [
          [
              3,
              3
          ],
          [
              5,
              3
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 6,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C13": {
      "name": "C13",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              2
          ],
          [
              5,
              "x"
          ],
          [
              6,
              2
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "C#Maj": {
      "name": "C#Maj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#m": {
      "name": "C#m",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#7": {
      "name": "C#7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#m7": {
      "name": "C#m7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#Maj7": {
      "name": "C#Maj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#m7b5": {
      "name": "C#m7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "C#dim": {
      "name": "C#dim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "C#sus2": {
      "name": "C#sus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#sus4": {
      "name": "C#sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#7sus4": {
      "name": "C#7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "C#9": {
      "name": "C#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "C#7b9": {
      "name": "C#7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "C#7#9": {
      "name": "C#7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "C#13": {
      "name": "C#13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "DbMaj": {
      "name": "DbMaj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dbm": {
      "name": "Dbm",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Db7": {
      "name": "Db7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dbm7": {
      "name": "Dbm7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "DbMaj7": {
      "name": "DbMaj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dbm7b5": {
      "name": "Dbm7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "Dbdim": {
      "name": "Dbdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "Dbsus2": {
      "name": "Dbsus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dbsus4": {
      "name": "Dbsus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Db7sus4": {
      "name": "Db7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Db9": {
      "name": "Db9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "Db7b9": {
      "name": "Db7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "Db7#9": {
      "name": "Db7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "Db13": {
      "name": "Db13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 4,
      "positionText": 1
  },
  "DMaj": {
      "name": "DMaj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dm": {
      "name": "Dm",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "DMaj7": {
      "name": "DMaj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dm7b5": {
      "name": "Dm7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "Ddim": {
      "name": "Ddim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "Dsus2": {
      "name": "Dsus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Dsus4": {
      "name": "Dsus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D7sus4": {
      "name": "D7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D9": {
      "name": "D9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "D7b9": {
      "name": "D7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "D7#9": {
      "name": "D7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "D13": {
      "name": "D13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 5,
      "positionText": 1
  },
  "D#Maj": {
      "name": "D#Maj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#m": {
      "name": "D#m",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#7": {
      "name": "D#7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#m7": {
      "name": "D#m7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#Maj7": {
      "name": "D#Maj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#m7b5": {
      "name": "D#m7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "D#dim": {
      "name": "D#dim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "D#sus2": {
      "name": "D#sus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#sus4": {
      "name": "D#sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#7sus4": {
      "name": "D#7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "D#9": {
      "name": "D#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "D#7b9": {
      "name": "D#7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "D#7#9": {
      "name": "D#7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "D#13": {
      "name": "D#13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "EbMaj": {
      "name": "EbMaj",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Ebm": {
      "name": "Ebm",
      "chord": [
          [
              2,
              2
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Eb7": {
      "name": "Eb7",
      "chord": [
          [
              2,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Ebm7": {
      "name": "Ebm7",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "EbMaj7": {
      "name": "EbMaj7",
      "chord": [
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Ebm7b5": {
      "name": "Ebm7b5",
      "chord": [
          [
              2,
              2
          ],
          [
              4,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 3,
              "fret": 1
          }
      ]
  },
  "Ebdim": {
      "name": "Ebdim",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              1
          ],
          [
              4,
              3
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "Ebsus2": {
      "name": "Ebsus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Ebsus4": {
      "name": "Ebsus4",
      "chord": [
          [
              2,
              4
          ],
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Eb7sus4": {
      "name": "Eb7sus4",
      "chord": [
          [
              2,
              4
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Eb9": {
      "name": "Eb9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "Eb7b9": {
      "name": "Eb7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "Eb7#9": {
      "name": "Eb7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "Eb13": {
      "name": "Eb13",
      "chord": [
          [
              1,
              4
          ],
          [
              2,
              4
          ],
          [
              3,
              2
          ],
          [
              4,
              4
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 6,
      "positionText": 1
  },
  "Fsus2": {
      "name": "Fsus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F9": {
      "name": "F9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "F7b9": {
      "name": "F7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "F7#9": {
      "name": "F7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 8,
      "positionText": 1
  },
  "F#sus2": {
      "name": "F#sus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "F#9": {
      "name": "F#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "F#7b9": {
      "name": "F#7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "F#7#9": {
      "name": "F#7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "Gbsus2": {
      "name": "Gbsus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "Gb9": {
      "name": "Gb9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "Gb7b9": {
      "name": "Gb7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "Gb7#9": {
      "name": "Gb7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 9,
      "positionText": 1
  },
  "Gsus2": {
      "name": "Gsus2",
      "chord": [
          [
              3,
              3
          ],
          [
              4,
              3
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "barres": [
          {
              "fromString": 5,
              "toString": 1,
              "fret": 1
          }
      ]
  },
  "G9": {
      "name": "G9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              2
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "positionText": 1
  },
  "G7b9": {
      "name": "G7b9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              1
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "positionText": 1
  },
  "G7#9": {
      "name": "G7#9",
      "chord": [
          [
              1,
              "x"
          ],
          [
              2,
              3
          ],
          [
              3,
              2
          ],
          [
              4,
              1
          ],
          [
              5,
              2
          ],
          [
              6,
              "x"
          ]
      ],
      "position": 10,
      "positionText": 1
  }
}