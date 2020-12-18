import { render } from '@testing-library/react';
import App from '@pages/index';

describe('Main App', () => {
  it('renders without crashing', async () => {
    const { findByText } = render(<App />);
    const title = await findByText(/kerja remote/i);
    const headline = await findByText(/Temukan Pekerjaan Remote Yang Sesuai Dengan Kemampuan Anda/i);
    const login = await findByText(/login/i);

    expect(title).toBeInTheDocument();
    expect(headline).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
});
