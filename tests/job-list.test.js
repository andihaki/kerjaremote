import { render } from '@testing-library/react';
import App from '@pages/job-list';
import { JobProvider } from '../context/JobContext';
import mockJobList from './__data_mocks__/jobList';

describe('Job List Page', () => {
  it('renders for non login User', async () => {
    const {
      findByText, findByTestId, findAllByText,
    } = render(
      <JobProvider init={mockJobList}>
        <App />
      </JobProvider>,
    );
    const title = await findByText(/kerja remote/i);

    const jobTitle = await findByText(mockJobList[0].jobTitle);
    const firstJobItem = await findByTestId('job-item-1');
    const applyButton = await findAllByText('Login to Apply');

    expect(title).toBeInTheDocument();

    expect(jobTitle).toBeInTheDocument();
    expect(firstJobItem).toBeInTheDocument();
    expect(applyButton[0]).toBeInTheDocument();
    expect(applyButton).toHaveLength(mockJobList.length);
  });
});
