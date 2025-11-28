import { describe, it, expect } from 'vitest';
import { getLanguageColor } from './get-language-color';

describe('getLanguageColor', () => {
  it('should return correct color for known languages', () => {
    expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
    expect(getLanguageColor('TypeScript')).toBe('#3178c6');
    expect(getLanguageColor('Python')).toBe('#3572A5');
    expect(getLanguageColor('Java')).toBe('#b07219');
    expect(getLanguageColor('Go')).toBe('#00ADD8');
    expect(getLanguageColor('Rust')).toBe('#dea584');
  });

  it('should return null for unknown languages', () => {
    expect(getLanguageColor('UnknownLanguage')).toBeNull();
    expect(getLanguageColor('SomeRandomLanguage')).toBeNull();
  });

  it('should return null for null input', () => {
    expect(getLanguageColor(null)).toBeNull();
  });

  it('should handle languages with special characters', () => {
    expect(getLanguageColor('C++')).toBe('#f34b7d');
    expect(getLanguageColor('C#')).toBe('#239120');
    expect(getLanguageColor('F#')).toBe('#b845fc');
    expect(getLanguageColor('Objective-C')).toBe('#438eff');
    expect(getLanguageColor('Objective-C++')).toBe('#6866fb');
  });

  it('should be case sensitive', () => {
    expect(getLanguageColor('javascript')).toBeNull();
    expect(getLanguageColor('JAVASCRIPT')).toBeNull();
    expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
  });

  it('should return colors for various language types', () => {
    expect(getLanguageColor('HTML')).toBe('#e34c26');
    expect(getLanguageColor('CSS')).toBe('#563d7c');
    expect(getLanguageColor('JSON')).toBe('#292929');
    expect(getLanguageColor('YAML')).toBe('#cb171e');
    expect(getLanguageColor('Markdown')).toBe('#083fa1');
  });
});
