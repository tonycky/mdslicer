/**
 * Main Slicer Module
 * Orchestrates the markdown slicing process
 */

const parser = require("./parser");
const fileGenerator = require("./fileGenerator");
const utils = require("./utils");

/**
 * Slice a markdown file into smaller files
 * @param {string} inputPath - Path to input markdown file
 * @param {string} outputPath - Output directory name (based on input filename)
 * @returns {Object} Result object with success status and details
 */
function sliceMarkdown(inputPath, outputPath) {
  try {
    // Validate input file
    utils.validateInputFile(inputPath);

    // Read the markdown file
    const content = utils.readFile(inputPath);

    // Use the provided output path directly (it's already the base name)
    const outputDir = outputPath;
    utils.ensureDirectoryExists(outputDir);

    // Parse the markdown content
    const sections = parser.parseMarkdown(content);

    // Generate and write files
    fileGenerator.writeFiles(sections, outputDir);

    return {
      success: true,
      inputFile: inputPath,
      outputDir: outputDir,
      filesCreated: sections.length,
      sections: sections,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  sliceMarkdown,
};
