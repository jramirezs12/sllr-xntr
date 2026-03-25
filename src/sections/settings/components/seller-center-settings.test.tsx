import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { SellerCenterSettings, SellerCenterSettingsSchema } from './seller-center-settings';

jest.mock('src/layouts/home', () => ({
  HomeContent: ({ children }: any) => <div data-testid="home-content">{children}</div>,
}));

jest.mock('src/routes/paths', () => ({
  paths: { home: { root: '/home' }, settings: '/settings' },
}));

jest.mock('src/routes/components', () => ({
  RouterLink: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

jest.mock('src/locales', () => ({
  useTranslate: () => ({
    translate: (_ns: string, key?: string) => key ?? _ns,
    currentLang: 'es',
  }),
}));

jest.mock('src/components/snackbar', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock('src/components/iconify', () => ({
  Iconify: ({ icon }: any) => <span data-testid={`icon-${icon}`} />,
}));

jest.mock('src/components/custom-breadcrumbs', () => ({
  CustomBreadcrumbs: ({ heading }: any) => <div data-testid="breadcrumbs">{heading}</div>,
}));

jest.mock('src/components/hook-form', () => ({
  Form: ({ children, onSubmit }: any) => <form onSubmit={onSubmit}>{children}</form>,
  Field: {
    Text: ({ name, label }: any) => <input aria-label={label ?? name} name={name} />,
    Select: ({ name, label, children }: any) => (
      <select aria-label={label ?? name} name={name}>{children}</select>
    ),
  },
  schemaUtils: {
    file: () => ({ nullable: () => ({ optional: () => ({}) }) }),
    nullableInput: (s: any) => s,
  },
}));

const theme = createTheme({ cssVariables: true });
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('SellerCenterSettings', () => {
  it('renders without crashing', () => {
    renderWithTheme(<SellerCenterSettings />);
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });

  it('renders breadcrumbs heading', () => {
    renderWithTheme(<SellerCenterSettings />);
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });

  it('renders save button', () => {
    renderWithTheme(<SellerCenterSettings />);
    expect(screen.getByRole('button', { name: /saveProfile/i })).toBeInTheDocument();
  });
});

describe('SellerCenterSettingsSchema', () => {
  it('validates a valid object', () => {
    const result = SellerCenterSettingsSchema.safeParse({
      storeTitle: 'My Store',
      country: 'CO',
    });
    expect(result.success).toBe(true);
  });

  it('fails when storeTitle is empty', () => {
    const result = SellerCenterSettingsSchema.safeParse({
      storeTitle: '',
      country: 'CO',
    });
    expect(result.success).toBe(false);
  });

  it('uses default empty string for optional fields', () => {
    const result = SellerCenterSettingsSchema.safeParse({
      storeTitle: 'My Store',
      country: 'CO',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metaKeywords).toBe('');
      expect(result.data.companyDescription).toBe('');
    }
  });
});
