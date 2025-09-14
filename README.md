# mdslicer

A powerful Node.js CLI tool for intelligently slicing and processing markdown files. Automatically splits large markdown documents into organized, navigable sections while preserving structure and creating an index file for easy navigation.

## Features

- **Smart Section Detection**: Automatically detects the root heading level and splits content accordingly
- **Automatic Index Generation**: Creates an `index.md` file with navigation links to all sections
- **Clean File Naming**: Automatically sanitizes section titles into valid filenames
- **Preserved Structure**: Maintains original markdown formatting and hierarchy

## Installation

### Global Installation (Recommended)

```bash
npm install -g mdslicer
```

### Local Installation

```bash
npm install mdslicer
```

### Using with npx (No Installation Required)

```bash
npx mdslicer
```

## Usage

### Slice a markdown file

```bash
mdslicer slice input.md
```

This will create a directory named after the input file (without extension) containing the sliced files.

### Show help

```bash
mdslicer --help
```

## How It Works

mdslicer intelligently analyzes your markdown file to:

1. **Find the root level**: Determines the minimum heading level (e.g., if your document starts with `##`, it uses that as the root)
2. **Split by sections**: Creates separate files for each section at the root level
3. **Generate navigation**: Creates an `index.md` file with links to all sections
4. **Preserve content**: Maintains all content, formatting, and sub-sections within each file

## Examples

```bash
# Basic usage - creates a directory named 'my-document'
mdslicer slice my-document.md
```

### Example Output Structure

For a markdown file with this structure:

```markdown
# Main Title

Introduction content...

## Section 1

Content for section 1...

## Section 2

Content for section 2...
```

mdslicer will create:

```
my-document/
├── index.md          # Contains intro + navigation links
├── section-1.md      # Section 1 content
└── section-2.md      # Section 2 content
```

## Development

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

### Test the CLI

```bash
node cli.js --help
```

## Requirements

- Node.js >= 14.0.0

## License

MIT
