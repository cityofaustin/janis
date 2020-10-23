export const SCREEN_BREAKPOINTS = {
  XLARGE: 1250,
  LARGE: 1080,
  MEDIUM: 768,
  SMALL: 480,
};

export const WEEKDAY_MAP = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export const DAYS = () => ([
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
]);

export const FULL_WIDTH_RESPONSIVE_IMAGE_SIZES =
  [640, 720, 750, 828, 1080, 1440, 2160]
;

// Max length for our Filter keyword Search
// Arbitrary. But if you search for something really long, it would negatively impact postgres performance
export const maxKeywordLength = 100

// Min length for our Filter keyword Search
// Django .search() won't work for fewer than 3 characters
export const minKeywordLength = 3
