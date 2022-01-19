var faker = require("faker");
var cpf = require("gerador-validador-cpf");

export default {
  deliver: function () {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();

    var data = {
      name: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
      whatsapp: "47999999999",
      address: {
        postalcode: "89012130",
        street: "Rua Paraíba",
        number: "999",
        details: "Em frente a rua Dev",
        district: "Victor Konder",
        city_state: "Blumenau/SC",
      },
      delivery_method: "Moto",
      cnh: "images/cnh-digital.jpg",
    };

    return data;
  },
};
