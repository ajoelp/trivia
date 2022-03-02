const googleapis = jest.createMockFromModule("googleapis") as any;

googleapis.google = {
  auth: {
    OAuth2: jest.fn(),
  },
  people: jest.fn(),
};

module.exports = googleapis;
