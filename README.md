# Hoypress

## Índice
1. [Apresentação do Projeto](#1-apresentação-do-projeto)
2. [Como testar o projeto](#2-como-testar-o-projeto)
3. [Conclusão e comentários](#3-conclusão-e-comentários)

## 1. Apresentação do Projeto
- O projeto consiste em um sistema de blog, onde o usuário pode criar, editar e excluir posts, além de poder visualizar os posts de outros usuários.
- O projeto foi desenvolvido em **Node.js**, utilizando o framework **Express.js**, com o padrão **MVC** e com o banco de dados, **SQLite**.
- O projeto foi desenvolvido por mim, embora a inspiração tenha vindo de um curso que estou fazendo na **Udemy**, chamado **Formação Node.js**, do professor **Victor Lima**. Claro que, embora a ideia tenha vindo desse curso, grande parte do funcionamento do projeto foi desenvolvido por mim, com algumas dicas do professor, e com algumas partes do código sendo copiadas do curso, mas com o meu entendimento do que estava sendo feito.

## 2. Como testar o projeto
1. Tenha o **Node.js** instalado na sua máquina. Caso não tenha, basta clicar [**aqui**](https://nodejs.org/en/) para baixar.
2. Tenha o **Git** instalado na sua máquina. Caso não tenha, basta clicar [**aqui**](https://git-scm.com/downloads) para baixar.
3. Abra o **Git** e digite: `git clone https://github.com/Hoyasumii/Hoypress.git`
4. Após clonar o repositório, abra o terminal na pasta do projeto e digite: `npm install`
5. Após instalar as dependências, digite: `npm start`
6. Abra o navegador e digite: `localhost:3000`
7. Pronto! O projeto já está rodando na sua máquina.

## 3. Conclusão e comentários
- O projeto inicialmente foi divertido de se fazer, tanto que investi muito em um front-end que fosse diferente do que o professor estava ensinando, entretanto, quando eu precisei fazer uma pausa no desenvolvimento para realizar o [Teste Fullstack - Medlynx](https://github.com/Hoyasumii/teste-fullstack-medlynx) e retomei ao projeto, senti a ineficiência de usar o padrão MVC em projetos, pois as engines de templates de HTML não são tão eficientes quanto um framework ou biblioteca voltada ao desenvolvimento web atual. Como eu posso dizer, elas limitam a dinamicidade de um site. Por exemplo, ao enviar os dados da View para um script JavaScript, você vai sentir o quão esquisito é. Eu imagino que deva haver maneiras mais tranquilas de fazer isso, mas usando essas engines como EJS, vai ser um pouco chato.
- E durante essa minha implicação com o MVC que me veio a ideia de utilizar o front-end escrito em React.js e o back-end em Express.js, mas pelo fato do projeto já estar quase 100% concluído, apenas precisando de algumas correções, decidi não fazer essa mudança, mas em projetos futuros, provavelmente farei deste método.
- Apesar de eu estar um pouco desgostoso com o padrão MVC, eu ainda acredito que uma pessoa que ainda esteja aprendendo programação deva saber, pois a pessoa vai acabar entendendo como funciona o fluxo de dados de um projeto web, e isso é muito importante, principalmente quando ela começar a criar e consumir APIs.