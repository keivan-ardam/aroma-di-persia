import { ref, computed } from 'vue'

export type Lang = 'it' | 'en' | 'fa'

const currentLang = ref<Lang>('it')

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.about': { it: 'Chi Siamo', en: 'About Us', fa: 'درباره ما' },
  'nav.menu': { it: 'Menu', en: 'Menu', fa: 'منو' },
  'nav.gallery': { it: 'Galleria', en: 'Gallery', fa: 'گالری' },
  'nav.contact': { it: 'Contatti', en: 'Contact', fa: 'تماس' },
  'nav.order': { it: 'Ordina', en: 'Order', fa: 'سفارش' },

  // Hero
  'hero.tagline': { it: 'Catering Persiano Autentico · Piacenza', en: 'Authentic Persian Catering · Piacenza', fa: 'کترینگ اصیل ایرانی · پیاچنزا' },
  'hero.subtitle': { it: 'Ogni boccone con amore e autentici profumi persiani', en: 'Every bite with love and authentic Persian aromas', fa: 'هر لقمه با عشق و عطر اصیل ایرانی' },
  'hero.scroll': { it: 'Scorri per scoprire', en: 'Scroll to discover', fa: 'اسکرول کنید' },

  // About
  'about.label': { it: 'La Nostra Storia', en: 'Our Story', fa: 'داستان ما' },
  'about.title1': { it: 'Autentici profumi', en: 'Authentic aromas', fa: 'عطرهای اصیل' },
  'about.title2': { it: 'persiani', en: 'Persian', fa: 'ایرانی' },
  'about.title3': { it: 'a Piacenza', en: 'in Piacenza', fa: 'در پیاچنزا' },
  'about.p1': { it: 'Ogni piatto che prepariamo racconta una storia — di spezie tostate al mattino, di ricette tramandate da generazioni, di una cucina dove il tempo si ferma e l\'amore diventa sapore.', en: 'Every dish we prepare tells a story — of spices roasted in the morning, of recipes passed down through generations, of a kitchen where time stands still and love becomes flavor.', fa: 'هر غذایی که آماده می‌کنیم داستانی دارد — از ادویه‌های بو داده شده صبحگاهی، از دستورهایی که نسل به نسل منتقل شده، از آشپزخانه‌ای که زمان در آن می‌ایستد و عشق به طعم تبدیل می‌شود.' },
  'about.p2': { it: 'Dalla nostra cucina casalinga a Piacenza, portiamo sulla vostra tavola i profumi autentici della Persia: lo zafferano dorato, il melograno rubino, le erbe fresche e le spezie che scaldano l\'anima.', en: 'From our home kitchen in Piacenza, we bring to your table the authentic aromas of Persia: golden saffron, ruby pomegranate, fresh herbs and soul-warming spices.', fa: 'از آشپزخانه خانگی ما در پیاچنزا، عطرهای اصیل ایران را به سفره شما می‌آوریم: زعفران طلایی، انار یاقوتی، سبزی‌های تازه و ادویه‌هایی که روح را گرم می‌کنند.' },
  'about.p3': { it: 'Ogni boccone è preparato con cura, con ingredienti freschi e la passione di chi cucina per la propria famiglia.', en: 'Every bite is prepared with care, with fresh ingredients and the passion of someone cooking for their own family.', fa: 'هر لقمه با دقت، با مواد تازه و عشق کسی که برای خانواده‌اش آشپزی می‌کند آماده شده است.' },
  'about.homemade': { it: 'Fatto in casa', en: 'Homemade', fa: 'خانگی' },
  'about.daily': { it: 'Ogni giorno', en: 'Every day', fa: 'هر روز' },
  'about.special': { it: 'Piatto speciale', en: 'Special dish', fa: 'غذای ویژه' },

  // Menu
  'menu.label': { it: 'Il Nostro Menu', en: 'Our Menu', fa: 'منوی ما' },
  'menu.title1': { it: 'Menu', en: 'Menu', fa: 'منوی' },
  'menu.title2': { it: 'Casalingo', en: 'Homestyle', fa: 'خانگی' },
  'menu.subtitle': { it: 'Ogni giorno proponiamo un piatto speciale, secondo un menu settimanale fisso', en: 'Every day we offer a special dish, following a fixed weekly menu', fa: 'هر روز یک غذای ویژه بر اساس منوی هفتگی ثابت ارائه می‌دهیم' },
  'menu.ingredients': { it: 'Ingredienti', en: 'Ingredients', fa: 'مواد اولیه' },
  'menu.close': { it: 'Chiudi', en: 'Close', fa: 'بستن' },

  // Gallery
  'gallery.label': { it: 'Galleria', en: 'Gallery', fa: 'گالری' },
  'gallery.title1': { it: 'I Nostri', en: 'Our', fa: 'غذاهای' },
  'gallery.title2': { it: 'Piatti', en: 'Dishes', fa: 'ما' },

  // Contact
  'contact.label': { it: 'Ordina Ora', en: 'Order Now', fa: 'همین الان سفارش دهید' },
  'contact.title1': { it: 'Porta la Persia', en: 'Bring Persia', fa: 'ایران را' },
  'contact.title2': { it: 'sulla tua tavola', en: 'to your table', fa: 'به سفره‌ات بیاور' },
  'contact.desc': { it: 'Ordina il tuo piatto preferito per ritiro o consegna a Piacenza. Contattaci per prenotazioni, eventi e catering.', en: 'Order your favorite dish for pickup or delivery in Piacenza. Contact us for reservations, events and catering.', fa: 'غذای مورد علاقه‌تان را برای تحویل حضوری یا ارسال در پیاچنزا سفارش دهید. برای رزرو، مراسم و کترینگ با ما تماس بگیرید.' },
  'contact.phone': { it: 'Telefono', en: 'Phone', fa: 'تلفن' },
  'contact.whatsapp': { it: 'WhatsApp', en: 'WhatsApp', fa: 'واتساپ' },
  'contact.location': { it: 'Dove Siamo', en: 'Location', fa: 'آدرس' },
  'contact.cta': { it: 'Ordina su WhatsApp', en: 'Order on WhatsApp', fa: 'سفارش در واتساپ' },
  'contact.hours': { it: 'Orari da definire · Ritiro e consegna disponibili', en: 'Hours TBD · Pickup and delivery available', fa: 'ساعات کاری متعاقباً اعلام می‌شود · تحویل حضوری و ارسال' },

  // Footer
  'footer.tagline': { it: 'Ogni boccone con amore e autentici profumi persiani', en: 'Every bite with love and authentic Persian aromas', fa: 'هر لقمه با عشق و عطر اصیل ایرانی' },
  'footer.copy': { it: '© 2025 Aroma di Persia · Piacenza, Italia', en: '© 2025 Aroma di Persia · Piacenza, Italy', fa: '© ۲۰۲۵ آروما دی پرشیا · پیاچنزا، ایتالیا' },
  'footer.sub': { it: 'Raccolto con cura. Condiviso con gioia.', en: 'Gathered with care. Shared with joy.', fa: 'با دقت گردآوری شده. با شادی تقسیم شده.' },
}

export function useI18n() {
  const setLang = (lang: Lang) => {
    currentLang.value = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[key]?.[currentLang.value] ?? key
  }

  const lang = computed(() => currentLang.value)
  const isFarsi = computed(() => currentLang.value === 'fa')

  return { t, setLang, lang, isFarsi }
}
