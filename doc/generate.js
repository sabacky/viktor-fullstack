const generateHtmlFromYaml = require('swagger-yaml-to-html');

// Provide input YAML file path and output HTML file path
const inputFilePath = 'openapi.yaml';
const outputFilePath = 'index.html';

// Convert YAML to HTML
generateHtmlFromYaml(inputFilePath, outputFilePath);