# Pinta Pinta: diretório de desenhos

Catálogo online do app Pinta Pinta, publicado pelo GitHub Pages.

Endereço para colar no app (Área dos pais > Catálogo de desenhos):

    https://maciellopes1.github.io/pinta-pinta-desenhos/

## Estrutura
- `catalog.json`: lista de pacotes. Campos: `id`, `title`, `premium` (true = só assinantes Plus),
  `file` (caminho do pacote), `count` (número de desenhos) e `rev` (aumente ao atualizar o pacote).
- `packs/<id>.json`: desenhos do pacote, no mesmo formato de `app/assets/drawings.json`.

## Publicar um pacote novo
1. No projeto do app, edite `tools/packs.py` e rode `python tools/packs.py <pasta-deste-repositório>`.
2. Faça commit e push. O GitHub Pages publica em cerca de 1 minuto.
3. Os aparelhos baixam a novidade na próxima atualização do catálogo.

## Atenção
Este repositório precisa ser público para o GitHub Pages gratuito funcionar, então qualquer pessoa
com o endereço consegue baixar os pacotes Plus. O cadeado no app impede o uso por quem não assina,
mas não protege os arquivos. Para proteger de verdade, use um servidor que confira a compra na
Google Play antes de entregar o pacote.
