#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");

program
  .name("mdslicer")
  .description("A CLI tool for slicing markdown files")
  .version("1.0.0");

program
  .command("slice")
  .description("Slice a markdown file")
  .argument("<input>", "input markdown file")
  .argument("<output>", "output directory")
  .option("-s, --sections", "split by sections (## headers)")
  .option(
    "-c, --chunks <size>",
    "split into chunks of specified size (in lines)",
    parseInt
  )
  .action((input, output, options) => {
    console.log("Slicing markdown file...");
    console.log(`Input: ${input}`);
    console.log(`Output: ${output}`);
    console.log(`Options:`, options);

    // TODO: Implement the actual slicing logic
    console.log("Feature coming soon!");
  });

program
  .command("info")
  .description("Show information about a markdown file")
  .argument("<file>", "markdown file to analyze")
  .action((file) => {
    console.log(`Analyzing ${file}...`);

    if (!fs.existsSync(file)) {
      console.error(`Error: File '${file}' does not exist`);
      process.exit(1);
    }

    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n").length;
    const headers = content.match(/^#{1,6}\s+.*/gm) || [];
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;

    console.log(`Lines: ${lines}`);
    console.log(`Headers: ${headers.length}`);
    console.log(`Code blocks: ${codeBlocks}`);
  });

program.parse();
