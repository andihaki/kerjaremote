import { render } from '@testing-library/react';
import App from '@pages/search-user';

describe('Search User Page', () => {
  it('renders without crashing', async () => {
    const { findByText } = render(<App />);
    const title = await findByText(/kerja remote/i);
    const headline = await findByText(/minimal 3 kata/i);
    const login = await findByText(/login/i);

    expect(title).toBeInTheDocument();
    expect(headline).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
});
