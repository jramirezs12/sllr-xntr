import { schemaUtils } from './schema-utils';

describe('schemaUtils.email', () => {
  it('is defined', () => {
    expect(schemaUtils.email).toBeDefined();
  });

  it('returns a zod schema', () => {
    const schema = schemaUtils.email();
    expect(typeof schema.parse).toBe('function');
    expect(typeof schema.safeParse).toBe('function');
  });

  it('validates a valid email', () => {
    const schema = schemaUtils.email();
    const result = schema.safeParse('test@example.com');
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const schema = schemaUtils.email();
    const result = schema.safeParse('not-an-email');
    expect(result.success).toBe(false);
  });
});

describe('schemaUtils.date', () => {
  it('is defined', () => {
    expect(schemaUtils.date).toBeDefined();
  });

  it('returns a zod schema', () => {
    const schema = schemaUtils.date();
    expect(typeof schema.parse).toBe('function');
  });

  it('validates a valid date string', () => {
    const schema = schemaUtils.date();
    const result = schema.safeParse('2024-01-15');
    expect(result.success).toBe(true);
  });

  it('rejects null value', () => {
    const schema = schemaUtils.date();
    const result = schema.safeParse(null);
    expect(result.success).toBe(false);
  });
});

describe('schemaUtils.phoneNumber', () => {
  it('is defined', () => {
    expect(schemaUtils.phoneNumber).toBeDefined();
  });

  it('returns a zod schema', () => {
    const schema = schemaUtils.phoneNumber({ isValid: (val) => val.length >= 10 });
    expect(typeof schema.parse).toBe('function');
  });
});
