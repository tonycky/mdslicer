/**
 * Utility Functions Module
 * Common utility functions for the markdown slicer
 */

const fs = require("fs");
const path = require("path");

/**
 * Check if a file exists
 * @param {string} filePath - Path to the file
 * @returns {boolean} True if file exists, false otherwise
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Read file content
 * @param {string} filePath - Path to the file
 * @returns {string} File content
 */
function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

/**
 * Extract base name from file path (without extension)
 * @param {string} filePath - Path to the file
 * @returns {string} Base name without extension
 */
function getBaseName(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Path to the directory
 * @returns {string} The created directory path
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
  return dirPath;
}

/**
 * Build output directory path
 * @param {string} outputPath - Base output path
 * @param {string} baseName - Base name for the directory
 * @returns {string} Complete output directory path
 */
function buildOutputPath(outputPath, baseName) {
  return path.join(outputPath, baseName);
}

/**
 * Validate input file
 * @param {string} inputPath - Path to input file
 * @throws {Error} If file doesn't exist
 */
function validateInputFile(inputPath) {
  if (!fileExists(inputPath)) {
    throw new Error(`Input file '${inputPath}' does not exist`);
  }
}

/**
 * Get file statistics for info command
 * @param {string} content - File content
 * @returns {Object} File statistics
 */
function getFileStats(content) {
  const lines = content.split("\n").length;
  const headers = content.match(/^#{1,6}\s+.*/gm) || [];
  const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;

  return {
    lines,
    headers: headers.length,
    codeBlocks,
  };
}

module.exports = {
  fileExists,
  readFile,
  getBaseName,
  ensureDirectoryExists,
  buildOutputPath,
  validateInputFile,
  getFileStats,
};
