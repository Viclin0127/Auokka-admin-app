export class Utils {
  static setLanguage(lang: string) {
    localStorage.setItem('auokkalang', lang);
  }

  static getLanguage(): string {
    let lang = localStorage.getItem('auokkalang');

    return lang == null ? 'en' : lang;
  }
}
