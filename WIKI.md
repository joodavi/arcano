# Arcano

## 1. Descrição
Arcano é uma ferramenta React, criada para simplificar a exploração de dados por meio da geração de visualizações. O processo de criação começa ao importar um dataset, você tem à disposição canais visuais como eixos X e Y, cores e tamanhos. As variáveis podem ter seus tipos alterados e adicionadas aos canais para montar a visualização. É possível salvar cada gráfico dentro do sistema, garantindo que você possa revisitar e refinar seu trabalho sempre que quiser.

Pensado tanto para especialistas quanto para não especialistas, o Arcano atende professores, alunos ou qualquer pessoa interessada em transformar dados em insights. Não é preciso ter experiência prévia com programação ou design de gráficos.

Atualmente, Arcano usa o Vega-Lite como gramática de gráficos, mas a arquitetura foi pensada para permitir a integração de outras bibliotecas de visualização. A ideia é, no futuro, oferecer interações avançadas, data facts e apoio a data stories.

Para esta versão, todo o sitema roda apenas no front-end, o que pode sobrecarregar o navegador ao lidar com conjuntos de dados muito grandes. Um dos próximos passos é desenvolver um backend robusto que assuma o processamento. Os gráficos tem interações pré-definidas, não sendo possível alterá-las, somente habilitar ou desabilitar. Como objetivo futuro, estão a recomendação e manipulação destas interações.

## 2. Visão do Projeto
### 2.1 Cenário Positivo 1
Márcia é professora de Biologia e quer ilustrar aos alunos como a distribuição de espécies varia ao longo do tempo. Ela importa um arquivo CSV contendo dados de observações feitas em campo, arrasta “Ano” para o eixo X, “Número de Registros” para o eixo Y e usa cores para destacar diferentes famílias de espécies. Em segundos, um gráfico interativo aparece, permitindo que ela destaque padrões sazonais. Satisfeita, Márcia salva a visualização no Arcano para revisitar em outra aula.

### 2.2 Cenário Positivo 2
Rafael é analista de marketing e precisa avaliar o impacto regional de sua última campanha. Ele faz o upload de um CSV com vendas por cidade e, ao visualizar o preview, percebe que a coluna “Data da Venda” foi interpretada como texto. Então, acessa a ferramenta de manipulação de tipos e ajusta “Data da Venda” para temporal, garantindo que o eixo temporal funcione corretamente. Em seguida, arrasta “Data da Venda” para o eixo X, “Receita” ao tamanho dos pontos e “Região” ao canal de cores. O gráfico interativo destaca imediatamente quais regiões tiveram melhor desempenho ao longo do período. Satisfeito, Rafael salva a visualização no Arcano e, mais tarde, retorna ao sistema para refinar o intervalo de datas e aprofundar ainda mais a análise.

### 2.3 Cenário Negativo 1
Ricardo é um analista de dados que recebeu um CSV com mais de 50.000 registros de transações diárias para examinar padrões de vendas. Ele faz o upload do arquivo e mapeia “Data” para o eixo X, “Valor” para o eixo Y. O gráfico carrega corretamente, mas, ao tentar usar a função de zoom para se concentrar em um mês específico, percebe que a interação fica lenta. Ao arrastar o gráfico (pan), a resposta é igualmente arrastada, com “saltos” visuais e atrasos que impedem uma exploração fluida. Frustrado pela demora constante e pelos travamentos ocasionais, Ricardo desiste da análise interativa no Arcano e exporta os dados para uma ferramenta de desktop mais robusta.

### 2.4 Cenário Negativo 2
Carolina é analista financeira e prepara um gráfico de barras para apresentar o volume de vendas por produto. Ela deseja que, ao clicar em uma barra, ela seja destacada (select), mas sem que um simples movimento de mouse sobre as barras dispare o efeito de realce (hover), para evitar distrações durante sua apresentação. No Arcano, porém, as interatividades de hover e select vêm agrupadas e não podem ser ajustadas individualmente. Ao desativar o hover, todo o pacote de interações é removido e, com isso, ela perde também a funcionalidade de seleção. Incapaz de separar essas ações, Carolina não consegue adequar o gráfico ao seu estilo de apresentação e acaba exportando o gráfico estático para outro software que permita personalizar cada interação isoladamente.

