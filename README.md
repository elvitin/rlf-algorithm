# Algoritmo de Coloração de Grafos - RLF (Recursive Largest First)

Este projeto implementa o algoritmo RLF (Recursive Largest First) para resolver o problema da coloração de grafos. O objetivo é colorir os vértices de um grafo de forma que dois vértices adjacentes não tenham a mesma cor, utilizando o menor número possível de cores.

## Como Executar

1.  **Instale as dependências:**
    Certifique-se de ter o Node.js instalado. Em seguida, instale as dependências do projeto.
    ```bash
    npm install
    ```

2.  **Execute o algoritmo:**
    Você pode executar o algoritmo a partir de duas fontes de dados: uma matriz de adjacência ou uma lista de adjacência.

    *   **Usando uma Matriz de Adjacência:**
        Use o comando `rlf:matrix` e especifique o caminho para o arquivo de matriz.
        ```bash
        npm run rlf:matrix <caminho-para-o-arquivo>
        ```
        Exemplo:
        ```bash
        npm run rlf:matrix docs/MTesteAColoracao.txt
        ```

    *   **Usando uma Lista de Adjacência:**
        Use o comando `rlf:list` e especifique o caminho para o arquivo de lista.
        ```bash
        npm run rlf:list <caminho-para-o-arquivo>
        ```
        Exemplo:
        ```bash
        npm run rlf:list docs/ListaTesteAColoracao.txt
        ```
    O resultado, mostrando as etapas do algoritmo e a matriz de coloração final, será exibido no console.

## Funcionamento do Algoritmo