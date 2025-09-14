#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const slicer = require("./src/slicer");
const { MESSAGES } = require("./src/constants");

program
  .name("mdslicer")
  .description("A CLI tool for slicing markdown files")
  .version("1.0.0");

program
  .command("slice")
  .description("Slice a markdown file")
  .argument("<input>", "input markdown file")
  .action((input) => {
    console.log(MESSAGES.SLICING);
    console.log(`Input: ${input}`);

    // Always use default output directory based on input filename
    const output = path.basename(input, path.extname(input));
    console.log(`Output: ${output} ${MESSAGES.DEFAULT_OUTPUT}`);

    const result = slicer.sliceMarkdown(input, output);

    if (result.success) {
      console.log(
        `\n${MESSAGES.SUCCESS} ${result.inputFile} into ${result.filesCreated} files in ${result.outputDir}`
      );
    } else {
      console.error(`${MESSAGES.ERROR} ${result.error}`);
      process.exit(1);
    }
  });

program.parse();
