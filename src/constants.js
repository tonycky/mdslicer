/**
 * Constants Module
 * Configuration constants for the markdown slicer
 */

// Markdown heading levels
const HEADING_LEVELS = {
  MIN: 1,
  MAX: 6,
  DEFAULT_ROOT: 1,
};

// File and directory names
const FILE_NAMES = {
  INDEX: "index.md",
  NAVIGATION_HEADER: "## Navigation",
};

// Section types
const SECTION_TYPES = {
  ROOT: "root",
  LEVEL2: "level2",
};

// CLI messages
const MESSAGES = {
  SLICING: "Slicing markdown file...",
  ANALYZING: "Analyzing",
  CREATED_DIRECTORY: "Created directory:",
  CREATED_FILE: "Created:",
  SUCCESS: "Successfully sliced",
  ERROR: "Error:",
  DEFAULT_OUTPUT: "(default)",
};

// File operations
const FILE_OPERATIONS = {
  ENCODING: "utf8",
  NEWLINE: "\n",
  EMPTY_STRING: "",
};

// String patterns
const STRING_PATTERNS = {
  HASH_SYMBOL: "#",
  DASH: "-",
  DOT_MD: ".md",
};

// Regex patterns
const REGEX_PATTERNS = {
  HEADING: /^(#{1,6})\s+/,
  CODE_BLOCKS: /```[\s\S]*?```/g,
  HEADERS: /^#{1,6}\s+.*/gm,
  FILENAME_SANITIZE: /[^a-z0-9\s]/g,
  WHITESPACE: /\s+/g,
};

module.exports = {
  HEADING_LEVELS,
  FILE_NAMES,
  SECTION_TYPES,
  MESSAGES,
  FILE_OPERATIONS,
  STRING_PATTERNS,
  REGEX_PATTERNS,
};
