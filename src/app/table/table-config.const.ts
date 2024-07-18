import { FilterType } from "./filter-type.enum";

let arrowUp = 'assets/icons/arrow_up_thin_icon.svg';
let arrowDown = 'assets/icons/arrow_down_thin_icon.svg';

export const tableConfig = [
  {
    "FilterType": FilterType.Date,
    "Sortings": [
      {
        "Name": "Aufsteigend sortieren (früher bis später)",
        "Key": "asc",
        "ImageSrc": arrowUp
      },
      {
        "Name": "Absteigend sortieren (später bis früher)",
        "Key": "desc",
        "ImageSrc": arrowDown
      }
    ],
    "Filters": [
      {
        "Name": "Zeitraum",
        "Typ": "Dropdown",
        "Optionen": ["Alle Perioden", "Heute", "Gestern", "Diese Woche", "Dieser Monat", "Dieses Jahr"],
        "DefaultSelected": "Alle Perioden"
      }
    ]
  },
  {
    "FilterType": FilterType.Text,
    "Sortings": [
      {
        "Name": "Aufsteigend sortieren (A-Z)",
        "Key": "asc",
        "ImageSrc": arrowUp
      },
      {
        "Name": "Absteigend sortieren (Z-A)",
        "Key": "desc",
        "ImageSrc": arrowDown
      }
    ],
    "Filters": [
      {
        "Name": "Filtern nach...",
        "Typ": "Textfeld"
      }
    ]
  },
  {
    "FilterType": FilterType.Number,
    "Sortings": [
      {
        "Name": "Aufsteigend sortieren (klein bis groß)",
        "Key": "asc",
        "ImageSrc": arrowUp
      },
      {
        "Name": "Absteigend sortieren (groß bis klein)",
        "Key": "desc",
        "ImageSrc": arrowDown
      }
    ],
    "Filters": [
      {
        "Name": "Reichweite auswählen",
        "Typ": "Slider"
      }
    ]
  },
  {
    "FilterType": FilterType.Decimal,
    "Sortings": [
      {
        "Name": "Aufsteigend sortieren (klein bis groß)",
        "Key": "asc",
        "ImageSrc": arrowUp
      },
      {
        "Name": "Absteigend sortieren (groß bis klein)",
        "Key": "desc",
        "ImageSrc": arrowDown
      }
    ],
    "Filters": [
      {
        "Name": "Reichweite auswählen",
        "Typ": "Slider"
      }
    ]
  },
  {
    "FilterType": FilterType.Object,
    "Sortings": [
      {
        "Name": "Aufsteigend sortieren (A-Z)",
        "Key": "asc",
        "ImageSrc": arrowUp
      },
      {
        "Name": "Absteigend sortieren (Z-A)",
        "Key": "desc",
        "ImageSrc": arrowDown
      }
    ],
    "Filters": [
      {
        "Name": "Anzeigen",
        "Typ": "Checkbox"
      }
    ]
  }
];
