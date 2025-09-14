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
 * @param {string} outputPath - Path to output directory
 * @returns {Object} Result object with success status and details
 */
function sliceMarkdown(inputPath, outputPath) {
  try {
    // Validate input file
    utils.validateInputFile(inputPath);

    // Read the markdown file
    const content = utils.readFile(inputPath);

    // Extract filename without extension for directory name
    const baseName = utils.getBaseName(inputPath);

    // Create output directory
    // If outputPath is already the base name, use it directly
    // Otherwise, create a subdirectory with the base name
    const outputDir =
      outputPath === baseName
        ? outputPath
        : utils.buildOutputPath(outputPath, baseName);
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

/**
 * Get information about a markdown file
 * @param {string} filePath - Path to markdown file
 * @returns {Object} File information object
 */
function getFileInfo(filePath) {
  try {
    utils.validateInputFile(filePath);
    const content = utils.readFile(filePath);
    const stats = utils.getFileStats(content);

    return {
      success: true,
      file: filePath,
      stats: stats,
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
  getFileInfo,
};
