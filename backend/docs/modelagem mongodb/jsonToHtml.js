const fs = require("fs");
const path = require("path");

// Função para converter um objeto JSON em HTML
function jsonToHtml(json) {
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html +=
    '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Documentação MongoDB</title>\n</head>\n<body>\n';
  html += "<h1>Database: " + json.database + "</h1>\n";
  html += "<ul>\n";
  json.collections.forEach((collection) => {
    html += "<li>\n";
    html += "<strong>Collection: " + collection.name + "</strong><br>\n";
    html +=
      "<h3>Example Document:</h3>\n<pre>" +
      (collection.exampleDocument === "Nenhum documento encontrado"
        ? collection.exampleDocument
        : JSON.stringify(JSON.parse(collection.exampleDocument), null, 2)) +
      "</pre>\n";
    html += "<h3>Indexes:</h3>\n<ul>\n";
    collection.indexes.forEach((index) => {
      html +=
        "<li>Key: " +
        JSON.stringify(index.key) +
        ", Unique: " +
        index.unique +
        ", Name: " +
        index.name +
        "</li>\n";
    });
    html += "</ul>\n</li>\n";
  });
  html += "</ul>\n</body>\n</html>";

  return html;
}

// Lê o arquivo JSON
const jsonFile = fs.readFileSync("documentacao.json", "utf8");
const jsonData = JSON.parse(jsonFile);

// Converte JSON para HTML
const html = jsonToHtml(jsonData);

// Salva o HTML em um arquivo
fs.writeFileSync("documentacao.html", html);

console.log(
  "Documentação HTML gerada com sucesso! Verifique o arquivo documentacao.html"
);
