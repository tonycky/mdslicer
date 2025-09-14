/**
 * Markdown Parser Module
 * Handles parsing of markdown content into structured sections
 */

/**
 * Find the root level (minimum heading level) in the markdown content
 * @param {string} content - The markdown content to analyze
 * @returns {number} The root level (1-6)
 */
function findRootLevel(content) {
  const lines = content.split("\n");
  let minLevel = 6; // Start with maximum possible level

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+/);
    if (match) {
      const level = match[1].length;
      if (level < minLevel) {
        minLevel = level;
      }
    }
  }

  return minLevel === 6 ? 1 : minLevel; // Default to 1 if no headings found
}

/**
 * Create regex pattern for a specific heading level
 * @param {number} level - The heading level (1-6)
 * @returns {RegExp} Regex pattern for that heading level
 */
function createHeadingPattern(level) {
  const hashes = "#".repeat(level);
  return new RegExp(`^${hashes}\\s+`);
}

/**
 * Parse markdown content into sections based on headings
 * @param {string} content - The markdown content to parse
 * @returns {Array} Array of section objects
 */
function parseMarkdown(content) {
  const lines = content.split("\n");
  const rootLevel = findRootLevel(content);
  const nextLevel = rootLevel + 1;

  const rootPattern = createHeadingPattern(rootLevel);
  const nextLevelPattern = createHeadingPattern(nextLevel);

  const sections = [];
  let currentSection = { type: "root", content: [], heading: "" };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for root level heading
    if (line.match(rootPattern)) {
      if (
        currentSection.type === "root" &&
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
          type: "root",
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
        sections.filter((s) => s.type === "level2").length + 1;
      const fileName = generateFileName(sectionNumber, headingText);

      currentSection = {
        type: "level2",
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
  return `${sectionNumber}-${headingText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")}`;
}

/**
 * Get all level 2 sections from parsed sections
 * @param {Array} sections - Array of parsed sections
 * @returns {Array} Array of level 2 sections
 */
function getLevel2Sections(sections) {
  return sections.filter((s) => s.type === "level2");
}

module.exports = {
  parseMarkdown,
  generateFileName,
  getLevel2Sections,
  findRootLevel,
  createHeadingPattern,
};
