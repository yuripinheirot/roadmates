# Roadmates

Roadmates é uma aplicação projetada para simular o funcionamento básico do Uber. Seu objetivo é conectar motoristas e passageiros interessados em compartilhar trajetos, proporcionando uma experiência funcional e escalável para estudos e demonstrações técnicas.

---

## Funcionalidades

- **Criação de Viagens**:
  - Usuários podem criar novas viagens especificando detalhes como origem e destino.
  - Todas as viagens criadas são registradas e podem ser consultadas no **histórico de viagens**, com a possibilidade de visualizar o trajeto completo exibido em um mapa interativo integrado ao **Google Maps**.

- **Busca de Viagens**:
  - Facilita a pesquisa de viagens disponíveis com base em critérios específicos, oferecendo opções relevantes.
  - Trajetos encontrados podem ser visualizados no **Google Maps**, permitindo melhor compreensão da rota antes de confirmar a participação.
  - Usuários podem consultar o **histórico de viagens concluídas**, incluindo a visualização dos trajetos percorridos.

---

## Tecnologias Utilizadas

### Backend
- Desenvolvido utilizando **NestJS** como framework principal, combinado com **Express** para roteamento e manipulação de requisições.
- Integração com **Redis** para cache, reduzindo requisições à **Google Maps API** e otimizando custos e performance.
- Preparado para testes robustos com o framework **Jest**.

### Frontend
- Construído com **React** para criação de interfaces dinâmicas.
- Utilização do **Shadcn** para componentes estilizados.
- Validação de formulários com **react-hook-form** e **zod**.
- Estilização eficiente com **TailwindCSS**, garantindo agilidade e consistência no design.

### Banco de Dados
- **PostgreSQL** para armazenamento de dados seguro e escalável.

### Containerização
- Toda a aplicação é containerizada com **Docker**, simplificando o processo de desenvolvimento, implantação e escalabilidade do sistema.

---

## Instalação

1. Clone o repositório:
``` bash
git clone https://github.com/yuripinheirot/roadmates.git
```

2. Navegue até o diretório do projeto:
``` bash 
cd roadmates
```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.

4. Inicie os serviços com Docker Compose:
```bash
docker compose up
```

5. A aplicação será iniciada:
   - Backend acessível na porta 8080.
   - Frontend acessível em: http://localhost:80.
   

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## Contato

Para mais informações, entre em contato com [Yuri Pinheiro](https://github.com/yuripinheirot).