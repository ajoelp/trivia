const { generatePath: actualGeneratePath, matchPath: actualMatchPath } = jest.requireActual("react-router-dom");

export const Navigate = jest.fn(() => <div data-testid="navigate-mock" />);

export const useLocation = jest.fn(() => ({
  pathname: "",
}));

export const generatePath = jest.fn(actualGeneratePath);

// eslint-disable-next-line jsx-a11y/anchor-has-content
export const Link = jest.fn(({ to, ...rest }) => <a href={to} data-testid="link-mock" {...rest} />);

export const useNavigate = jest.fn(() => jest.fn());

export const useParams = jest.fn(() => ({}));

export const matchPath = jest.fn(actualMatchPath);
