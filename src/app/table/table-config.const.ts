import { FilterType } from "./filter-type.enum";

export const tableConfig = [
  {
    "FilterType": FilterType.Date,
    "Sortings": [
      {
        "Name": "Aufsteigend sortieren (früher bis später)",
        "Key": "asc",
        "Icon": "ArrowUp"
      },
      {
        "Name": "Absteigend sortieren (später bis früher)",
        "Key": "desc",
        "Icon": "ArrowDown"
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
        "Icon": "ArrowUp"
      },
      {
        "Name": "Absteigend sortieren (Z-A)",
        "Key": "desc",
        "Icon": "ArrowDown"
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
        "Icon": "ArrowUp"
      },
      {
        "Name": "Absteigend sortieren (groß bis klein)",
        "Key": "desc",
        "Icon": "ArrowDown"
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
        "Icon": "ArrowUp"
      },
      {
        "Name": "Absteigend sortieren (groß bis klein)",
        "Key": "desc",
        "Icon": "ArrowDown"
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
        "Icon": "ArrowUp"
      },
      {
        "Name": "Absteigend sortieren (Z-A)",
        "Key": "desc",
        "Icon": "ArrowDown"
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
