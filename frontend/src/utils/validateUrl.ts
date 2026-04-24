/**
 * Valida se uma URL é segura para uso em src de imagens ou links.
 * Rejeita javascript:, data:, vbscript: e outras URIs perigosas.
 */
export function isSafeUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    // Permitir apenas http e https
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    // URLs relativas ou inválidas são rejeitadas
    return false;
  }
}

/**
 * Retorna uma URL segura ou um fallback.
 */
export function safeUrl(url: string | undefined | null, fallback: string): string {
  return isSafeUrl(url) ? url! : fallback;
}

