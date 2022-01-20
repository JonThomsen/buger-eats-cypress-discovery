import signupPage from "../pages/SignupPage";
import signupFactory from "../factories/SignupFactory";

describe("Signup", () => {
  //function() libera variável de contexto
  //com arrow function não, ocorre erro no this.

  // beforeEach(function () {
  //   cy.fixture("deliver").then((d) => {
  //     this.deliver = d;
  //   });
  // });

  it("User should be deliver", function () {
    var deliver = signupFactory.deliver();

    signupPage.go();

    //usado via fixtures
    //signup.fillForm(this.deliver.signup);

    //usado via factory
    signupPage.fillForm(deliver);
    signupPage.submit();

    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";

    signupPage.modalContentShouldBe(expectedMessage);
  });

  it("Invalid document", function () {
    var deliver = signupFactory.deliver();
    deliver.cpf = "000000141AA";

    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    //signupPage.alertMessageShouldBe("Oops! CPF inválidu");
    signupPage.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("Invalid email", function () {
    var deliver = signupFactory.deliver();
    deliver.email = "jonathan.com.br";

    signupPage.go();
    signupPage.fillForm(deliver);
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  context("Required Fields", function () {
    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "delivery_method", output: "Selecione o método de entrega" },
      { field: "CNH", output: "Adicione uma foto da sua CNH" },
    ];

    before(function () {
      signupPage.go();
      signupPage.submit();
    });

    messages.forEach(function (message) {
      it(`${message.field} is required`, function () {
        signupPage.alertMessageShouldBe(message.output);
      });
    });
  });

  /* before(() => {
    cy.log(
      "Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes"
    );
  });

  beforeEach(() => {
    cy.log("Tudo aqui é executado sempre ANTES de CADA caso de teste");
  });

  after(() => {
    cy.log(
      "Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes"
    );
  });

  afterEach(() => {
    cy.log("Tudo aqui é executado sempre DEPOIS de CADA caso de teste");
  });
 */
});
