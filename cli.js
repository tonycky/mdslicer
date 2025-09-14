#!/usr/bin/env node

const { program } = require("commander");
const slicer = require("./src/slicer");

program
  .name("mdslicer")
  .description("A CLI tool for slicing markdown files")
  .version("1.0.0");

program
  .command("slice")
  .description("Slice a markdown file")
  .argument("<input>", "input markdown file")
  .argument(
    "[output]",
    "output directory (defaults to filename without extension)"
  )
  .option("-s, --sections", "split by sections (## headers)")
  .option(
    "-c, --chunks <size>",
    "split into chunks of specified size (in lines)",
    parseInt
  )
  .action((input, output, options) => {
    console.log("Slicing markdown file...");
    console.log(`Input: ${input}`);

    // Use default output directory if not provided
    if (!output) {
      const path = require("path");
      output = path.basename(input, path.extname(input));
      console.log(`Output: ${output} (default)`);
    } else {
      console.log(`Output: ${output}`);
    }

    console.log(`Options:`, options);

    const result = slicer.sliceMarkdown(input, output);

    if (result.success) {
      console.log(
        `\nSuccessfully sliced ${result.inputFile} into ${result.filesCreated} files in ${result.outputDir}`
      );
    } else {
      console.error(`Error: ${result.error}`);
      process.exit(1);
    }
  });

program
  .command("info")
  .description("Show information about a markdown file")
  .argument("<file>", "markdown file to analyze")
  .action((file) => {
    console.log(`Analyzing ${file}...`);

    const result = slicer.getFileInfo(file);

    if (result.success) {
      console.log(`Lines: ${result.stats.lines}`);
      console.log(`Headers: ${result.stats.headers}`);
      console.log(`Code blocks: ${result.stats.codeBlocks}`);
    } else {
      console.error(`Error: ${result.error}`);
      process.exit(1);
    }
  });

program.parse();
