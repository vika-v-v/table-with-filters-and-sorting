import { FilterType } from "./filter-type.enum";

export const tableConfig = [
  {
    "FilterType": FilterType.Date,
    "Sortings": [
      {
        "Name": "Sort ascending (earlier to later)",
        "Key": "asc",
        "Icon": "ArrowUp"
      },
      {
        "Name": "Sort descending (later to earlier)",
        "Key": "desc",
        "Icon": "ArrowDown"
      }
    ],
    "Filters": [
      {
        "Name": "Time period",
        "Type": "Dropdown",
        "Options": ["All periods", "Today", "Yesterday", "This week", "This month", "This year"],
        "DefaultSelected": "All periods"
      }
    ]
  },
  {
    "FilterType": FilterType.Text,
    "Sortings": [
      {
        "Name": "Sort ascending (A-Z)",
        "Key": "asc",
        "Icon": "ArrowUp"
      },
      {
        "Name": "Sort descending (Z-A)",
        "Key": "desc",
        "Icon": "ArrowDown"
      }
    ],
    "Filters": [
      {
        "Name": "Filter by...",
        "Type": "Textfield"
      }
    ]
  },
  {
    "FilterType": FilterType.Number,
    "Sortings": [
      {
        "Name": "Sort ascending (small to large)",
        "Key": "asc",
        "Icon": "ArrowUp"
      },
      {
        "Name": "Sort descending (large to small)",
        "Key": "desc",
        "Icon": "ArrowDown"
      }
    ],
    "Filters": [
      {
        "Name": "Select range",
        "Type": "Slider"
      }
    ]
  },
  {
    "FilterType": FilterType.Decimal,
    "Sortings": [
      {
        "Name": "Sort ascending (small to large)",
        "Key": "asc",
        "Icon": "ArrowUp"
      },
      {
        "Name": "Sort descending (large to small)",
        "Key": "desc",
        "Icon": "ArrowDown"
      }
    ],
    "Filters": [
      {
        "Name": "Select range",
        "Type": "Slider"
      }
    ]
  },
  {
    "FilterType": FilterType.Object,
    "Sortings": [
      {
        "Name": "Sort ascending (A-Z)",
        "Key": "asc",
        "Icon": "ArrowUp"
      },
      {
        "Name": "Sort descending (Z-A)",
        "Key": "desc",
        "Icon": "ArrowDown"
      }
    ],
    "Filters": [
      {
        "Name": "Show",
        "Type": "Checkbox"
      }
    ]
  }
];
