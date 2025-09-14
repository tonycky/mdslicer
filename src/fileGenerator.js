/**
 * File Generator Module
 * Handles generation of markdown files from parsed sections
 */

const fs = require("fs");
const path = require("path");

/**
 * Generate navigation content for index.md
 * @param {Array} level2Sections - Array of level 2 sections
 * @returns {string} Navigation markdown content
 */
function generateNavigation(level2Sections) {
  if (level2Sections.length === 0) {
    return "";
  }

  let navigation = "\n\n## Navigation\n\n";
  level2Sections.forEach((section, index) => {
    const linkText = section.heading;
    const linkFile = `${section.fileName}.md`;
    navigation += `${index + 1}. [${linkText}](${linkFile})\n`;
  });

  return navigation;
}

/**
 * Generate content for index.md file
 * @param {Object} rootSection - The root section object
 * @param {Array} level2Sections - Array of level 2 sections
 * @returns {string} Complete index.md content
 */
function generateIndexContent(rootSection, level2Sections) {
  let content = rootSection.content.join("\n");
  content += generateNavigation(level2Sections);
  return content;
}

/**
 * Generate content for a level 2 section file
 * @param {Object} section - The section object
 * @returns {string} Section file content
 */
function generateSectionContent(section) {
  return section.content.join("\n");
}

/**
 * Write files to the output directory
 * @param {Array} sections - Array of parsed sections
 * @param {string} outputDir - Output directory path
 */
function writeFiles(sections, outputDir) {
  const level2Sections = sections.filter((s) => s.type === "level2");

  sections.forEach((section) => {
    let fileName;
    let fileContent;

    if (section.type === "root") {
      fileName = "index.md";
      fileContent = generateIndexContent(section, level2Sections);
    } else if (section.type === "level2") {
      fileName = `${section.fileName}.md`;
      fileContent = generateSectionContent(section);
    }

    if (fileName && fileContent) {
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, fileContent);
      console.log(`Created: ${fileName}`);
    }
  });
}

module.exports = {
  generateNavigation,
  generateIndexContent,
  generateSectionContent,
  writeFiles,
};
