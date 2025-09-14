# mdslicer

A Node.js CLI tool for slicing and processing markdown files.

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
mdslicer slice input.md ./output/
```

### Analyze a markdown file

```bash
mdslicer info input.md
```

### Show help

```bash
mdslicer --help
```

## Options

### slice command

- `-s, --sections`: Split by sections (## headers)
- `-c, --chunks <size>`: Split into chunks of specified size (in lines)

## Examples

```bash
# Split a large markdown file by sections
mdslicer slice large-file.md ./sections/ --sections

# Split into chunks of 100 lines each
mdslicer slice large-file.md ./chunks/ --chunks 100

# Get information about a markdown file
mdslicer info my-document.md
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

## License

MIT
