import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import PasswordIcon from './password-icon';

const theme = createTheme({ cssVariables: true });

describe('PasswordIcon', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PasswordIcon />
      </ThemeProvider>
    );
    expect(container.firstChild).not.toBeNull();
  });
});
