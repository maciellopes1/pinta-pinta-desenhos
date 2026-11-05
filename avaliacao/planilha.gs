/**
 * Recebe as respostas do formulário de avaliação (avaliacao/index.html)
 * e grava uma linha na planilha "Pinta Pinta - Avaliações dos testadores".
 *
 * Como instalar (uma vez):
 * 1. Abra a planilha no Google Drive > Extensões > Apps Script.
 * 2. Apague o que estiver lá, cole este arquivo inteiro e salve.
 * 3. Implantar > Nova implantação > tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa. Implantar e autorizar.
 * 4. Copie a URL do app da Web (termina em /exec) e coloque em SHEET_URL no index.html.
 *
 * A nota de 0 a 1000 é recalculada aqui, com a mesma regra da página,
 * para que ninguém consiga mandar uma nota inventada.
 */

var CLOSED = ["quem","tempo","voltou","nota","crianca","sozinha","nps","t_balde","t_pincel","t_borracha","t_brilho","t_desfazer","t_cores","t_zoom","pacotes","acervo","voz","pais","pais_crianca","criador","plus","travou"];
var COLUMNS = ["versao","quem","aparelho","tempo","voltou","nota","crianca","sozinha","nps","t_balde","t_pincel","t_borracha","t_brilho","t_desfazer","t_cores","t_zoom","ferr_obs","pacotes","temas","acervo","voz","pais","pais_crianca","criador","plus","travou","bug","gostou","mudaria"];
var TOOLS = ["t_balde","t_pincel","t_borracha","t_brilho","t_desfazer","t_cores","t_zoom"];

function str(v) {
  if (Array.isArray(v)) v = v.join(", ");
  return String(v == null ? "" : v).slice(0, 2000);
}

function safe(v) {
  v = str(v);
  return /^[=+\-@]/.test(v) ? "'" + v : v; // impede fórmula vinda de fora
}

function words(v) {
  var w = str(v).toLowerCase().match(/[a-zà-ú0-9]{2,}/g) || [];
  var u = {};
  w.forEach(function (x) { u[x] = 1; });
  return Math.min(w.length, Object.keys(u).length * 1.5);
}

function part(v, target, max) { return Math.round(max * Math.min(1, words(v) / target)); }

function score(d) {
  var got = CLOSED.filter(function (n) { return str(d[n]) !== ""; }).length;
  var closed = Math.round(400 * got / CLOSED.length);
  var device = words(d.aparelho) >= 1 ? 50 : 0;
  var reported = TOOLS.some(function (n) { return d[n] === "Deu problema"; }) || (str(d.travou) !== "" && d.travou !== "Não");
  var problems = reported ? part(str(d.ferr_obs) + " " + str(d.bug), 30, 150) : (d.travou === "Não" ? 150 : 0);
  var texts = part(d.gostou, 25, 150) + part(d.mudaria, 35, 200) + part(d.temas, 3, 50) + problems;
  return { total: closed + device + texts, closed: closed, device: device, texts: texts };
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents);
    var s = score(d);
    var row = [new Date(), s.total, s.closed, s.device, s.texts, safe(str(d.apelido).slice(0, 60))];
    COLUMNS.forEach(function (k) { row.push(safe(d[k])); });
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, nota: s.total })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("Formulário do Pinta Pinta: ok");
}
