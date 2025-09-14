/**
 * Markdown Parser Module
 * Handles parsing of markdown content into structured sections
 */

const {
  HEADING_LEVELS,
  SECTION_TYPES,
  REGEX_PATTERNS,
  FILE_OPERATIONS,
  STRING_PATTERNS,
} = require("./constants");

/**
 * Find the root level (minimum heading level) in the markdown content
 * @param {string} content - The markdown content to analyze
 * @returns {number} The root level (1-6)
 */
function findRootLevel(content) {
  const lines = content.split(FILE_OPERATIONS.NEWLINE);
  let minLevel = HEADING_LEVELS.MAX; // Start with maximum possible level

  for (const line of lines) {
    const match = line.match(REGEX_PATTERNS.HEADING);
    if (match) {
      const level = match[1].length;
      if (level < minLevel) {
        minLevel = level;
      }
    }
  }

  // Default to 1 if no headings found
  return minLevel === HEADING_LEVELS.MAX
    ? HEADING_LEVELS.DEFAULT_ROOT
    : minLevel;
}

/**
 * Create regex pattern for a specific heading level
 * @param {number} level - The heading level (1-6)
 * @returns {RegExp} Regex pattern for that heading level
 */
function createHeadingPattern(level) {
  const hashes = STRING_PATTERNS.HASH_SYMBOL.repeat(level);
  return new RegExp(`^${hashes}\\s+`);
}

/**
 * Parse markdown content into sections based on headings
 * @param {string} content - The markdown content to parse
 * @returns {Array} Array of section objects
 */
function parseMarkdown(content) {
  const lines = content.split(FILE_OPERATIONS.NEWLINE);
  const rootLevel = findRootLevel(content);
  const nextLevel = rootLevel + 1;

  const rootPattern = createHeadingPattern(rootLevel);
  const nextLevelPattern = createHeadingPattern(nextLevel);

  const sections = [];
  let currentSection = {
    type: SECTION_TYPES.ROOT,
    content: [],
    heading: FILE_OPERATIONS.EMPTY_STRING,
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for root level heading
    if (line.match(rootPattern)) {
      if (
        currentSection.type === SECTION_TYPES.ROOT &&
        currentSection.content.length === 0
      ) {
        currentSection.heading = line.replace(rootPattern, "");
        currentSection.content.push(line);
      } else {
        // Save current section and start new one
        if (currentSection.content.length > 0) {
          sections.push({ ...currentSection });
        }
        currentSection = {
          type: SECTION_TYPES.ROOT,
          content: [line],
          heading: line.replace(rootPattern, ""),
        };
      }
    }
    // Check for next level heading (sub-sections)
    else if (line.match(nextLevelPattern)) {
      // Save current section
      if (currentSection.content.length > 0) {
        sections.push({ ...currentSection });
      }

      // Start new sub-section
      const headingText = line.replace(nextLevelPattern, "");
      const sectionNumber =
        sections.filter((s) => s.type === SECTION_TYPES.LEVEL2).length + 1;
      const fileName = generateFileName(sectionNumber, headingText);

      currentSection = {
        type: SECTION_TYPES.LEVEL2,
        content: [line],
        heading: headingText,
        fileName: fileName,
      };
    }
    // Regular content line
    else {
      currentSection.content.push(line);
    }
  }

  // Add the last section
  if (currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Generate a filename from section number and heading text
 * @param {number} sectionNumber - The section number
 * @param {string} headingText - The heading text
 * @returns {string} Generated filename
 */
function generateFileName(sectionNumber, headingText) {
  return `${sectionNumber}${STRING_PATTERNS.DASH}${headingText
    .toLowerCase()
    .replace(REGEX_PATTERNS.FILENAME_SANITIZE, FILE_OPERATIONS.EMPTY_STRING)
    .replace(REGEX_PATTERNS.WHITESPACE, STRING_PATTERNS.DASH)}`;
}

/**
 * Get all level 2 sections from parsed sections
 * @param {Array} sections - Array of parsed sections
 * @returns {Array} Array of level 2 sections
 */
function getLevel2Sections(sections) {
  return sections.filter((s) => s.type === SECTION_TYPES.LEVEL2);
}

module.exports = {
  parseMarkdown,
  generateFileName,
  getLevel2Sections,
  findRootLevel,
  createHeadingPattern,
};