## 3. Documentação Técnica
### 3.1 Requisitos
### 3.1.1 Requisitos funcionais
[RF01] O sistema deve permitir que o usuário importe arquivos no formato CSV, validando sua estrutura.
[RF02] Após o upload, o sistema deve identificar e permitir ao usuário ajustar o tipo de cada coluna, garantindo que as variáveis sejam interpretadas corretamente para a visualização.
[RF03] O usuário deve poder mapear variáveis para canais visuais (eixo X, eixo Y, cor, tamanho) por meio de uma interface.
[RF04] O sistema deve oferecer um mecanismo para salvar cada visualização criada em um repositório interno, permitindo que o usuário acesse, edite ou exclua suas visualizações salvas a qualquer momento.
### 3.1.2 Requisitos não-funcionais
[RNF01] O sistema deve ser fácil de utilizar, permitindo que usuários inexperientes
consigam gerar visualizações.
[RNF02] O código deve ser organizado em módulos coesos e seguir padrões de estilo e nomenclatura consistentes, facilitando a compreensão, extensão e correção de bugs por novos desenvolvedores ou em futuras iterações.
### 3.1.3 Tecnologias

#### 3.1.3.1 TypeScript
A escolha do TypeScript traz tipagem estática ao projeto, o que aumenta a consistência do código e minimiza erros em tempo de compilação. Com as definições de tipos, torna-se mais fácil evoluir o sistema, refatorar componentes e integrar novas funcionalidades sem comprometer a estabilidade existente.

#### 3.1.3.2 React e Vite
O React oferece uma abordagem declarativa para construir interfaces, com componentes reutilizáveis e um ecossistema maduro que facilita a criação de UIs interativas. Já o Vite funciona como um bundler e servidor de desenvolvimento ultrarrápido, aproveitando ES Modules nativos no navegador para reconstruções quase instantâneas e hot module replacement, acelerando o feedback durante a codificação.

#### 3.1.3.3 Gramática de visualização
Arcano foi arquitetado para ser modular e flexível: toda a camada de geração de gráficos é isolada por meio de abstrações que podem ser estendidas a outras gramáticas de visualização. Hoje utilizamos Vega-Lite, mas a estrutura está preparada para incorporar alternativas como D3, Chart.js ou qualquer outra biblioteca, sem grandes retrabalhos. Essa modularização garante que o código permaneça limpo, escalável e pronto para crescimentos e integrações futuras.

## 4 Manual de Utilização
### 4.1 Inserir de Dataset
Passo 1: Na tela principal do Arcano, clique em “New dataset”. No modal, clique em "Load a CSV file". Selecione o arquivo no seu computador;

Passo 2: Aguarde o sistema exibir a pré-visualização dos dados.

Passo 3: Verifique se todas as colunas foram detectadas corretamente no preview, clique em "Save this dataset".

--- 
Exceções:

EXC1: um arquivo com outro formato for inserido

Então faça:
1. Observe que, embora o upload seja aceito, a visualização não faz sentido (colunas faltando ou valores inválidos).
2. Confira a extensão do arquivo no preview e a mensagem de alerta do sistema.
3. Converta/exporte seu dado para o formato CSV e tente novamente.

Arcano ainda não filtra os tipos arquivos inserido.

EXC2: um dataset muito grande for inserido

Então faça:
1. Note que o upload demora e a renderização do gráfico fica lenta ou travando.
2. Consulte a notificação de performance (se exibida) ou teste ações de zoom/pan para verificar a lentidão.
3. Divida o dataset em partes menores ou crie uma amostra representativa e importe esse subconjunto.

Arcano faz processamento no front-end e tem dificuldades com arquivos grandes.

### 4.2 Ajustar tipos de dados

Passo 1: Após o upload do CSV, acesse na página inicial, através do botão de editar - presente em cada card de dataset - para ter acesso a edição dos tipos de coluna.

Passo 2: Identifique colunas cujo tipo detectado não condiz com os valores.

Passo 3: Selecione o tipo correto na lista em cada coluna, note que é permitida a seleção de qualquer outro tipo de dado, mas nem todos serãoa ceitos pelo sistema e não sofrerão mudança.

Passo 4: Quando todos os tipos estiverem corretos, volte a página inicial e terá salvo os tipos de dados novo.

### 4.3 Mapear variáveis aos canais visuais

Passo 1: Abra o painel de criação de visuzliações, onde estão listados Eixo X, Eixo Y, Cor e Tamanho.

Passo 2: Selecione a variável desejada usando os botões "Add" em cada canal.

Passo 3: Repita o processo para cada canal até compor a visualização desejada.

Passo 4: Use o botão de interatividade, ao lado da visualização, para ativar interações. 

### 4.4 Deletar dataset

Passo 1: Acesse a página inicial.

Passo 2: Localize o dataset que você deseja remover na lista.

Passo 3: Clique no ícone de lixeira dentro do card.

Passo 4: Confirme a ação na janela modal de confirmação.

---
Exceções

EXC1: ao apagar um dataset, o modal de deleção continua aparecendo para os dataset subsequentes

Passo 1: Use o botão de fechar o modal, para não visualizar mais o modal de deleção.

Isso acontece pois a ação de deleção está diretamente envolvido com a posição do dataset em um array. Então quando um array ocupa sua posição, ele continua sugerindo a opção de deletar o dataset.