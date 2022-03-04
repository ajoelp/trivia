const { generatePath: actualGeneratePath } = jest.requireActual("react-router-dom");

export const Navigate = jest.fn(() => <div data-testid="navigate-mock" />);

export const useLocation = jest.fn(() => ({
  pathname: "",
}));

export const generatePath = jest.fn(actualGeneratePath);
