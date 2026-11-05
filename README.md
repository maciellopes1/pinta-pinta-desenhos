# Pinta Pinta: diretório de desenhos

Catálogo online do app Pinta Pinta.

O app já vem apontando para este endereço (dá para trocar em Área dos pais > Catálogo de desenhos):

    https://raw.githubusercontent.com/maciellopes1/pinta-pinta-desenhos/main/

Formulário de avaliação do grupo de teste: `avaliacao/index.html` (precisa do GitHub Pages ligado, endereço
`https://maciellopes1.github.io/pinta-pinta-desenhos/avaliacao/`). Também dá para avaliar por Issue (modelo em `.github/ISSUE_TEMPLATE`).

Se preferir o GitHub Pages, ative em Settings > Pages > Branch `main` / `(root)` e use
`https://maciellopes1.github.io/pinta-pinta-desenhos/`.

## Estrutura
- `catalog.json`: lista de pacotes. Campos: `id`, `title`, `premium` (true = só assinantes Plus),
  `file` (caminho do pacote), `count` (número de desenhos) e `rev` (aumente ao atualizar o pacote).
- `packs/<id>.json`: desenhos do pacote, no mesmo formato de `app/assets/drawings.json`.

## Publicar um pacote novo
1. No projeto do app, edite `tools/packs.py` e rode `python tools/packs.py <pasta-deste-repositório>`.
2. Faça commit e push. O endereço acima mostra a novidade em até 5 minutos.
3. Os aparelhos baixam a novidade na próxima atualização do catálogo.

## Atenção
Este repositório precisa ser público para o app conseguir baixar os pacotes sem senha, então qualquer pessoa
com o endereço consegue baixar os pacotes Plus. O cadeado no app impede o uso por quem não assina,
mas não protege os arquivos. Para proteger de verdade, use um servidor que confira a compra na
Google Play antes de entregar o pacote.
