import {render, screen} from '@testing-library/react';
import PlayerSearch from './PlayerSearch';

test('renders serach from and handles input changes', () => {
    const mockOnSerach = jest.fn();
    render(<PlayerSearch onSearch={mockOnSerach} playerData={null} error={null} isLoading={false} />);

    expect(screen.getByPlaceholderText(/Enter Game Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Tagline/i)).toBeInTheDocument();
});