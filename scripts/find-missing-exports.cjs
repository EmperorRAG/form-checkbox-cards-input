const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const LIB_DIR = path.join(SRC_DIR, 'components');
const INDEX_FILE = path.join(SRC_DIR, 'form-checkbox-cards-input.tsx');

// Helper to get all .ts and .tsx files recursively
function getAllTSFiles(dir) {
	const files = fs.readdirSync(dir, { withFileTypes: true });
	let tsFiles = [];
	for (const file of files) {
		const fullPath = path.join(dir, file.name);
		if (file.isDirectory()) {
			tsFiles = tsFiles.concat(getAllTSFiles(fullPath));
		} else if (file.isFile() && ((file.name.endsWith('.ts') && !file.name.endsWith('.d.ts')) || file.name.endsWith('.tsx'))) {
			tsFiles.push(fullPath);
		}
	}
	return tsFiles;
}

// Extract exported symbols from a file
function extractExports(fileContent) {
	const exports = [];
	const exportRegexes = [
		{ regex: /export\s+function\s+(\w+)/g, type: 'named' },
		{ regex: /export\s+const\s+(\w+)/g, type: 'named' },
		{ regex: /export\s+let\s+(\w+)/g, type: 'named' },
		{ regex: /export\s+var\s+(\w+)/g, type: 'named' },
		{ regex: /export\s+type\s+(\w+)/g, type: 'type' },
		{ regex: /export\s+interface\s+(\w+)/g, type: 'type' },
		{ regex: /export\s+class\s+(\w+)/g, type: 'named' },
		{ regex: /export\s+enum\s+(\w+)/g, type: 'named' },
	];
	for (const { regex, type } of exportRegexes) {
		let match;
		while ((match = regex.exec(fileContent)) !== null) {
			exports.push({ name: match[1], type });
		}
	}
	// Detect export default (function, class, or expression)
	const defaultExportRegexes = [
		{ regex: /export\s+default\s+function\s+(\w+)/, type: 'default-named' }, // export default function Name
		{ regex: /export\s+default\s+class\s+(\w+)/, type: 'default-named' }, // export default class Name
		{ regex: /export\s+default\s+(\w+)/, type: 'default-named' }, // export default Name
		{ regex: /export\s+default\s*\(/, type: 'default' }, // export default (expression)
		{ regex: /export\s+default\s*{/, type: 'default' }, // export default { ... }
		{ regex: /export\s+default\s*\[/, type: 'default' }, // export default [ ... ]
		{ regex: /export\s+default\s*`/, type: 'default' }, // export default `...`
		{ regex: /export\s+default\s*['"`]/, type: 'default' }, // export default '...' or "..."
	];
	let foundDefault = false;
	for (const { regex, type } of defaultExportRegexes) {
		const match = regex.exec(fileContent);
		if (match) {
			if (type === 'default-named') {
				exports.push({ name: 'default', type: 'default-named', localName: match[1] });
			} else {
				exports.push({ name: 'default', type: 'default' });
			}
			foundDefault = true;
			break;
		}
	}
	return exports;
}

// Extract re-exported symbols from index.ts
function extractIndexExports(indexContent) {
	const reExportRegex = /export\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;
	const exports = [];
	let match;
	while ((match = reExportRegex.exec(indexContent)) !== null) {
		const names = match[1].split(',').map((s) => s.trim());
		const filePath = match[2];
		for (const name of names) {
			exports.push({ name, filePath });
		}
	}
	// Handle: export { default } from './SomeComponent';
	const defaultExportRegex = /export\s*\{\s*default\s*as\s*(\w+)?\s*\}\s*from\s*['"]([^'"]+)['"]/g;
	while ((match = defaultExportRegex.exec(indexContent)) !== null) {
		exports.push({ name: 'default', filePath: match[2] });
	}
	// Handle: export { default } from './SomeComponent';
	const exportDefaultDirectRegex = /export\s*\{\s*default\s*\}\s*from\s*['"]([^'"]+)['"]/g;
	while ((match = exportDefaultDirectRegex.exec(indexContent)) !== null) {
		exports.push({ name: 'default', filePath: match[1] });
	}
	return exports;
}

// Main logic
const tsFiles = getAllTSFiles(LIB_DIR);
let allModuleExports = [];
for (const file of tsFiles) {
	const content = fs.readFileSync(file, 'utf8');
	const relPath =
		'./' +
		path
			.relative(SRC_DIR, file)
			.replace(/\\/g, '/')
			.replace(/\.(ts|tsx)$/, '');
	const exports = extractExports(content).map((e) => ({ ...e, filePath: relPath }));
	allModuleExports = allModuleExports.concat(exports);
}

// Remove duplicates
const uniqueModuleExports = [];
const seen = new Set();
for (const exp of allModuleExports) {
	const key = exp.name + '|' + exp.filePath;
	if (!seen.has(key)) {
		uniqueModuleExports.push(exp);
		seen.add(key);
	}
}

const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
const indexExports = extractIndexExports(indexContent);

function isExportedInIndex(symbol, filePath) {
	return indexExports.some((e) => e.name === symbol && e.filePath === filePath);
}

const missingExports = uniqueModuleExports.filter((exp) => !isExportedInIndex(exp.name, exp.filePath));

if (missingExports.length) {
	console.log('Symbols exported from modules but NOT re-exported in form-checkbox-cards-input.tsx:');
	const grouped = {};
	for (const exp of missingExports) {
		if (!grouped[exp.filePath]) grouped[exp.filePath] = [];
		grouped[exp.filePath].push({ name: exp.name, type: exp.type, localName: exp.localName });
	}
	for (const [filePath, symbols] of Object.entries(grouped)) {
		const typeExports = symbols.filter((s) => s.type === 'type').map((s) => s.name);
		const namedExports = symbols.filter((s) => s.type !== 'type' && s.name !== 'default').map((s) => s.name);
		const defaultExport = symbols.find((s) => s.name === 'default');
		if (namedExports.length) console.log(`export { ${namedExports.join(', ')} } from '${filePath}';`);
		if (typeExports.length) console.log(`export type { ${typeExports.join(', ')} } from '${filePath}';`);
		if (defaultExport) {
			if (defaultExport.type === 'default-named' && defaultExport.localName) {
				console.log(`export { default as ${defaultExport.localName} } from '${filePath}';`);
			} else {
				console.log(`export { default } from '${filePath}';`);
			}
		}
	}
} else {
	console.log('None!');
}
