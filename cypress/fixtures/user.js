import { faker } from '@faker-js/faker';

const createValidPassword = () => `Aa1${faker.string.alphanumeric(5)}`;

export const createUser = () => {
  const password = createValidPassword();
  return {
    name: faker.person.firstName('male').replace(/[^a-zA-Z]/g, 'A'),
    lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, 'B'),
    email: faker.internet.email(),
    password,
    repeatPassword: password,
  };
};
